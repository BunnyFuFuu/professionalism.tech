/* File: content.js
 * ---------------
 * Checks email draft contents w/ gmail API and feeds the body to AWS comprehend ML API
 * to generate a professionalism score and suggest changes
 * 
 * This file contains javascript code that is executed
 * everytime a webpage loads over HTTP or HTTPS.
 */

/**
 * Calls the AWS comprehend API to analyze the text
 * 
 * @param {String} text email body text to analyze
 * @returns {Promise<{SentimentScore:{Mixed:number,Neutral:number,Negative:number,
 * Positive:number},Sentiment:"POSITIVE"|"NEGATIVE"|"MIXED"|"NEUTRAL",keyPhrases:String[]}>}
 */
const analyze = async text => {

    if (!text||!text.trim()) return;
    
    let res = await fetch(`https://professionalism.tech/api/` + 
                            `gary?text=${encodeURIComponent(text.trim())}`);
    let json = await res.json();
    if (!json || !json.SentimentScore) {
        alert("Something went wrong with the comprehend api");
        console.error(json);
        return;
    }

    console.log(json);
    return json;
}
const GOD_URL = "https://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/300.jpg";

/** @type {Element} */
let draftMessageField;
let lastMsg = "";
let timeout;
const startTimeout = () => timeout = setTimeout(async () => {

    draftMessageField = document.querySelector('div[aria-label="Message Body"]');
    
    let GARY = document.getElementsByClassName("gary")[0];
    
    if (draftMessageField) {
        console.log("DRAFT OPEN");

        // Prevent flooding
        let msg = draftMessageField.textContent.trim();

        if (GARY && GARY.parentElement)
            GARY.parentElement.style.opacity = 1;

        if (GARY && !msg)
            GARY.style.opacity = 0;

        if (!msg || msg == lastMsg) return startTimeout();
        lastMsg = msg;

        let parse = await analyze(draftMessageField.textContent.trim());
        GARY.style.opacity = 1;
        if (!parse) return startTimeout();
        let advice = "";
        document.getElementsByClassName("gary-img").src = GOD_URL;
        if(parse.Sentiment === "POSITIVE") {
            let checkVal = parse.SentimentScore.Positive;

            if(checkVal > 0.99) advice = "This. This is perfection. I love you too."
            else if(checkVal > 0.95) advice = "Yes! I'd love to get this email! Keep stroking their ego! Think of what I'd like to hear.";
            else if(checkVal > 0.85) advice = "I would appreciate a professional email like this.";
            else if(checkVal > 0.75) advice = "This is a pretty nice email, perhaps be more enthusiastic if that's your goal.";
            else if(checkVal > 0.6899 && checkVal < 0.70) advice = "This is not too bad. I'm not trying to ask for a positive CAPE review or anything, but if I did, I would probably ask you to write one for me. This is a good professional encounter."
            else if(checkVal > 0.65) advice = "This could use a bit more.... energy";
            else if(checkVal > 0.55) advice = "This is a half-hearted attempt at being positive."                                        
            else advice = "Try clearing up your message. I don't understand this, I only know what's F A M I L I A R.";

        }
        else if(parse.Sentiment === "NEGATIVE") {
            let checkVal = parse.SentimentScore.Negative;
            document.getElementsByClassName("gary-img").src =
                "https://cdn.discordapp.com/attachments/632067858205114372/637814313004040212/deepfriedgary3.png";
            if (checkVal > 0.95) advice = "This email is a huge waste of time. Please rephrase this whole thing or face a professionalism deduction."
            else if (checkVal > 0.85) advice = "Stop being rude. This is not professional.";
            else if (checkVal > 0.75) advice = "Try to be more professional.";
            else if(checkVal > 0.6899 && checkVal < 0.70) advice = "As announced at the final exam, the grade breakdown will be posted on Piazza early this week. I also announced that my deadline to submit grades is Tuesday. Asking about the course graded before the grade deadline is like me asking for your programming submission before the assignment deadline. However much the question is asked, however much you want know the information, however much I want to know the information, when the information is still unknown, there is no answer to the question. I'm not in the situation where I know the answer to your question and am withholding it from you. Reading and responding to your question about the course grade breakdown before the information is known just causes the very information you seek to be delayed for everyone since I'm taking the time to respond to you instead of continuing with the analysis needed to determine the course grades. After being at the CSE 12 final exam until after 10pm on Friday night and after spending all day Saturday grading final exams until after 6pm, any questions about your course grades asked Saturday or Sunday show no consideration to me or to the course staff in allowing a day of rest or a reasonable amount of time to pass before expecting the course grade to be determined. You've waited more than 10 weeks to know your grade in this course. Can't you wait a few more days before demonstrating your impatience? As the student replier indicated, your question is worthy of a professionalism deduction. Knowing the answer to your question benefits no one, not even you. Knowing now doesn't change your grade, and it doesn't provide insights into the course content. Specifically, your question is an example of interactions to avoid such as \"asking questions where the information will eventually be known.\" At the beginning of the course, we awarded you 100% for the professionalism portion of your course grade assuming that all interactions would be professional. Your interaction above indicates that our initial prediction of your professionalism was incorrect. I've made an adjustment in your score to reflect the error in our assumptions. If you'd like to explain how your question above demonstrates consideration, patience, and professionalism, please let me know.";
            else if (checkVal > 0.65) advice = "Try to be less passive-agressive.";
            else if (checkVal > 0.55) advice = "Please watch your attitude. Think of what I'd like to hear."
            else advice = "You're coming off a bit rude, consider complementing me.. er, them, more.";

        }
        else if(parse.Sentiment === "NEUTRAL") {
            let checkVal = parse.SentimentScore.Neutral;
            
            if(checkVal > 0.97) advice = "Wait, stop typing. Do you hear the voices? The voices are too loud, please stop typing."
            else if(checkVal > 0.95) advice = "This is an email. Not great, not bad, but it's an email.";
            else if(checkVal > 0.85) advice = "If you're trying to avoid any sort of confrontation, this is okay.";
            else if(checkVal > 0.75) advice = "This is a pretty nice email, but it feels like a robot wrote this.";
            else if(checkVal > 0.6899 && checkVal < 0.70) advice = "This reminds me of your mother's purse. Would you be allowed to look into your mom's purse whenever you wanted? No, I hope not. Because her purse is PRIVATE. How about your own purse? You don't have a purse? Doesn't matter, it would be PRIVATE to you, because it's only for you. Now how about a bank vault. That would be INACCESSIBLE. What about a dollar on the floor? PUBLIC. Anyway, back to your mother. Boring, like this email."
            else if(checkVal > 0.65) advice = "This could use a bit more.... emotion.";
            else advice = "I'm bored of this, your writing bores me. Make it more interesting. Like my quiz answers.";

        }
        else if(parse.Sentiment === "MIXED") {
            let checkVal = parse.SentimentScore.Mixed;
            if(checkVal > 0.95) advice = "I don't understand what you're going for with this at all. But that's fine, you know, some people won't get it immediately. Some people may never get it, some may get it instantly. But that's fine! Maybe it doesn't even matter, we might not even ever see this again. So it's fine, really it's fine.";
            else if(checkVal > 0.85) advice = "I really don't know how I'm supposed to feel about this.";
            else if(checkVal > 0.75) advice = "I'm not FAMILIAR with what this is supposed to mean.";
            else if(checkVal > 0.6899 && checkVal < 0.70) advice = "Always keep the keys to a car you sell. Someday you'll end up running out of gas. Across the street from your old car, parked on the street. And while your car is out of gas, you can just go hop into your old car and drive off! Anyway this is related to a lecture somehow, i think."
            else if(checkVal > 0.65) advice = "What do you think I am, sentient? This doesn't make sense to me.";
            else if(checkVal > 0.55) advice = "I don't like these mixed signals. Pick a direction and write towards it.";
            else advice = "Now I'm confused. Make it more F A M I L I A R.";

        }
        GARY.innerHTML = advice;
        // The draft is open

    } else {
        // Closed
        if (GARY && GARY.parentElement)
            GARY.parentElement.style.opacity = 0;
    }
    startTimeout();
}, 3000);
startTimeout();

const stopInterval = () => timeout && clearTimeout(timeout);

chrome.storage.sync.get(["garyMode"], r => {
    //console.log("GOD MODE IS ", r.garyMode);
    if (!r.garyMode) return;
    document.querySelectorAll("*").forEach(e => [...e.childNodes].forEach(node => {
        if (node.nodeType === 3) {
            let text = node.nodeValue;
            let replacedText = text
                .replace(/gary gillespie/gi, "God")     // replaces "gary gillespie" with "God"
                .replace(/gary/gi, "The Lord")          // replaces "gary" with "The Lord"
                .replace(/gillespie/gi, "The Almighty") // replaces "gillespie" with "The Almighty"
                .replace(/resnet/gi, "Shitnet")         // replaces "resnet" with "Shitnet"
                .replace(/jesus/gi, "Gary")
                .replace(/christ/gi, "Gillespie")
                .replace(/Jesus Christ/gi, "Gary Gillespie");
            
            if (replacedText !== text) {
                e.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }));
})


