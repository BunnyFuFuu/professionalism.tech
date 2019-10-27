const GOD_URL = "https://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/300.jpg";
/**
 * Calls the AWS comprehend API to analyze the text
 * 
 * @param {String} text email body text to analyze
 * @returns {Promise<{SentimentScore:{Mixed:number,Neutral:number,Negative:number,
 * Positive:number},Sentiment:"POSITIVE"|"NEGATIVE"|"MIXED"|"NEUTRAL"}>}
 */
const analyze = async text => {

    if (!text||!text.trim()) return;
    
    let res = await fetch(`https://professionalism.tech/api/` + 
                          `gary?text=${encodeURIComponent(text.trim())}`);
    let json = await res.json();
    if (!json || !json.SentimentScore) {
        alert("Something went wrong with sentiment api");
        console.error(json);
        return;
    }

    console.log(json);
    return json;
}

const epicStyle = `.bubble {
    position: absolute;
    top: -20px;
    left: 110px;
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

const garyMode = () => {

    bubble.className = "bubble gary";
    bubble.style.zIndex = 9999;
    GARY.src = GARY.src || GOD_URL;
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

if (window.origin.startsWith("https://mail.google.com")) {
    garyMode();
    console.log("GARY APPENDED");
}

/** @type {Element} */
let draftMessageField;
let lastMsg = "";
let timeout;
const startTimeout = () => timeout = setTimeout(async () => {

    draftMessageField = document.querySelector('div[aria-label="Message Body"]');
    
    if (draftMessageField) {
        console.log("DRAFT OPEN");
        GARY_PANEL.style.opacity = 1;

        // Prevent flooding
        let msg = draftMessageField.textContent.trim();
        if (!msg || msg == lastMsg) return startTimeout();
        lastMsg = msg;

        let parse = await analyze(draftMessageField.textContent.trim());
        if (!parse) return startTimeout();
        let adj = "";
        let advice = "";
        GARY.src = GOD_URL;
        if(parse.Sentiment === "POSITIVE") {
            let checkVal = parse.Positive;

            if(checkVal > 0.99) advice = "This. This is perfection. I love you too."
            else if(checkVal > 0.95) advice = "Yes! I'd love to get this email! Keep stroking their ego! Think of what I'd like to hear.";
            else if(checkVal > 0.85) advice = "I would appreciate a professional email like this.";
            else if(checkVal > 0.75) advice = "This is a pretty nice email, perhaps be more enthusiastic if that's your goal.";
            else if(checkVal > 0.65) advice = "This could use a bit more.... energy";
            else if(checkVal > 0.55) advice = "This is a half-hearted attempt at being positive."                                        
            else advice = "Try clearing up your message. I don't understand this, I only know what's F A M I L I A R.";

        }
        else if(parse.Sentiment === "NEGATIVE") {
            let checkVal = parse.Negative;
            GARY.src = "https://cdn.discordapp.com/attachments/632067858205114372/637814313004040212/deepfriedgary3.png";
            if (checkVal > 0.95) advice = "This email is a huge waste of time. Please rephrase this whole thing or face a professionalism deduction."
            else if (checkVal > 0.85) advice = "Stop being rude. This is not professional.";
            else if (checkVal > 0.75) advice = "Try to be more professional.";
            else if (checkVal > 0.65) advice = "Try to be less passive-agressive.";
            else advice = "You're coming off a bit rude, consider complementing me.. er, them, more.";
        }
        else if(parse.Sentiment === "NEUTRAL") {
            let checkVal = parse.Neutral;
            
            if(checkVal > 0.97) advice = "Wait, stop typing. Do you hear the voices? The voices are too loud, please stop typing."
            else if(checkVal > 0.95) advice = "This is an email. Not great, not bad, but it's an email.";
            else if(checkVal > 0.85) advice = "If you're trying to avoid any sort of confrontation, this is ok.";
            else if(checkVal > 0.75) advice = "This is a pretty nice email, but it's like a robot wrote this.";
            else if(checkVal > 0.65) advice = "This could use a bit more.... emotion.";
            else advice = "I'm bored of this, your writing bores me. Make it more interesting. Like my quiz answers.";

        }
        else if(parse.Sentiment === "MIXED") {
            let checkVal = parse.Mixed;
            if(checkVal > 0.95) advice = "I don't understand what you're going for with this at all. But that's fine, you know, some people won't get it immediately. Some people may never get it, some may get it instantly. But that's fine!";
            else if(checkVal > 0.85) advice = "I really don't know how I'm supposed to feel about this.";
            else if(checkVal > 0.75) advice = "I'm not FAMILIAR with what this is supposed to mean.";
            else if(checkVal > 68.9 && checkVal < 70) advice = "Always keep the keys to a car you sell. Someday you'll end up running out of gas. Across the street from your old car, parked on the street. And while your car is out of gas, you can just go hop into your old car and drive off! Anyway this is related to a lecture somehow, i think."
            else if(checkVal > 0.65) advice = "What do you think I am, sentient? This doesn't make sense to me.";
            else if(checkVal > 0.55) advice = "I don't like these mixed signals. Pick a direction and write towards it.";
            else advice = "Now I'm confused. Make it more F A M I L I A R.";

        }
        bubble.innerHTML = "This message seems " + adj + " " + parse.Sentiment.toLowerCase() + ". " + advice;

        // The draft is open
    } else {
        GARY_PANEL.style.opacity = 0;
    }
    startTimeout();
}, 3000);
startTimeout();

const stopInterval = () => timeout && clearTimeout(timeout);

// gary is god sub-extension
document.querySelectorAll("*").forEach(e => [...e.childNodes].forEach(node => {
    if (node.nodeType === 3) {
        let text = node.nodeValue;
        let replacedText = text
            .replace(/gary gillespie/gi, "God")     // replaces "gary gillespie" with "God"
            .replace(/gillespie/gi, "The Almighty") // replaces "gary gillespie" with "God"
            .replace(/gary/gi, "The Lord");         // replaces "gary gillespie" with "God"
        
        if (replacedText !== text)
            e.replaceChild(document.createTextNode(replacedText), node);
    }
}));

document.querySelectorAll("img").forEach(e => e.src = GOD_URL);
document.querySelectorAll('*').forEach(n => {
    n.style.backgroundImage = n.style.backgroundImage.replace(/url(.*)/, `url(${GOD_URL})`);
});
