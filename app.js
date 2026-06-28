const video = document.getElementById("video");

const student = document.getElementById("student");
const group = document.getElementById("group");
const song = document.getElementById("song");
const artist = document.getElementById("artist");
const counter = document.getElementById("counter");

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const list = document.getElementById("list");
const randomBtn = document.getElementById("randomBtn");

let current = 0;

function loadVideo(){

const item = playlist[current];

student.textContent = item.student;
group.textContent = item.group;
song.textContent = item.song;
artist.textContent = item.artist;

counter.textContent = `${current+1} de ${playlist.length}`;

video.src = item.video;
video.load();
video.play().catch(()=>{});

}

function next(){
current = (current + 1) % playlist.length;
loadVideo();
}

function prev(){
current = (current - 1 + playlist.length) % playlist.length;
loadVideo();
}

function random(){

let newIndex;

do {
newIndex = Math.floor(Math.random() * playlist.length);
} while(newIndex === current && playlist.length > 1);

current = newIndex;
loadVideo();

}

/* LISTA */
function renderList(){

list.innerHTML = "";

playlist.forEach((item, index)=>{

const div = document.createElement("div");

div.className = "item";

div.textContent = `${item.student} • ${item.group}`;

div.onclick = ()=>{

current = index;
loadVideo();
closeSidebar();

};

list.appendChild(div);

});

}

/* SIDEBAR */
function openSidebar(){
sidebar.classList.add("open");
overlay.classList.add("show");
}

function closeSidebar(){
sidebar.classList.remove("open");
overlay.classList.remove("show");
}

/* EVENTS */
document.getElementById("next").onclick = next;
document.getElementById("prev").onclick = prev;
randomBtn.onclick = random;

counter.onclick = openSidebar;
overlay.onclick = closeSidebar;

video.addEventListener("ended", next);

/* INIT */
renderList();
loadVideo();