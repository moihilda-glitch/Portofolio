// ==========================================
// Portfolio Moihilda
// script.js
// ==========================================

// ================= NAVBAR SCROLL =================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});

// ================= ACTIVE MENU =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", ()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if(scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

// ================= BACK TO TOP =================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 300){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.onclick=function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// ================= FADE ANIMATION =================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section").forEach(sec=>{

sec.classList.add("fade-up");

observer.observe(sec);

});

// ================= PROGRESS BAR =================

const progress = document.querySelectorAll(".progress-bar");

const progressObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.width = entry.target.classList.contains("html") ? "90%" :
entry.target.classList.contains("css") ? "85%" :
entry.target.classList.contains("js") ? "75%" :
entry.target.classList.contains("bootstrap") ? "90%" :
entry.target.classList.contains("java") ? "80%" :
entry.target.classList.contains("mysql") ? "88%" :
entry.target.classList.contains("mongo") ? "75%" :
"82%";

}

});

});

progress.forEach(bar=>{

bar.style.width="0";

progressObserver.observe(bar);

});

// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const tujuan=document.querySelector(this.getAttribute("href"));

tujuan.scrollIntoView({

behavior:"smooth"

});

});

});

// ================= HERO ANIMATION =================

window.addEventListener("load",()=>{

const hero=document.querySelector(".hero");

hero.style.opacity="0";

hero.style.transform="translateY(40px)";

setTimeout(()=>{

hero.style.transition="1s";

hero.style.opacity="1";

hero.style.transform="translateY(0)";

},300);

});

// ================= CARD HOVER =================

const cards=document.querySelectorAll(".project-card,.certificate-card,.skill-card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transition=".3s";

card.style.transform="translateY(-10px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

// ================= CONTACT =================

const form=document.querySelector("form");

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Terima kasih 😊\nPesan berhasil dikirim.");

form.reset();

});

// ================= YEAR =================

console.log("Portfolio Moihilda Loaded Successfully");