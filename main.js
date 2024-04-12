const container = document.querySelector(".container");
const mainVideo = document.querySelector("video");
const videoTimeline = document.querySelector(".video-timeline");
const tracker = document.querySelector(".tracker");
const progressBar = document.querySelector(".progress-bar");
const trackerbar = document.querySelector(".trackerbar");
const volumeBtn = document.querySelector(".volume i");
const volumeSlider = document.querySelector(".left input");
const currentVidTime = document.querySelector(".current-time");
const videoDuration = document.querySelector(".video-duration");
const skipBackward = document.querySelector(".skip-backward i");
const skipForward = document.querySelector(".skip-forward i");
const playPauseBtn = document.querySelector(".play-pause i");
const speedBtn = document.querySelector(".playback-speed span");
const speedOptions = document.querySelector(".speed-options");
const pipBtn = document.querySelector(".pic-in-pic span");
const fullScreenBtn = document.querySelector(".fullscreen i");
const scalenumber = document.querySelector('.scalenumber');
const scalerange = document.querySelector('.scalerange');
const opacitynumber = document.querySelector('.opacitynumber');
const opacityrange = document.querySelector('.opacityrange');
const wave = document.querySelector('#waveform')

const zoomSlider = document.querySelector(".zoomRange .zoominput")
let timer;



playPauseBtn.addEventListener("click", () =>(
    mainVideo.paused ? mainVideo.play() : mainVideo.pause() 
)
)
mainVideo.addEventListener("play", () =>(playPauseBtn.classList.replace("fa-play", "fa-pause")))
mainVideo.addEventListener("pause", () =>( playPauseBtn.classList.replace("fa-pause", "fa-play")))

const forward = () =>{
    mainVideo.currentTime += 5
}
const Backward = () =>{
    mainVideo.currentTime -= 5
}
const scalechnage = (e) =>{
    var values = e.value
    mainVideo.style.transform = `scale(${values})`
    scalenumber.value = values
    scalerange.value = scalenumber.value
}
const opacitychnage = (e) =>{
    var values = e.value
    mainVideo.style.opacity = `${values}%`
    opacitynumber.value = values
    opacityrange.value = opacitynumber.value
}
const rotateX = (e) =>{
    var values = e.value
    mainVideo.style.transform = `rotateX(${values}deg)`
}
const rotateY = (e) =>{
    var values = e.value
    mainVideo.style.transform = `rotateY(${values}deg)`
}
const rotateZ = (e) =>{
    var values = e.value
    mainVideo.style.transform = `rotateZ(${values}deg)`
}

const moveX = (e) =>{
    var values = e.value
    mainVideo.style.transform = `translateX(${values}%)`
}
const moveY = (e) =>{
    var values = e.value
    mainVideo.style.transform = `translateY(${values}%)`
}


var zoomwidth = 10
var videoscale = 1
const zoomin = () =>{
    if(zoomSlider.style.width != "100%"){
        zoomwidth += 10
        videoscale += .1
        zoomSlider.style.width  = `${zoomwidth}%`
        wave.style.transform = `scaleX(${videoscale})`
    }  
}
const zoomout = () =>{
    if(zoomSlider.style.width > "0%"){
    zoomwidth -= 10 
    videoscale -= .1 
    zoomSlider.style.width  = `${zoomwidth}%`
    wave.style.transform = `scaleX(${videoscale})`
    }
}

const fullscreen = () =>{
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
}

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});
tracker.addEventListener("click", e => {
    let timelineWidth = tracker.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    trackerbar.style.width = `${percent}%`
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));

const draggableProgressBar2 = e => {
    let timelineWidth = tracker.clientWidth;
    trackerbar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);

}


tracker.addEventListener("mousedown", () => tracker.addEventListener("mousemove", draggableProgressBar2));
document.addEventListener("mouseup", () => tracker.removeEventListener("mousemove", draggableProgressBar2));

volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});





function show(elem){
    if(elem.classList.contains("fa-eye")){
        elem.classList.replace("fa-eye", "fa-eye-slash")
    }else{
        elem.classList.replace("fa-eye-slash", "fa-eye")
    }
}
function show2(elem){
    if(elem.classList.contains("fa-eye")){
        elem.classList.replace("fa-eye", "fa-eye-slash")
        document.querySelector("#waveform").style.opacity = ".5"
    }else{
        elem.classList.replace("fa-eye-slash", "fa-eye")
        document.querySelector("#waveform").style.opacity = "1"
    }
}
function lock(el){
    if(el.classList.contains("fa-lock-open")){
        el.classList.replace("fa-lock-open", "fa-lock")
    }else{
        el.classList.replace("fa-lock", "fa-lock-open")
    }
}