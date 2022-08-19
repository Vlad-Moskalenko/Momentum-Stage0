import {showHideBlock} from './settings.js'

const toDoList = document.querySelector('.todo-list')
const newToDo = document.querySelector('#inputNewToDo')
const toDoBtn = document.querySelector('.todo-btn')
const todo = document.querySelector('.todo')

toDoBtn.addEventListener('click', ()=>showHideBlock(todo))

newToDo.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter') {
        createToDoListItem(newToDo.value)
        newToDo.value = '';
    }
})

function createToDoListItem(value, checked){
    const liItem = document.createElement('li')
    if(value) {
        if(checked){
            liItem.innerHTML += `<input type='checkbox' checked>`;
            liItem.innerHTML +=`<input type='text' value='${value}'>`;
            liItem.querySelector('input[type=text]').classList.add('text-decoration');
        }

        if(!checked) {
            liItem.innerHTML += `<input type='checkbox'>`
            liItem.innerHTML +=`<input type='text' value='${value}'>`;
        } 

        liItem.innerHTML +=`<button class="close-btn">&#9932</button>`;

        toDoList.prepend(liItem)
    }
}

export function getToDoList(lang){
    changeLanguageToDoList(lang)
    if(localStorage.getItem('toDoList')) {
        const valueArr = localStorage.getItem('toDoList').split(',')
        const checkedArr = localStorage.getItem('toDoListChecked').split(',')

        for(let i=valueArr.length-1; i>=0; i--){
            createToDoListItem(valueArr[i], checkedArr[i])
        }
    }
}

export function changeLanguageToDoList(lang) {
    if(lang==='uk') {
        toDoBtn.textContent = 'Список справ'
        newToDo.placeholder = 'Нова справа'
    }
    else{
        toDoBtn.textContent = 'ToDo'
        newToDo.placeholder = 'New ToDo'
    }
}

toDoList.addEventListener('click', (e)=>{
    const li = e.target.parentElement
    if(e.target === li.firstElementChild){
        li.querySelector('input[type=text]').classList.toggle('text-decoration')
    }
    if(e.target === li.querySelector('.close-btn')){
        li.remove()
    }
})

window.addEventListener('unload', ()=>{
    const toDoListArr = []
    const toDoListChecked = []

    toDoList.querySelectorAll('input[type=text]').forEach(item=>{
        toDoListArr.push(item.value)
    })
    toDoList.querySelectorAll('input[type=checkbox]').forEach(item=>{
       item.checked? toDoListChecked.push(item.checked) : toDoListChecked.push('')
    })
    
    localStorage.setItem('toDoList', toDoListArr)
    localStorage.setItem('toDoListChecked', toDoListChecked)
})
