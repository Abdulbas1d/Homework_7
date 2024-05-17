const musicContainerEl = document.getElementById("music-container");
const albumCoverImageEl = document.getElementById("album-cover-image");
const progressEl = document.getElementById("progress");
const progressContainerEl = document.getElementById("progres-container");
const titleEl = document.getElementById("title");
const backwardBtn = document.getElementById("backward");
const playBtn = document.getElementById("play");
const forwardBtn = document.getElementById("forward");
const audioEl = document.getElementById("audio")


const tracks = [
    "Dili-me-Jigarlar",
    "Dili-me-Onajon",
    "Konsta-Ertasi-yoq",
];

let currentSong = 0;

const changeMusic = (song) => {
    titleEl.textContent = `${song}`;
    audioEl.src = `../audio/${song}.mp3`;
    albumCoverImageEl.src = `../images/${song}.jpg`;
};


changeMusic(tracks[currentSong]);

const play = () => {
    musicContainerEl.classList.add("play");
    document.querySelector(
        ".btn-big"
    ).innerHTML = `<i class="fa-solid fa-pause"></i>`
    audioEl.play();
}


const pause = () => {
    musicContainerEl.classList.remove("play");
    document.querySelector(
        ".btn-big"
    ).innerHTML = `<i class="fa-solid fa-play"></i>`
    audioEl.pause();
}

const playSong = () => {
    if (musicContainerEl.classList.contains("play")) {
        pause();
    } else {
        play ();
    }
};

const nextSong = () => {
    if (tracks.length-1 > currentSong) {
        currentSong += 1
    } else {
        currentSong = 0
    }
    changeMusic(tracks[currentSong]);
    play()
}


const prevSong = () => {
    if (currentSong <= 0) {
        currentSong = tracks.length - 1
    } else {
        currentSong -= 1
    }
    changeMusic(tracks[currentSong]);
    play()
}

const progress = (e) => {
    const {duration, currentTime} = e.target;
    const widthTime = (currentTime * 100) / duration;
    console.log(`${widthTime}%`);
    progressContainerEl.style.width = `${widthTime}%`;
};

const progressChange = function (e) {
    const width = this.clientWidth;
    const clickX = e.clientX;

    audioEl.currentTime = clickX / width * audioEl.duration;
}

playBtn.addEventListener("click", playSong);
forwardBtn.addEventListener("click", nextSong); 
backwardBtn.addEventListener("click", prevSong); 
audioEl.addEventListener('timeupdate', progress);
progressEl.addEventListener("click", progressChange);