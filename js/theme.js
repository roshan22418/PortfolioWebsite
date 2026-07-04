/* ===========================
   DARK / LIGHT MODE
=========================== */

const themeBtn = document.getElementById("themeToggle");
const body = document.body;
const icon = themeBtn.querySelector("i");

/* ===========================
   LOAD SAVED THEME
=========================== */

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){

    body.classList.add("light");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}

/* ===========================
   TOGGLE THEME
=========================== */

themeBtn.addEventListener("click",()=>{

    body.classList.toggle("light");

    if(body.classList.contains("light")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme","light");

    }
    else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme","dark");

    }

});