const text="A Beautiful Blessing";

let i=0;

function typeWriter(){

if(i<text.length){

document.getElementById("typing").innerHTML+=text.charAt(i);

i++;

setTimeout(typeWriter,90);

}

}

window.onload=function(){

typeWriter();

}

const loader=document.getElementById("loader");

const envelope=document.getElementById("envelopeScreen");

const hero=document.getElementById("hero");

const music=document.getElementById("music");

document.getElementById("enterButton").onclick=function(){

music.volume=.25;

music.play();

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

envelope.style.display="flex";

},800);

}

document.querySelector(".envelope").onclick=function(){

this.classList.add("open");

setTimeout(()=>{

envelope.style.opacity="0";

},1500);

setTimeout(()=>{

envelope.style.display="none";

hero.style.display="block";

document.body.style.overflow="auto";

window.scrollTo(0,0);

},2200);

}
const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".fade").forEach(section=>{

observer.observe(section);

});
const books=document.querySelectorAll(".book");

const bookObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate(

[

{

opacity:0,

transform:"translateY(80px) scale(.97)"

},

{

opacity:1,

transform:"translateY(0) scale(1)"

}

],

{

duration:1400,

fill:"forwards",

easing:"ease"

}

);

}

});

});

books.forEach(book=>{

book.style.opacity=0;

bookObserver.observe(book);

});
/* =======================================
   GALLERY
======================================= */

const galleryItems=document.querySelectorAll(".gallery-item");

const lightbox=document.getElementById("lightbox");

const lightboxImage=document.getElementById("lightboxImage");

const closeLightbox=document.getElementById("closeLightbox");

const prev=document.getElementById("prevPhoto");

const next=document.getElementById("nextPhoto");

let currentPhoto=0;

/* ---------- Fade Animation ---------- */

const galleryObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

galleryItems.forEach((photo,index)=>{

setTimeout(()=>{

photo.classList.add("show");

},index*150);

});

}

});

},{threshold:.2});

galleryObserver.observe(document.querySelector(".gallery-grid"));

/* ---------- Lightbox ---------- */

galleryItems.forEach((photo,index)=>{

photo.addEventListener("click",()=>{

currentPhoto=index;

showPhoto();

lightbox.style.display="flex";

document.body.style.overflow="hidden";

});

});

function showPhoto(){

lightboxImage.src=galleryItems[currentPhoto].src;

}

next.onclick=()=>{

currentPhoto++;

if(currentPhoto>=galleryItems.length){

currentPhoto=0;

}

showPhoto();

}

prev.onclick=()=>{

currentPhoto--;

if(currentPhoto<0){

currentPhoto=galleryItems.length-1;

}

showPhoto();

}

closeLightbox.onclick=()=>{

lightbox.style.display="none";

document.body.style.overflow="auto";

}

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.style.display="none";

document.body.style.overflow="auto";

}

}
/* =======================================
BIRTH CARDS
======================================= */

const birthCards=document.querySelectorAll(".birth-card");

const birthObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

birthCards.forEach((card,index)=>{

setTimeout(()=>{

card.classList.add("show");

},index*180);

});

}

});

},{threshold:.25});

birthObserver.observe(document.querySelector(".birth-grid"));
/* =======================================
COUNTDOWN
======================================= */

const targetDate=new Date("September 26, 2026 10:00:00").getTime();

setInterval(()=>{

const now=new Date().getTime();

const distance=targetDate-now;

document.getElementById("days").innerHTML=Math.floor(distance/(1000*60*60*24));

document.getElementById("hours").innerHTML=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

document.getElementById("minutes").innerHTML=Math.floor((distance%(1000*60*60))/(1000*60));

document.getElementById("seconds").innerHTML=Math.floor((distance%(1000*60))/1000);

},1000);
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.25

});

timelineItems.forEach(item=>{

    timelineObserver.observe(item);

});
const form = document.getElementById("rsvpForm");
const popup = document.getElementById("successPopup");

form.addEventListener("submit", function(e){

    e.preventDefault();

    popup.classList.add("show");

    form.reset();

});

function closePopup(){

    popup.classList.remove("show");

}
window.addEventListener("scroll",()=>{

    const winScroll=document.documentElement.scrollTop;

    const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

    document.getElementById("progressBar").style.width=(winScroll/height)*100+"%";

});
const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click", () => {

    if (playing) {

        bgMusic.pause();

        musicBtn.innerHTML = "♪";

    } else {

        bgMusic.play();

        musicBtn.innerHTML = "❚❚";

    }

    playing = !playing;

});