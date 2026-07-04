/* =====================================
   PROJECTS.JS
   ===================================== */

   document.addEventListener("DOMContentLoaded", () => {

    const projectSection = document.querySelector("#projects");

    if(!projectSection){
        return;
    }

    const projectTitles = projectSection.querySelectorAll("h3");

    projectTitles.forEach((project)=>{

        project.style.cursor = "pointer";

        project.addEventListener("mouseenter",()=>{

            project.style.color = "#38bdf8";
            project.style.transition = "0.3s";

        });

        project.addEventListener("mouseleave",()=>{

            project.style.color = "";

        });

        project.addEventListener("click",()=>{

            const details = project.nextElementSibling;

            if(details){

                if(details.style.display === "none"){

                    details.style.display = "block";

                }
                else{

                    details.style.display = "none";

                }

            }

        });

    });

});


/* =====================================
   SCROLL TO PROJECTS
   ===================================== */

function goToProjects(){

    const section = document.getElementById("projects");

    if(section){

        section.scrollIntoView({

            behavior:"smooth"

        });

    }

}


/* =====================================
   PROJECT COUNTER
   ===================================== */

const projectCount = document.querySelectorAll("#projects h3").length;

console.log("Total Projects :", projectCount);


/* =====================================
   PROJECT HOVER EFFECT
   ===================================== */

const projectLists = document.querySelectorAll("#projects ul");

projectLists.forEach((list)=>{

    list.addEventListener("mouseenter",()=>{

        list.style.transform = "scale(1.02)";
        list.style.transition = ".3s";

    });

    list.addEventListener("mouseleave",()=>{

        list.style.transform = "scale(1)";

    });

});


/* =====================================
   SIMPLE FADE-IN ANIMATION
   ===================================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.2
});

projectLists.forEach((list)=>{

    list.style.opacity = "0";
    list.style.transform = "translateY(30px)";
    list.style.transition = ".8s ease";

    observer.observe(list);

});