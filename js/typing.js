/* ===========================
   TYPING EFFECT
=========================== */

const typingElement = document.getElementById("typing");

const words = [
    "B.Tech (CSAI) Student at IIIT Delhi",
    "Machine Learning Enthusiast",
    "Computer Vision",
    "Natural Language Processing"
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!deleting){

        charIndex++;
        typingElement.textContent = currentWord.substring(0, charIndex);

        if(charIndex === currentWord.length){
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }

    }
    else{

        charIndex--;
        typingElement.textContent = currentWord.substring(0, charIndex);

        if(charIndex === 0){
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

if(reduceMotion){
    typingElement.textContent = words[0];
    typingElement.style.animation = "none";
}
else{
    typeEffect();
}
