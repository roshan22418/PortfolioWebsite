/* ===========================
   TYPING EFFECT
=========================== */

const typingElement = document.getElementById("typing");

const words = [

    "B.Tech (CSAI) Student",
    "Machine Learning Enthusiast",
    "Computer Vision",
    "Natural Language Processing"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!deleting){

        typingElement.textContent =
            currentWord.substring(0,charIndex+1);

        charIndex++;

        if(charIndex === currentWord.length){

            deleting = true;

            setTimeout(typeEffect,1800);

            return;

        }

    }
    else{

        typingElement.textContent =
            currentWord.substring(0,charIndex-1);

        charIndex--;

        if(charIndex === 0){

            deleting = false;

            wordIndex++;

            if(wordIndex === words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 60 : 120);

}

typeEffect();