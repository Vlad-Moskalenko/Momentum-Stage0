const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar')
const trackName = document.querySelector('.track-name');
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playListUl = document.querySelector('.play-list');
const durationPlayer = document.querySelector('.duration-player');
const trackTime = document.querySelector('.track-time');
const soundIcon = document.querySelector('.sound-icon');
const soundRange = document.querySelector('.sound-range');
let playListLi;
let indexOfCurrentTrack=0;
let currentTrack;
let currentAudio;
let soundFlag = true;
let volume = 0.5;

export function createPlayList(sound){
    const liAudio = document.createElement('li');

    liAudio.classList.add('play-item')
    liAudio.innerHTML = `<span>${sound.title}</span>`
    liAudio.insertAdjacentHTML("afterbegin", `<audio src='${sound.src}'></audio>`)
    playListUl.append(liAudio)

    getCurrentTrack()
}

function playMusic() {
    getCurrentTrack()
    showCurrentTrackName()
    showProgressBar()
    
    currentTrack.classList.add('item-active');

    if(playBtn.classList.contains('pause')) {
        currentAudio.play()
        currentAudio.addEventListener('ended', playNextTrack)
        pseudoPlay()
    } 

    else{currentAudio.pause()
        pseudoPause()
    }

    currentAudio.addEventListener('timeupdate', (e)=> updateProgress(e.target))

    currentTrack.addEventListener('click', add)

    soundFlag? currentAudio.volume = volume : currentAudio.volume = 0;

}

function add(){
    currentTrack.classList.contains('pause-icon')? pseudoPause() : pseudoPlay()
}

function getCurrentTrack(){
    playListLi = playListUl.querySelectorAll('li');
    currentTrack = playListLi[indexOfCurrentTrack]
    currentAudio = currentTrack.querySelector('audio')
}

function showProgressBar(){
    progressBar.classList.remove('hidden')
    progressBar.classList.add('visible')
    document.querySelector('input[value=progressBar]').removeAttribute('checked')
}

function removePreviousTrack(){
    currentTrack.classList.remove('item-active')
    currentAudio.pause()
}

function playNextTrack(){
    currentTrack.removeEventListener('click', add)
    playBtn.classList.add('pause');
    removePreviousTrack()
    indexOfCurrentTrack<playListLi.length-1? indexOfCurrentTrack++ : indexOfCurrentTrack = 0;
    currentAudio.currentTime = 0;
    playMusic()
}

function playPrevTrack(){
    currentTrack.removeEventListener('click', add)
    playBtn.classList.add('pause');
    removePreviousTrack()
    indexOfCurrentTrack>0? indexOfCurrentTrack-- : indexOfCurrentTrack = playListLi.length-1;
    currentAudio.currentTime = 0;
    playMusic()
}

function updateProgress(currentAudio){
    progress.style.width = (currentAudio.currentTime/currentAudio.duration)*100+'%';
    showCurrentTrackTime()
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX
    currentAudio.currentTime = clickX/width*currentAudio.duration
}

function showCurrentTrackName(){
   trackName.textContent = `${currentTrack.querySelector('span').textContent}`
}

function showCurrentTrackTime(){
    const currentTime = getTime(currentAudio.currentTime)
    const totalTime = getTime(currentAudio.duration)
    trackTime.textContent = `${currentTime} / ${totalTime}`
}

function getTime(time) {
    let seconds = parseInt(time);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    return hours === 0? `${minutes}:${String(seconds % 60).padStart(2, 0)}`:
    `${String(hours).padStart(2, 0)}:${String(minutes).padStart(2,0)}:${String(seconds % 60).padStart(2, 0)}`;
  }

function turnSound(){
    soundIcon.classList.toggle('sound-off')
    soundFlag? currentAudio.volume = 0 : currentAudio.volume = soundRange.value/100
    soundFlag = !soundFlag
}

function setVolume(e){
    volume = e.target.value/100;
    soundFlag? currentAudio.volume = volume : currentAudio.volume = 0;
}

function pseudoPlay(){
    const prevTrack = document.querySelector('.pause-icon') || document.querySelector('.play-icon')
    prevTrack? prevTrack.classList.remove('pause-icon') || prevTrack.classList.remove('play-icon') : null;
    currentTrack.classList.add('pause-icon')
    playBtn.classList.add('pause');
    currentAudio.play()
}

function pseudoPause(){
    const prevTrack = document.querySelector('.pause-icon')
    prevTrack? prevTrack.classList.remove('pause-icon') : null;
    currentTrack.classList.add('play-icon')
    playBtn.classList.remove('pause');
    currentAudio.pause()
}

playBtn.addEventListener('click', () => {
    playBtn.classList.toggle('pause');
    playMusic()
})

playPrevBtn.addEventListener('click', playPrevTrack);

playNextBtn.addEventListener('click', playNextTrack);

durationPlayer.addEventListener('click', setProgress);

soundIcon.addEventListener('click', turnSound);

soundRange.addEventListener('change', setVolume);
