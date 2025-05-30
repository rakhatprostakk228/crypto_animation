document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches;
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    
    adjustAnimationsForDevice(isMobile, isTablet);
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    setupSmoothScrolling();
    setupLazyLoading();
    adjustParallaxEffects(isMobile, isTablet);
    fixLayoutIssues(isLandscape);
    fixViewportHeight();
});

function adjustAnimationsForDevice(isMobile, isTablet) {
    const animatedElements = document.querySelectorAll('.bouncing, .floating, .pulsing, .pulsing-button');
    
    if (isMobile) {
        animatedElements.forEach(element => {
            if (element.classList.contains('bouncing')) {
                element.style.animationName = 'bounce-light';
                element.style.animationDuration = '3s';
            } else if (element.classList.contains('floating')) {
                element.style.animationName = 'float-light';
                element.style.animationDuration = '3s';
            }
            
            if (element.style.transform && element.style.transform.includes('rotate')) {
                element.style.transform = element.style.transform.replace(/rotate\([^)]+\)/g, '');
            }
        });
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce-light {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }
            
            @keyframes float-light {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    } else if (isTablet) {
        animatedElements.forEach(element => {
            if (element.style.animationDuration) {
                const currentDuration = parseFloat(element.style.animationDuration);
                element.style.animationDuration = (currentDuration * 1.15) + 's';
            }
        });
    }
    
    if ('connection' in navigator && (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g')) {
        document.body.classList.add('reduce-animations');
        
        const style = document.createElement('style');
        style.textContent = `
            .reduce-animations .bouncing,
            .reduce-animations .floating,
            .reduce-animations .pulsing,
            .reduce-animations .pulsing-button {
                animation: none !important;
                transform: none !important;
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

function handleResize() {
    fixViewportHeight();
    
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches;
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    
    adjustAnimationsForDevice(isMobile, isTablet);
    adjustParallaxEffects(isMobile, isTablet);
    fixLayoutIssues(isLandscape);
}

function handleOrientationChange() {
    setTimeout(fixViewportHeight, 150);
    
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    fixLayoutIssues(isLandscape);
    
    const elements = document.querySelectorAll('.dog, .pepe, .info-character, .pepe-bag, .dog-bag');
    elements.forEach(el => {
        if (el.style.transform) {
            const originalTransform = el.style.transform;
            el.style.transform = 'none';
            
            void el.offsetWidth;
            
            setTimeout(() => {
                el.style.transform = originalTransform;
            }, 40);
        }
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === "#") {
                const isSmoothSupported = 'scrollBehavior' in document.documentElement.style;
                
                if (isSmoothSupported) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const scrollToTop = (duration) => {
                        const start = window.pageYOffset;
                        const startTime = performance.now();
                        
                        const scroll = () => {
                            const now = performance.now();
                            const time = Math.min(1, (now - startTime) / duration);
                            
                            window.scrollTo(0, Math.floor(start * (1 - time)));
                            
                            if (time < 1) {
                                requestAnimationFrame(scroll);
                            }
                        };
                        
                        requestAnimationFrame(scroll);
                    };
                    
                    const isMobile = window.matchMedia('(max-width: 767px)').matches;
                    scrollToTop(isMobile ? 350 : 650);
                }
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const isSmoothSupported = 'scrollBehavior' in document.documentElement.style;
                    
                    if (isSmoothSupported) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    } else {
                        const scrollToElement = (element, duration) => {
                            const start = window.pageYOffset;
                            const target = element.getBoundingClientRect().top + window.pageYOffset;
                            const startTime = performance.now();
                            
                            const scroll = () => {
                                const now = performance.now();
                                const time = Math.min(1, (now - startTime) / duration);
                                const easedTime = 0.5 * (1 - Math.cos(Math.PI * time));
                                
                                window.scrollTo(0, start + (target - start) * easedTime);
                                
                                if (time < 1) {
                                    requestAnimationFrame(scroll);
                                }
                            };
                            
                            requestAnimationFrame(scroll);
                        };
                        
                        const isMobile = window.matchMedia('(max-width: 767px)').matches;
                        scrollToElement(targetElement, isMobile ? 350 : 650);
                    }
                }
            }
        });
    });
}

function setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading') && !img.classList.contains('logo-image') && !img.classList.contains('buildings-image')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    } else {
        const lazyImages = document.querySelectorAll('img:not(.logo-image):not(.buildings-image)');
        
        const lazyLoad = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        delete img.dataset.src;
                    }
                    
                    observer.unobserve(img);
                }
            });
        };
        
        if ('IntersectionObserver' in window) {
            const options = {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver(lazyLoad, options);
            
            lazyImages.forEach(img => {
                if (!img.classList.contains('logo-image') && !img.classList.contains('buildings-image')) {
                    img.dataset.src = img.src;
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                    observer.observe(img);
                }
            });
        }
    }
}

function adjustParallaxEffects(isMobile, isTablet) {
    let maxShift = 22;
    
    if (isMobile) {
        maxShift = 6;
    } else if (isTablet) {
        maxShift = 12;
    }
    
    document.removeEventListener('mousemove', handleMouseMove);
    
    if (!isMobile) {
        document.addEventListener('mousemove', handleMouseMove);
    }
    
    function handleMouseMove(e) {
        if (window.scrollY < window.innerHeight) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const dogShift = maxShift;
            const pepeShift = maxShift * 0.8;
            const coinShift = maxShift * 0.6;
            
            const dog = document.querySelector('.dog');
            const pepe = document.querySelector('.pepe');
            const coins = document.querySelectorAll('.coin');
            
            if (dog) {
                dog.style.transform = `translate(${mouseX * dogShift}px, ${mouseY * dogShift}px)`;
            }
            
            if (pepe) {
                pepe.style.transform = `translate(${-mouseX * pepeShift}px, ${mouseY * pepeShift}px)`;
            }
            
            coins.forEach((coin) => {
                coin.style.transform = `translate(${(mouseX - 0.5) * coinShift}px, ${(mouseY - 0.5) * coinShift}px)`;
            });
        }
    }
    
    if (isMobile && window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    
    function handleDeviceOrientation(e) {
        if (window.scrollY < window.innerHeight) {
            const tiltX = Math.max(-1, Math.min(1, (e.gamma || 0) / 30));
            const tiltY = Math.max(-1, Math.min(1, (e.beta || 0) / 30));
            
            const mobileShift = 8;
            
            const dog = document.querySelector('.dog');
            const pepe = document.querySelector('.pepe');
            const coins = document.querySelectorAll('.coin');
            
            if (dog) {
                dog.style.transform = `translate(${tiltX * mobileShift}px, ${tiltY * mobileShift}px)`;
            }
            
            if (pepe) {
                pepe.style.transform = `translate(${-tiltX * mobileShift}px, ${tiltY * mobileShift}px)`;
            }
            
            coins.forEach((coin) => {
                coin.style.transform = `translate(${tiltX * mobileShift * 0.5}px, ${tiltY * mobileShift * 0.5}px)`;
            });
        }
    }
}

function fixLayoutIssues(isLandscape) {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    
    if (isMobile && isLandscape) {
        const dog = document.querySelector('.dog');
        const pepe = document.querySelector('.pepe');
        const playButton = document.querySelector('.play-button-container');
        
        if (dog) dog.style.bottom = '15%';
        if (pepe) pepe.style.bottom = '15%';
        if (playButton) playButton.style.bottom = '8%';
        
        const instructions = document.querySelector('.instructions');
        if (instructions) {
            instructions.style.maxWidth = '75%';
            instructions.style.margin = '0 auto';
        }
        
        const celebCards = document.querySelector('.celebrity-cards');
        if (celebCards) {
            celebCards.style.flexDirection = 'row';
            celebCards.style.flexWrap = 'wrap';
            celebCards.style.gap = '15px';
        }
        
        const whyLogoCont = document.querySelector('.logo-container');
        const reasonsList = document.querySelector('.reasons-list');
        
        if (whyLogoCont) whyLogoCont.style.margin = '8px 0';
        if (reasonsList) {
            reasonsList.style.gap = '8px';
            reasonsList.style.marginTop = '8px';
        }
    } else {
        if (isMobile) {
            const elements = document.querySelectorAll('.dog, .pepe, .play-button-container, .instructions, .celebrity-cards, .logo-container, .reasons-list');
            elements.forEach(el => {
                if (el.style.cssText) {
                    el.removeAttribute('style');
                }
            });
        }
    }
}

function fixViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    let existingStyle = document.getElementById('vh-fix-style');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    const style = document.createElement('style');
    style.id = 'vh-fix-style';
    style.textContent = `
        .main-screen, .info-section, .howto-section, .meet-section, .why-section {
            height: 100vh;
            height: calc(var(--vh, 1vh) * 100);
            min-height: calc(var(--vh, 1vh) * 100);
        }
    `;
    document.head.appendChild(style);
    
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        document.body.style.minHeight = 'calc(var(--vh, 1vh) * 100)';
        document.documentElement.classList.add('ios-device');
        
        setTimeout(() => {
            const newVh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${newVh}px`);
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (entry.entryType === 'navigation' && entry.loadEventEnd > 3000) {
                document.body.classList.add('slow-device');
                
                const style = document.createElement('style');
                style.textContent = `
                    .slow-device .bouncing,
                    .slow-device .floating,
                    .slow-device .pulsing {
                        animation-duration: 4s !important;
                    }
                    
                    .slow-device .coin {
                        animation-duration: 6s !important;
                    }
                    
                    .slow-device .parallax-effect {
                        transform: none !important;
                    }
                `;
                document.head.appendChild(style);
            }
        });
    });
    
    if ('PerformanceObserver' in window) {
        performanceObserver.observe({ entryTypes: ['navigation'] });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        const style = document.createElement('style');
        style.textContent = `
            .bouncing, .floating, .pulsing, .pulsing-button {
                animation: none !important;
            }
            
            .coin, .star, .question-mark {
                animation: none !important;
            }
            
            * {
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function optimizeForDevice() {
        const deviceMemory = navigator.deviceMemory || 4;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        
        if (deviceMemory < 4 || hardwareConcurrency < 4) {
            document.body.classList.add('low-end-device');
            
            const style = document.createElement('style');
            style.textContent = `
                .low-end-device .coin {
                    animation-duration: 8s !important;
                }
                
                .low-end-device .parallax-effect {
                    transform: none !important;
                }
                
                .low-end-device .bouncing,
                .low-end-device .floating {
                    animation-duration: 5s !important;
                }
                
                .low-end-device .ribbon-coin {
                    animation: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    optimizeForDevice();
});

window.addEventListener('beforeunload', function() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('deviceorientation', handleDeviceOrientation);
});