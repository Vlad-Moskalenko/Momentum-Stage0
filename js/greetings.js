import {setBg} from './slider.js'

const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const greetingArrayUk = ['Добраніч', 'Доброго ранку', 'Добрий день', 'Добрий вечір'];
const greetingArrayEn = ['night', 'morning', 'afternoon', 'evening'];
let index;
let placeholder;

export function showGreeting(currentDate, lang){
    greeting.textContent = getCurrentPartOfDay(currentDate, lang);
}

function getCurrentPartOfDay(currentDate, lang){
    const partOfDay = Math.floor(currentDate.getHours()/6);
    if(index !== partOfDay) {
        index = partOfDay
        localStorage.setItem('partOfDayTag', greetingArrayEn[index])
        setBg()
    }

    return lang==='uk'? greetingArrayUk[index] : `Good ${greetingArrayEn[index]}`
}

export function getName(lang){
    const myName = localStorage.getItem('name');
    lang==='uk'? placeholder = '[Введіть ім\'я]' : placeholder = '[Enter name]'
    myName? nameInput.value = myName : nameInput.setAttribute('placeholder', placeholder)
}

function setName(){
    if(nameInput.value) localStorage.setItem('name', nameInput.value)
    else{
        localStorage.removeItem('name')
        nameInput.setAttribute('placeholder', placeholder)
    }
}

nameInput.addEventListener('input', setName);