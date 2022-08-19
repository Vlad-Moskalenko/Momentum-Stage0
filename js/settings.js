import {showTime} from './time.js';
import {getQuote} from './quote.js';
import {getCity} from './weather.js';
import {getName} from './greetings.js';
import { setBg } from './slider.js';
import { changeLanguageToDoList } from './Todo.js';

const settingsBtn = document.querySelector('.settings-btn');
const settings = document.querySelector('.settings');
const settingsWrapper = document.querySelector('.settings-wrapper')
const languageSettings = document.querySelector('.language-settings-list');
const showBlocksSettings = document.querySelector('.show-settings-list');
const backgroundSettings = document.querySelector('.background-settings-list');
const settingsEnArray = ['HIDE', 'Clock', 'Date', 'Greeting', 'Quote', 'Playlist', 'Audioplayer', 'Weather', 'ToDo', 'LANGUAGE', 'English', 'Ukrainian', 'BACKGROUND IMAGE', 'Github', 'Unsplash API', 'Flickr API']
const settingsUkArray = ['ПРИХОВАТИ', 'Годинник ', 'Дата', 'Привітання', 'Цитати', 'Плейліст', 'Аудіоплеєр', 'Погода', 'Список справ', 'МОВА', 'Англійська', 'Українська', 'ФОНОВЕ ЗОБРАЖЕННЯ', 'Github', 'Unsplash API', 'Flickr API']

function setLanguage(inputValue){
    localStorage.setItem('lang', inputValue)
}

export function getLanguage(){
    let lang = localStorage.getItem('lang')
    lang? lang : lang = 'en'
    document.querySelector(`#${lang}`).setAttribute('checked', true)
    return lang
}

function setBackgroundImage(inputValue, tag){
    localStorage.setItem('backgroundImageSource', inputValue)
    tag? localStorage.setItem('imageTag', tag) : null
    setBg()
}

export function showHideBlock(block){
    if(block.classList.contains('hidden')){
        block.classList.remove('hidden')
        block.classList.add('visible')
    }
    else{
        block.classList.remove('visible')
        block.classList.add('hidden')
    }
}

export function hideBlocks(){
    let hideBlocks = localStorage.getItem('hideBlockArray')
    if(hideBlocks){
        let hideBlocksArray = hideBlocks.split(',')
        hideBlocksArray.forEach(item=>{
            document.querySelector(`#${item}`).classList.add('hidden')
            document.querySelector(`input[value=${item}]`).setAttribute('checked', true)
        })
    }
}

export function changeSettingsLanguage(lang){
    const settingsSpanList = settings.querySelectorAll('span');
    for(let i=0; i<settingsSpanList.length; i++){
        lang==='uk'? settingsSpanList[i].textContent = settingsUkArray[i] : settingsSpanList[i].textContent = settingsEnArray[i]
    }  
}

languageSettings.addEventListener('change', (e)=>{
    let lang = e.target.value
    changeLanguageToDoList(lang)
    changeSettingsLanguage(lang)
    setLanguage(lang)
    getQuote(lang)
    showTime(lang)
    getCity(lang)
    getName(lang)
})

showBlocksSettings.addEventListener('change', (e)=>{
    const block = document.querySelector(`#${e.target.value}`)
    showHideBlock(block)
})

settingsBtn.addEventListener('click', ()=>{
    showHideBlock(settings)

    if(settings.classList.contains('visible')) {
        document.addEventListener('click', (e)=>{
        if(!settingsWrapper.contains(e.target)) {
            settings.classList.remove('visible')
            settings.classList.add('hidden')
        }
    })
    }

})

backgroundSettings.addEventListener('change', (e)=>{
    const tag = e.target.parentElement.lastElementChild.value
    const inputValue = e.target.parentElement.firstElementChild.value
    e.target.parentElement.firstElementChild.checked = true;
    setBackgroundImage(inputValue, tag)
})

window.addEventListener('unload', ()=>{
    const hideBlocksArray = []
    document.querySelectorAll('.show-settings-list li').forEach(item => {
        const inputCheckbox = item.lastElementChild
        inputCheckbox.checked? hideBlocksArray.push(inputCheckbox.value) : null
    })
    hideBlocksArray.length>0? localStorage.setItem('hideBlockArray', hideBlocksArray) : localStorage.removeItem('hideBlockArray')
})
