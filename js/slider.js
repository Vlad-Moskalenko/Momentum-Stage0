const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

let randomImgNumber = getRandomNumber(19, 1).toString().padStart(2, '0');

export function setBg(){
    const source = localStorage.getItem('backgroundImageSource');
    const tag = getTagForBackground();

    if(source==='unsplash') {
        const unsplashURL = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=RettGyNtRcGqCERFzZOsyzJBIV7ZE_7YeW-8H6ix8B0`
        document.querySelector(`#${source}`).setAttribute('checked', true)
        document.querySelector(`#${source}TagInput`).value = tag
        getLinkToImage(unsplashURL, source)
    }

    else if(source==='flickr') {
        const flickrURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=cc4337b600cf1e085c0139611846b6df&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`
        document.querySelector(`#${source}`).setAttribute('checked', true)
        document.querySelector(`#${source}TagInput`).value = tag
        getLinkToImage(flickrURL, source)
    }

    else{
        const timeOfDay = localStorage.getItem('partOfDayTag')
        document.querySelector(`#github`).setAttribute('checked', true)
        let url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomImgNumber}.jpg`;

        let img = new Image();
        img.src = url;

        img.onload = () => {
            document.body.style.backgroundImage = `url(${url})`
        }
    }
}

function getSlideNext(){
    randomImgNumber++
    randomImgNumber>20? randomImgNumber = '1'.padStart(2, '0') : randomImgNumber = randomImgNumber.toString().padStart(2, '0')
    setBg()
}

function getSlidePrev(){
    randomImgNumber--
    randomImgNumber<1? randomImgNumber = '20'.padStart(2, '0') : randomImgNumber = randomImgNumber.toString().padStart(2, '0')
    setBg()
}

function getLinkToImage(url, source){
    fetch(url)
    .then(resp=>resp.json())
    .then(data => {
        let url;
        
        if(source === 'unsplash') url = data.urls.regular
        else {
            const randomNumber = getRandomNumber(data.photos.photo.length, 0)
            url = data.photos.photo[randomNumber].url_l
        }

        let img = new Image();
        img.src = url;

        img.onload = () => {
            document.body.style.backgroundImage = `url(${url})`
        }
        })
}

function getTagForBackground(){
    const inputTag = localStorage.getItem('imageTag')
    return inputTag? inputTag : localStorage.getItem('partOfDayTag')
}

export function getRandomNumber(length, min){
    return Math.floor(Math.random()*length + min)
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
