/* ===========================
   DARK / LIGHT MODE
   (saved theme is applied in <head> to avoid a flash)
=========================== */

const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const themeIcon = themeBtn.querySelector("i");

function applyTheme(theme){

    root.setAttribute("data-theme", theme);

    themeIcon.classList.toggle("fa-moon", theme === "dark");
    themeIcon.classList.toggle("fa-sun", theme === "light");

    const meta = document.querySelector('meta[name="theme-color"]');
    if(meta){
        meta.setAttribute("content", theme === "light" ? "#f8fafc" : "#0f172a");
    }

}

applyTheme(root.getAttribute("data-theme") || "dark");

themeBtn.addEventListener("click", () => {

    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";

    applyTheme(next);

    try{
        localStorage.setItem("theme", next);
    }catch(e){}

});
