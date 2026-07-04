/* ===========================
   STICKY NAVBAR
=========================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.background = "#111827";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.3)";

    }
    else{

        header.style.background = "#0f172a";
        header.style.boxShadow = "none";

    }

});


/* ===========================
   ACTIVE NAVIGATION
=========================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") == "#" + current){

            link.classList.add("active");

        }

    });

});


/* ===========================
   SMOOTH SCROLL
=========================== */

navLinks.forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        const id = link.getAttribute("href");

        const target = document.querySelector(id);

        window.scrollTo({

            top: target.offsetTop - 70,

            behavior:"smooth"

        });

    });

});


/* ===========================
   SCROLL TO TOP BUTTON
=========================== */

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "30px";
topBtn.style.right = "30px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#38bdf8";
topBtn.style.color = "white";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";


window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        topBtn.style.display = "block";

    }
    else{

        topBtn.style.display = "none";

    }

});


topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/* ===========================
   REVEAL ANIMATION
=========================== */

const revealElements = document.querySelectorAll("section");

const reveal = ()=>{

    revealElements.forEach(section=>{

        const windowHeight = window.innerHeight;

        const revealTop = section.getBoundingClientRect().top;

        if(revealTop < windowHeight - 120){

            section.style.opacity = "1";
            section.style.transform = "translateY(0)";

        }

    });

};


revealElements.forEach(section=>{

    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";
    section.style.transition = ".8s ease";

});

window.addEventListener("scroll",reveal);

reveal();


/* ===========================
   CURRENT YEAR
=========================== */

const footer = document.querySelector("footer p");

const year = new Date().getFullYear();

footer.innerHTML = `© ${year} Roshan Kumar Mahto. All Rights Reserved.`;