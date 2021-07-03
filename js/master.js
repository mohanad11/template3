//check if there is local storage color option
let mainColors =localStorage.getItem("color_option");

if(mainColors !== null){
    document.documentElement.style.setProperty('--main-color',mainColors);

    //check active class
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");

        //add active class on element
        if(element.dataset.color == mainColors){
            element.classList.add("active");
        }
    });
    
}

//Toggle Spin Class on Icon
document.querySelector(".toggle-settings .fa-gear").onclick= function(){

    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");
};

//Switch Color
const colorli = document.querySelectorAll(".colors-list li");
colorli.forEach(li => {
    li.addEventListener("click",(e) =>{
        //set color on root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

        localStorage.setItem("color_option",e.target.dataset.color);

        handleActive(e);
    })
});


//Random Background Option
let bacgroundOption = true;

//variable to control interval
let theinterval;

//check local storage bacgdoun item
let backgroundLlocalItem = localStorage.getItem("background_option");

if(backgroundLlocalItem !== null)
{
    if(backgroundLlocalItem === 'true'){
        bacgroundOption=true;
    }
    else{
        bacgroundOption=false;
        
    }

   //remove active class
    document.querySelectorAll(".random-back span").forEach(element =>{
        element.classList.remove("active");
    });

    if(backgroundLlocalItem === 'true'){
        document.querySelector(".yes").classList.add("active");
    }
    
    else{
        document.querySelector(".no").classList.add("active");
    }
}
//switch random bacground
const randBackgroundEl = document.querySelectorAll(".random-back span");

randBackgroundEl.forEach(span => {
    span.addEventListener("click",(e) =>{
        
        handleActive(e);     

        if(e.target.dataset.background === "yes"){
            bacgroundOption = true;
            randomizeback();
            localStorage.setItem("background_option",true);
        }
        else{
            bacgroundOption = false;
            clearInterval(theinterval);
            localStorage.setItem("background_option",false);
        }
    })
});


//select Landing page Element
let landingPge = document.querySelector(".landing-page");

//get array of images

let imgArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"];

function randomizeback(){
    if(bacgroundOption === true)
    {
                //get random
        theinterval = setInterval(() => {
            
            let randomNumber =Math.floor(Math.random() * imgArray.length);
            //chang bacgroun imge
            landingPge.style.backgroundImage='url("../images/'+imgArray[randomNumber]+'")';

        },10000)
    }
}

randomizeback();


//select skills

let ourskill = document.querySelector(".skills");

window.onscroll = function(){
    //skills offset top
    let skillsoffsetTop = ourskill.offsetTop;
    
    //skills outer height 
    let skillsOuterHeight = ourskill.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    //window scroll top
    let windowScrollTop = this.pageYOffset;


    if(windowScrollTop > (skillsoffsetTop + skillsOuterHeight - windowHeight)){
        //skills section 
        let allskills = document.querySelectorAll(".skill-box .skill-progress span");
        allskills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
    
};


//create popup with image

let ourGallry = document.querySelectorAll (".gallery img");
ourGallry.forEach(img => {
    img.addEventListener('click' , (e) => {

        //create overlay element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        //create popup
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

         //Create Heading
        if(img.alt !== null){
            let imgHeding = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeding.appendChild(imgText);
            popupBox.appendChild(imgHeding);
        }

        //create the image
        let popupImge = document.createElement("img");
        popupImge.src = img.src;

        popupBox.appendChild(popupImge);
        document.body.appendChild(popupBox);

        //create close span
        let closButton = document.createElement("span");
        let closeText = document.createTextNode("X");
        closButton.appendChild(closeText);
        closButton.className = "close-button";
        popupBox.appendChild(closButton);
    });
});

//close popupd
document.addEventListener("click",function (e){
    if(e.target.className == "close-button"){
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});



//select bullets
const allbullets = document.querySelectorAll(".nav-bullet .bullet");

//select links
const allinks = document.querySelectorAll(".links a");

function scrollsomewhere(elements){    
    elements.forEach(links => {
        links.addEventListener("click", (e) =>{
            if(!e.target.classList.contains("fa")){
                e.preventDefault();
                document.querySelector(e.target.dataset.section).scrollIntoView({
                    behavior: 'smooth'
                });
            }   
            else{
                e.preventDefault();
                document.querySelector(e.target.parentElement.dataset.section).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
scrollsomewhere(allbullets);
scrollsomewhere(allinks);

function handleActive(ev){

        ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
            element.classList.remove("active")
        });

        //add active class on targer
        ev.target.classList.add("active");     
}

let bulletSpan = document.querySelectorAll(".bullet-option span");
let bulletContainer = document.querySelector(".nav-bullet");
let bulletlocal = localStorage.getItem("bullet-option");

if(bulletlocal !== null){
    bulletSpan.forEach(elemnt =>{
        elemnt.classList.remove("active");
    });
    if(bulletlocal === "block"){
        document.querySelector(".bullet-option .yes").classList.add("active");
        bulletContainer.style.display = 'block';
    }
    else{
        document.querySelector(".bullet-option .no").classList.add("active");
        bulletContainer.style.display = 'none';
    }
}
bulletSpan.forEach(span =>{

    span.addEventListener("click", (e)=>{

        if(span.dataset.display === 'show'){
            bulletContainer.style.display = 'block';
            localStorage.setItem("bullet-option","block");
        }
        else{
            bulletContainer.style.display = 'none';
            localStorage.setItem("bullet-option","none");
        }

        handleActive(e);
    });
});


//reset button
document.querySelector(".reset-option").onclick=function(){
    
    localStorage.removeItem("bullet-option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("color_option");
    window.location.reload();
}


//toggle menu
let toggleButton = document.querySelector(".toggle-menu");
let tlink = document.querySelector(".links");

toggleButton.onclick = function(e){

    //stop propagation
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tlink.classList.toggle("open");
};

//click anywhere
document.addEventListener("click",(e) => {
    if(e.target !== toggleButton && e.target !== tlink){
        //check the menu if open
        if(tlink.classList.contains("open")){
            toggleButton.classList.toggle("menu-active");
            tlink.classList.toggle("open");
        }
    }
});

//stop propagation
tlink.onclick = function(e){
    e.stopPropagation();
}