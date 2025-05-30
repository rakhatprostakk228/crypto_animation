document.addEventListener('DOMContentLoaded', function() {
    const dog = document.querySelector('.dog');
    const pepe = document.querySelector('.pepe');
    const coins = document.querySelectorAll('.coin');
    const logo = document.querySelector('.logo-image');
    const playButton = document.querySelector('.play-button');
    const glowImage = document.querySelector('.glow-image');
    
    setTimeout(() => {
        animateCharacters();
        animateCoins();
        animateGlow();
    }, 300);
    
    function animateCharacters() {
        if (dog && pepe) {
            dog.style.animation = 'none';
            pepe.style.animation = 'none';
            
            void dog.offsetWidth;
            void pepe.offsetWidth;
            
            dog.style.animation = `bounceDelay ${2 + Math.random()}s ease-in-out infinite ${Math.random()}s`;
            pepe.style.animation = `bounceDelay ${2 + Math.random()}s ease-in-out infinite ${Math.random()}s`;
        }
    }
    
    function animateCoins() {
        coins.forEach((coin, index) => {
            coin.style.animation = 'none';
            
            void coin.offsetWidth;
            
            const duration = 4 + index + Math.random() * 2;
            const delay = index * 0.3;
            
            coin.style.animation = `coinFloat ${duration}s ease-in-out infinite ${delay}s`;
            
            setInterval(() => {
                const randomX = Math.random() * 8 - 4;
                const randomY = Math.random() * 8 - 4;
                
                coin.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 8 - 4}deg)`;
            }, 3000);
        });
    }
    
    function animateGlow() {
        if (glowImage) {
            setInterval(() => {
                const intensity = 0.7 + Math.random() * 0.3;
                glowImage.style.opacity = intensity;
            }, 2000);
        }
    }
    
    if (playButton) {
        setInterval(() => {
            playButton.classList.add('extra-pulse');
            
            setTimeout(() => {
                playButton.classList.remove('extra-pulse');
            }, 600);
        }, 8000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes moveRandom {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(6px, 6px); }
            50% { transform: translate(-6px, 12px); }
            75% { transform: translate(-12px, -6px); }
        }
        
        .extra-pulse {
            transform: scale(1.25) !important;
            filter: brightness(1.3);
            transition: transform 0.4s ease, filter 0.4s ease;
        }
        
        .click-effect {
            transform: scale(0.85) !important;
            filter: brightness(0.8);
            transition: transform 0.15s ease, filter 0.15s ease;
        }
    `;
    document.head.appendChild(style);
    
    document.addEventListener('mousemove', function(e) {
        if (window.scrollY < window.innerHeight) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const dogShift = 25;
            const pepeShift = 20;
            const coinShift = 12;
            
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
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === "#") {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    const infoLogo = document.querySelector('.info-logo');
    const infoBubble = document.querySelector('.info-bubble');
    const infoCharacter = document.querySelector('.info-character');
    
    if (infoLogo && infoBubble && infoCharacter) {
        infoLogo.classList.add('pulsing');
        infoCharacter.classList.add('floating');
        
        infoBubble.style.animation = 'pulse 5s ease-in-out infinite';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const instructionButtons = document.querySelectorAll('.instruction-button');
    
    instructionButtons.forEach((button, index) => {
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 80 * index);
        
        button.addEventListener('click', function() {
            this.classList.add('button-click');
            
            setTimeout(() => {
                this.classList.remove('button-click');
            }, 150);
        });
    });
    
    const questionMarks = document.querySelectorAll('.question-mark');
    
    questionMarks.forEach(mark => {
        setInterval(() => {
            const randomRotation = Math.random() * 15 - 7.5;
            mark.style.transform = `rotate(${randomRotation}deg)`;
        }, 1800);
    });
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const instructionsContainer = document.querySelector('.instructions');
        const pepe = document.querySelector('.pepe-bag');
        const dog = document.querySelector('.dog-bag');
        const leftMark = document.querySelector('.left-mark');
        const rightMark = document.querySelector('.right-mark');
        
        if (instructionsContainer) {
            instructionsContainer.style.transform = `translate(${mouseX * -8}px, ${mouseY * -8}px)`;
        }
        
        if (pepe) {
            pepe.style.transform = `translate(${mouseX * 35}px, ${mouseY * 35}px)`;
        }
        
        if (dog) {
            dog.style.transform = `translate(${mouseX * -35}px, ${mouseY * 35}px)`;
        }
        
        if (leftMark) {
            leftMark.style.transform = `translate(${mouseX * -25}px, ${mouseY * -25}px) rotate(${mouseX * 20}deg)`;
        }
        
        if (rightMark) {
            rightMark.style.transform = `translate(${mouseX * 25}px, ${mouseY * -25}px) rotate(${mouseX * -20}deg)`;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        setInterval(() => {
            const randomRotation = Math.random() * 25 - 12.5;
            const randomX = Math.random() * 25 - 12.5;
            const randomY = Math.random() * 25 - 12.5;
            
            star.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
        }, 2200);
    });
    
    const coins = document.querySelectorAll('.coin');
    
    coins.forEach(coin => {
        setInterval(() => {
            const randomRotation = Math.random() * 25 - 12.5;
            const randomX = Math.random() * 35 - 17.5;
            const randomY = Math.random() * 35 - 17.5;
            
            coin.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
        }, 2800);
    });
    
    const celebrityCards = document.querySelectorAll('.celebrity-image-card');
    
    celebrityCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.92)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const meetLogo = document.querySelector('.meet-logo');
        const starLeft = document.querySelector('.star-left');
        const starRight = document.querySelector('.star-right');
        const celebrityCards = document.querySelector('.celebrity-cards');
        
        if (meetLogo) {
            meetLogo.style.transform = `translate(${mouseX * -18}px, ${mouseY * -18}px)`;
        }
        
        if (starLeft) {
            starLeft.style.transform = `translate(${mouseX * -32}px, ${mouseY * -32}px)`;
        }
        
        if (starRight) {
            starRight.style.transform = `translate(${mouseX * 32}px, ${mouseY * -32}px)`;
        }
        
        if (celebrityCards) {
            celebrityCards.style.transform = `translate(${mouseX * -12}px, ${mouseY * -12}px)`;
        }
        
        const coins = document.querySelectorAll('.coin');
        coins.forEach((coin, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            const factor = index % 3 === 0 ? 1.6 : 1.2;
            
            coin.style.transform = `translate(${mouseX * 45 * direction * factor}px, ${mouseY * 45 * factor}px)`;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const whyLogo = document.querySelector('.why-logo');
    
    if (whyLogo) {
        setInterval(() => {
            const randomScale = 1 + Math.random() * 0.12;
            whyLogo.style.transform = `scale(${randomScale})`;
            
            setTimeout(() => {
                whyLogo.style.transform = 'scale(1)';
            }, 800);
        }, 4000);
    }
    
    const reasonItems = document.querySelectorAll('.reason-item');
    
    reasonItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 150 * index);
        
        item.addEventListener('click', function() {
            this.classList.add('reason-click');
            
            setTimeout(() => {
                this.classList.remove('reason-click');
            }, 250);
        });
    });
    
    const playButton2 = document.querySelector('.play-button2');
    
    if (playButton2) {
        setInterval(() => {
            if (Math.random() > 0.6) {
                playButton2.classList.add('extra-pulse');
                
                setTimeout(() => {
                    playButton2.classList.remove('extra-pulse');
                }, 700);
            }
        }, 6000);
        
        playButton2.addEventListener('click', function() {
            this.classList.add('click-effect');
            
            setTimeout(() => {
                this.classList.remove('click-effect');
            }, 200);
        });
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .reason-item {
            opacity: 0;
            transform: translateX(40px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .reason-click {
            transform: scale(0.92) !important;
            transition: transform 0.12s ease;
        }
        
        .extra-pulse {
            transform: scale(1.28) !important;
            filter: brightness(1.25);
            transition: transform 0.35s ease, filter 0.35s ease;
        }
        
        .click-effect {
            transform: scale(0.88) !important;
            filter: brightness(0.85);
            transition: transform 0.12s ease, filter 0.12s ease;
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', function() {
    function fixPositions() {
        const buildings = document.querySelector('.buildings');
        const characters = document.querySelector('.characters');
        const coins = document.querySelector('.coins');
        
        if (buildings) buildings.style.zIndex = "6";
        if (characters) characters.style.zIndex = "4";
        if (coins) coins.style.zIndex = "7";
        
        const dog = document.querySelector('.dog');
        const pepe = document.querySelector('.pepe');
        
        if (dog) {
            dog.style.top = "auto";
            if (window.innerWidth >= 1200) {
                dog.style.bottom = "250px";
            } else if (window.innerWidth >= 768) {
                dog.style.bottom = "180px";
            } else if (window.innerWidth >= 480) {
                dog.style.bottom = "140px";
            } else {
                dog.style.bottom = "110px";
            }
        }
        
        if (pepe) {
            pepe.style.top = "auto";
            if (window.innerWidth >= 1200) {
                pepe.style.bottom = "250px";
            } else if (window.innerWidth >= 768) {
                pepe.style.bottom = "180px";
            } else if (window.innerWidth >= 480) {
                pepe.style.bottom = "140px";
            } else {
                pepe.style.bottom = "110px";
            }
        }
    }
    
    fixPositions();
    window.addEventListener('resize', fixPositions);
    setTimeout(fixPositions, 120);
});

document.addEventListener('DOMContentLoaded', function() {
    function fixElementsPositioning() {
        const buildings = document.querySelector('.buildings');
        const characters = document.querySelector('.characters');
        const coins = document.querySelector('.coins');
        
        if (buildings) buildings.style.zIndex = "6";
        if (characters) characters.style.zIndex = "4";
        if (coins) coins.style.zIndex = "7";
        
        const dog = document.querySelector('.dog');
        const pepe = document.querySelector('.pepe');
        
        if (dog) {
            dog.style.top = "auto";
            
            if (window.innerWidth >= 1200) {
                dog.style.width = "400px";
                dog.style.left = "210px";
                dog.style.bottom = "250px";
            } else if (window.innerWidth >= 768) {
                dog.style.width = "300px";
                dog.style.left = "150px";
                dog.style.bottom = "180px";
            } else if (window.innerWidth >= 480) {
                dog.style.width = "200px";
                dog.style.left = "30px";
                dog.style.bottom = "140px";
            } else {
                dog.style.width = "150px";
                dog.style.left = "20px";
                dog.style.bottom = "110px";
            }
        }
        
        if (pepe) {
            pepe.style.top = "auto";
            
            if (window.innerWidth >= 1200) {
                pepe.style.width = "400px";
                pepe.style.right = "100px";
                pepe.style.bottom = "250px";
            } else if (window.innerWidth >= 768) {
                pepe.style.width = "300px";
                pepe.style.right = "80px";
                pepe.style.bottom = "180px";
            } else if (window.innerWidth >= 480) {
                pepe.style.width = "200px";
                pepe.style.right = "30px";
                pepe.style.bottom = "140px";
            } else {
                pepe.style.width = "150px";
                pepe.style.right = "20px";
                pepe.style.bottom = "110px";
            }
        }
    }
    
    fixElementsPositioning();
    
    window.addEventListener('resize', fixElementsPositioning);
    
    window.addEventListener('load', fixElementsPositioning);
    
    setTimeout(fixElementsPositioning, 100);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY < window.innerHeight) {
            fixElementsPositioning();
        }
    });
    
    function overrideAnimations() {
        const dog = document.querySelector('.dog');
        const pepe = document.querySelector('.pepe');
        
        if (dog && dog.classList.contains('bouncing')) {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes bounce-modified {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-25px); }
                }
                
                .dog.bouncing, .pepe.bouncing {
                    animation-name: bounce-modified;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    overrideAnimations();
    
    const originalMouseMoveHandler = document.onmousemove;
    document.onmousemove = function(e) {
        if (originalMouseMoveHandler) {
            originalMouseMoveHandler(e);
        }
        
        setTimeout(fixElementsPositioning, 8);
    };
});

document.addEventListener('DOMContentLoaded', function() {
    function applyLargeScreenFixes() {
        const isLargeScreen = window.innerWidth >= 1200;
        const isExtraLargeScreen = window.innerWidth >= 1440;
        
        const dog = document.querySelector('.dog');
        const pepe = document.querySelector('.pepe');
        
        const infoCharacter = document.querySelector('.info-character');
        
        const reasonImages = document.querySelectorAll('.reason-image');
        const playButton2 = document.querySelector('.play-button2');
        const socialIcons = document.querySelectorAll('.why-social-img');
        
        const buildings = document.querySelector('.buildings');
        const characters = document.querySelector('.characters');
        const coins = document.querySelector('.coins');
        
        if (buildings) buildings.style.zIndex = "6";
        if (characters) characters.style.zIndex = "4";
        if (coins) coins.style.zIndex = "7";
        
        if (isLargeScreen) {
            if (dog) {
                dog.style.position = "absolute";
                dog.style.width = "400px";
                dog.style.left = "210px";
                dog.style.bottom = "350px";
                dog.style.top = "auto";
            }
            
            if (pepe) {
                pepe.style.position = "absolute";
                pepe.style.width = "400px";
                pepe.style.right = "100px";
                pepe.style.bottom = "350px";
                pepe.style.top = "auto";
            }
            
            if (infoCharacter) {
                infoCharacter.style.position = "absolute";
                infoCharacter.style.bottom = "-20%";
                infoCharacter.style.left = "-10%";
                infoCharacter.style.width = "350px";
                infoCharacter.style.maxWidth = "400px";
                infoCharacter.style.zIndex = "4";
            }
            
            reasonImages.forEach(img => {
                img.style.width = "110%";
                img.style.maxWidth = "110%";
            });
            
            if (playButton2) {
                playButton2.style.width = "350px";
            }
            
            socialIcons.forEach(icon => {
                icon.style.width = "70px";
                icon.style.height = "70px";
            });
        }
        
        if (isExtraLargeScreen) {
            if (dog) {
                dog.style.bottom = "400px";
                dog.style.width = "450px";
            }
            
            if (pepe) {
                pepe.style.bottom = "400px";
                pepe.style.width = "450px";
            }
            
            if (infoCharacter) {
                infoCharacter.style.bottom = "-30%";
                infoCharacter.style.width = "400px";
            }
            
            reasonImages.forEach(img => {
                img.style.width = "120%";
                img.style.maxWidth = "120%";
            });
            
            if (playButton2) {
                playButton2.style.width = "400px";
            }
        }
    }
    
    applyLargeScreenFixes();
    
    window.addEventListener('resize', applyLargeScreenFixes);
    
    setTimeout(applyLargeScreenFixes, 400);
});

document.addEventListener('DOMContentLoaded', function() {
    function fixLargeScreenElements() {
        const isLargeScreen = window.innerWidth >= 1960;
        const is4KScreen = window.innerWidth >= 3840;
        
        const midCoin = document.querySelector('.mid-coin');
        const celebrityCards = document.querySelector('.celebrity-cards');
        const celebCards = document.querySelectorAll('.celebrity-image-card');
        
        if (isLargeScreen) {
            if (midCoin) {
                midCoin.style.bottom = is4KScreen ? '0%' : '5%';
                if (is4KScreen) {
                    midCoin.style.width = '300px';
                }
            }
            
            if (celebrityCards) {
                celebrityCards.style.display = 'flex';
                celebrityCards.style.flexDirection = 'row';
                celebrityCards.style.justifyContent = 'center';
                celebrityCards.style.alignItems = 'center';
                celebrityCards.style.gap = is4KScreen ? '80px' : '50px';
            }
            
            celebCards.forEach(card => {
                const img = card.querySelector('.celeb-card-img');
                if (img) {
                    img.style.width = is4KScreen ? '500px' : '350px';
                }
            });
            
            const rightCoin = document.querySelector('.right-coin');
            const rightBigCoin = document.querySelector('.right-big-coin');
            
            if (rightCoin && is4KScreen) {
                rightCoin.style.top = '5%';
            }
            
            if (rightBigCoin && is4KScreen) {
                rightBigCoin.style.bottom = '20%';
            }
        }
    }
    
    fixLargeScreenElements();
    
    window.addEventListener('resize', fixLargeScreenElements);
    
    setTimeout(fixLargeScreenElements, 400);
});