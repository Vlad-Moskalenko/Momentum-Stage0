import {showGreeting} from './greetings.js';
import {getLanguage} from './settings.js';

export function showTime(){
    const time = document.querySelector('.time');
    const date = document.querySelector('.date');
    const lang = getLanguage()
    const currentDate = new Date();

    time.textContent = getTime(currentDate)
    date.textContent = getDate(currentDate, lang)
    showGreeting(currentDate, lang)
    setTimeout(showTime, 1000)
}

function getTime(currentDate){
    return currentDate.toLocaleTimeString('en-US', {hour12: false})
}

function getDate(currentDate, lang){
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    return currentDate.toLocaleDateString(lang, options)
}
