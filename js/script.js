/* ===========================
   HEADER SHADOW ON SCROLL + BACK TO TOP
=========================== */

const header = document.getElementById("header");
const topBtn = document.getElementById("topBtn");

function onScroll(){

    header.classList.toggle("scrolled", window.scrollY > 50);
    topBtn.classList.toggle("show", window.scrollY > 400);

}

window.addEventListener("scroll", onScroll, { passive:true });
onScroll();

topBtn.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
});


/* ===========================
   MOBILE MENU
=========================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = navMenu.querySelectorAll("a");

function setMenu(open){

    navMenu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.querySelector("i").className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";

}

menuToggle.addEventListener("click", () => {
    setMenu(!navMenu.classList.contains("open"));
});

navLinks.forEach(link => {
    link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){ setMenu(false); }
});


/* ===========================
   ACTIVE NAVIGATION (IntersectionObserver)
=========================== */

const sectionsWithId = document.querySelectorAll("main section[id]");

const navObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(!entry.isIntersecting){ return; }

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });

    });

}, { rootMargin:"-45% 0px -50% 0px" });

sectionsWithId.forEach(section => navObserver.observe(section));


/* ===========================
   REVEAL ON SCROLL
=========================== */

const revealObserver = new IntersectionObserver((entries, obs) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
        }

    });

}, { threshold:0.08 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));


/* ===========================
   CURRENT YEAR
=========================== */

document.getElementById("footerText").textContent =
    "© " + new Date().getFullYear() + " Roshan Kumar Mahto. All rights reserved.";
