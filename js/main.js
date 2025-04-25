//* check if there is local storage color option
let mainColors = localStorage.getItem("color_option")

if(mainColors !== null){
    // console.log('local storage is not empty you can set it on root now')
    document.documentElement.style.setProperty('--main-color',localStorage.getItem("color_option"));
    
     // Remove active class from all Colors list item
     document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active")

        // Add Active class on element with data-color === local storage item
        if(element.dataset.color === mainColors){
            // Add active class 
            element.classList.add("active");
        }
    });
}

// Random Background Option
let backgroundOption = true;

// Variable to contorl the background interval
let backgroundInterval;

// Check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if random background local storage is not empty
if(backgroundLocalItem !== null){

    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    }
    else{
        backgroundOption = false;
    }

    // Remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element =>{
        element.classList.remove("active")
    });

    if(backgroundLocalItem === 'true'){
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }
    else{
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}



//* Toggle Spin Class on Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function(){

    // Toggle Spin Class fa-spin rotation on self
    this.classList.toggle("fa-spin");
    // Toggle class open on main Setting Box
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

//* Loop on every item
colorsLi.forEach(li => {
    // click on every list items
    li.addEventListener("click", (e) =>{


        // Set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Set color on local storage
        localStorage.setItem("color_option",  e.target.dataset.color);
        
        // Remove active class from all childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active")
        });

        // Add Active Class on self
        e.target.classList.add("active")

    });
});

//* Switch Random backgrounds option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

//* Loop on all spans
randomBackEl.forEach(span => {
    // click on every span
    span.addEventListener("click", (e) =>{
        
        // Remove active class from all spans
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active")
        });

        // Add Active Class on self
        e.target.classList.add("active")

        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            RandomizeImgs();

            localStorage.setItem("background_option", true);
        }
        else{
            backgroundOption = false;
            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);
        }
    });
});

// Select landing page element 
let landingPage = document.querySelector(".landing-page")

// Get array of imgs
let imgsArray = ["img-1.jpg","img-2.jpg","img-3.jpg","img-4.jpg","img-5.jpg"]

// Function To Randomize imgs
function RandomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(() => {
            // Get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length)
        
            // Change background url
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 3000);
    };
};

RandomizeImgs();


//* Select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function(){

    // Skills offset top
    let skillsOffsetTop = ourSkills.offsetTop; 

    // Skills Outer Height 
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window scrollTop
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills =document.querySelectorAll(".skill-box .skill-progress span");
        
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
   }
   
};


// Create Popup with image

let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img =>{
    img.addEventListener('click', (e) =>{
        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add Class to Overlay
        overlay.className = 'popup-overlay';

        // Append overlay to body
        document.body.appendChild(overlay);

        // Create the popup Box
        let popupBox = document.createElement("div");

        // Add Class To The Popup
         popupBox.className = 'popup-box'

         if(img.alt != null){
            // Create Heading
            let imgHeading = document.createElement("h3")
            
            // create text for heading
            let imgText = document.createTextNode(img.alt);

            // Append the text to the heading
            imgHeading.appendChild(imgText);

            // Append the heading to the popup box
            popupBox.appendChild(imgHeading);
        };
        
        // Create the img
        let popupImage = document.createElement("img");

        // set image source
        popupImage.src = img.src;

        // Add image to popup box 
        popupBox.appendChild(popupImage);

        // Append the popup box to body
        document.body.appendChild(popupBox);

        // Create the close span
        let closeButton = document.createElement("span");

        // Create the close Text
        let closeButtonText = document.createTextNode("X");
        
        // Append the text to close button
        closeButton.appendChild(closeButtonText);

        // Add Class to close button
        closeButton.className = 'close-button';

        // Add close button to the popup box
        popupBox.appendChild(closeButton);

    });
});

// Close popup
document.addEventListener("click", function(e){
    if(e.target.className == 'close-button'){
        
        // Remove the current popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    };
});

















