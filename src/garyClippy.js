const epicStyle = `.bubble {
    position: absolute;
    top: -10px;
    left: 110px;
    transform: translate(0%,-50%);
    opacity: 0;
    display: inline-block;
    padding: 10px;
    width: 400px!important;
    min-width: 16px;
    margin-right: 15px;
    color: transparent;
    background-color: blue;
    color: yellow;
    border: 2px solid yellow;
    border-radius: 10%;
    transition: opacity .25s ease-in-out;
  }
  .bubble::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right-color: blue;
    border-left: 0;
    border-bottom: 0;
    margin-top: -4px;
    margin-left: -8px;
}`;

let styleTag = document.createElement("style");
styleTag.innerHTML = epicStyle;

document.body.appendChild(styleTag);

let GARY_PANEL = document.createElement("div");
let bubble = document.createElement("div");

let GARY = document.createElement("img");
const GOD_URL2 = "https://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/300.jpg";
  
const garyMode = () => {

    bubble.className = "bubble gary";
    bubble.style.zIndex = 9999;
    GARY.className = "gary-img";
    GARY.src = GARY.src || GOD_URL2;
    GARY.style.borderRadius = "50%";
    GARY_PANEL.style.position = "fixed";
    GARY_PANEL.style.bottom = "20px";
    GARY_PANEL.style.left  = "20px";
    GARY_PANEL.appendChild(GARY);
    GARY_PANEL.appendChild(bubble);
    GARY.style.zIndex = 9999;
    GARY.width  = GARY.style.width  = 100;
    GARY.height = GARY.style.height = 100;
    document.body.appendChild(GARY_PANEL);

    setTimeout(() => {
        GARY.remove();
        GARY_PANEL.remove();
        bubble.remove();
        garyMode();
    }, 3000);
}

garyMode();
console.log("GARY APPENDED");