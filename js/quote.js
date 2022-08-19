import { getRandomNumber } from "./slider.js";

const quoteDiv = document.querySelector('.quote');
const authorDiv = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');
let index;

export function getQuote(){
    let quoteJson;
    localStorage.getItem('lang') === 'uk'? quoteJson = 'assets/quoteUk.json' : quoteJson = 'assets/quote.json';

    fetch(quoteJson)
    .then(resp => resp.json())
    .then(data => {
        const randomNum = getRandomNumber(data.length-1, 0);
        if(index===randomNum) index===data.length-1? index=0 : index++
        else index=randomNum;
        const quote = data[index];
        quoteDiv.textContent = quote.text;
        authorDiv.textContent = quote.author;
    })
}

changeQuoteBtn.addEventListener('click', getQuote);