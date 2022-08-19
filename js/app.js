import {showTime} from './time.js';
import {getQuote} from './quote.js';
import {getCity} from './weather.js';
import {getName} from './greetings.js';
import {playList} from "./playList.js";
import {createPlayList} from './audioplayer.js'
import {getLanguage, hideBlocks, changeSettingsLanguage} from './settings.js';
import { getToDoList } from './Todo.js';

window.addEventListener('load', ()=>{
    const lang = getLanguage()
    getToDoList(lang)
    changeSettingsLanguage(lang)
    hideBlocks()
    getQuote()
    showTime()
    getCity(lang)
    getName(lang)
    playList.forEach(sound => createPlayList(sound))
})

console.log("Score:" + 150)