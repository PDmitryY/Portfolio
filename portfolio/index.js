import i18Obj from './translate.js';

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const hero = document.querySelector('#hero.section');
const header = document.querySelector('header>.container');
const main = document.querySelector('.main')
const logo = document.querySelector('.logo')

const portfolioBtn = document.querySelectorAll('.portfolio-btn')
const portfolioBtns = document.querySelector('.portfolio-buttons')
const portfolioImages = document.querySelectorAll('.portfolio-image')
const seasons = ['winter', 'spring', 'summer', 'autumn'];

const switchLng = document.querySelector('.switch-lng')

const skills = document.querySelector('#skills')
const portfolio = document.querySelector('#portfolio')
const video = document.querySelector('#video')
const price = document.querySelector('#price')
const html = document.querySelector('html')


const theme = document.querySelector('.theme')
const sectionTitle = document.querySelectorAll('.section-title')
const sectionTitleSpan = document.querySelectorAll('.section-title span')
const skillsItem = document.querySelectorAll('.skills-item')
const priceItem = document.querySelectorAll('.price-item')
const menuLink = document.querySelectorAll('.menu-link')
const hamburgerLine = document.querySelectorAll('.line')
const themeElements = [skills, portfolio, video, price, html, menu]

const videoPlayer = document.querySelector('.video-player')
const controls = document.querySelector('.video-player-controls')
const videoPlayed = videoPlayer.querySelector('.viewer')
const rangePlay = videoPlayer.querySelector('input.player-slider')
const rangeVolume = videoPlayer.querySelector('.volume-slider')
const play = document.querySelector('.play')
const playerButton = document.querySelector('.player-button')
const volumeButton = document.querySelector('.volume-button')


function handleVolumeRange () {
    videoPlayed[this.name] = this.value
    rangeVolume.style.backgroundSize = `${this.value*100}% 100%`;
    if(this.value == 0) {
        volumeButton.classList.add('mute')
    } else {
        volumeButton.classList.remove('mute')
    }
}

function handleProgressRange () {
    console.log(this.value)
    videoPlayed.currentTime = (Math.round(this.value * 100) / 100) * videoPlayed.duration
}

function muteVolume() {
    volumeButton.classList.toggle('mute')
    if(videoPlayed['volume'] != 0){
        videoPlayed['volume'] = 0
        rangeVolume.value = 0
        rangeVolume.style.backgroundSize = `0% 100%`;
    } else {
        videoPlayed['volume'] = 0.1
        rangeVolume.value = 0.1
        rangeVolume.style.backgroundSize = `10% 100%`;
    }
}

function progressRange () {
    rangePlay.value = videoPlayed.currentTime / videoPlayed.duration;
    rangePlay.style.backgroundSize = `${rangePlay.value*100}% 100%`;
    if(videoPlayed.currentTime == videoPlayed.duration) {
        play.style.zIndex = "1"
    }
}

videoPlayed.addEventListener('timeupdate', progressRange)
rangePlay.addEventListener('input', handleProgressRange)
rangeVolume.addEventListener('change', handleVolumeRange)
rangeVolume.addEventListener('mousemove', handleVolumeRange)
volumeButton.addEventListener('click', muteVolume)

function togglePlay () {
    controls.style.zIndex = "1"
    if(videoPlayed.paused) {
        videoPlayed.play()
        playerButton.classList.toggle('pause')
        play.style.zIndex = "-1"
    } else {
        videoPlayed.pause()
        playerButton.classList.toggle('pause')
        play.style.zIndex = "1"
    }
}

play.addEventListener('click', togglePlay)
playerButton.addEventListener('click', togglePlay)
videoPlayed.addEventListener('click', togglePlay)

/* let lang = 'ru'
let thema = 'dark'  

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('thema', thema);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        getTranslate(lang);
    }
    if(localStorage.getItem('thema')) {
        const thema = localStorage.getItem('thema');
        changeTheme(thema);
    } 
}
window.addEventListener('load', getLocalStorage) */

const button = document.querySelector('.ripple')

button.addEventListener('click', function (e) {
  const x = e.clientX
  const y = e.clientY

  const buttonTop = e.target.offsetTop
  const buttonLeft = e.target.offsetLeft

  const xInside = x - buttonLeft
  const yInside = y - buttonTop

  const circle = document.createElement('span')
  circle.classList.add('circle')
  circle.style.top = yInside + 'px'
  circle.style.left = xInside + 'px'

  this.appendChild(circle)

  setTimeout(() => circle.remove(), 500)
})

function toggleMenu() {
  hamburger.classList.toggle('open');
  menu.classList.toggle('open');
  header.classList.toggle('open');
  main.classList.toggle('open');
  logo.classList.toggle('open');
}

function closeMenu() {
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    hero.classList.remove('open');
    header.classList.remove('open');
    main.classList.remove('open');
    logo.classList.remove('open');
}

function preloadImages() {
    seasons.forEach((element) => {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${element}/${i}.jpg`;
          }
    })
  }
preloadImages();

function changeTheme(){
    themeElements.forEach((el) => {
        el.classList.toggle('light-theme');
    })
    sectionTitle.forEach((el) => {
        el.classList.toggle('light-theme');
    })
    sectionTitleSpan.forEach((el) => {
        el.classList.toggle('light-theme');
    })
    skillsItem.forEach((el) => {
        el.classList.toggle('light-theme');
    })
    portfolioBtn.forEach((el) => {
        el.classList.toggle('light-theme');
    })
    priceItem.forEach((el) => {
        el.classList.toggle('light-theme');
    })
    menuLink.forEach((el) => {
        el.classList.toggle('light-theme');
    })
    hamburgerLine.forEach((el) => {
        el.classList.toggle('light-theme');
    })
    theme.classList.toggle('light');
}

function changeClassActive(className) {
    className.classList.add('active');
}

function changeImage(event) {
    if(event.target.classList.contains('portfolio-btn')) {
        document.querySelectorAll('.portfolio-btn').forEach((element)=>{element.classList.remove('active')})
        changeClassActive(event.target)
        portfolioImages.forEach((img, index) => {
            img.src = `assets/img/${event.target.dataset.season}/${index + 1}.jpg`
        })
    }
}

function getTranslate(event) {
    if (event.target.classList.contains('switch-lng-ru')) {
        document.querySelectorAll('[data-i18]').forEach((element, index) => {
            let data = element.dataset.i18
            element.textContent = i18Obj.ru[data];
        })
        event.target.classList.add('active')
        document.querySelector('.switch-lng-en').classList.remove('active')
    } else if (event.target.classList.contains('switch-lng-en')) {
        document.querySelectorAll('[data-i18]').forEach((element, index) => {
            let data = element.dataset.i18
            element.textContent = i18Obj.en[data];
        })
        event.target.classList.add('active')
        document.querySelector('.switch-lng-ru').classList.remove('active')
    }
}

hamburger.addEventListener('click', toggleMenu);

menu.addEventListener('click', closeMenu);

portfolioBtns.addEventListener('click', changeImage);

switchLng.addEventListener('click', getTranslate);

theme.addEventListener('click', changeTheme);
