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
    if (!res || !res.SentimentScore) {
        alert("Something went wrong with sentiment api");
        return;
    }

    console.log(res);
    return res;
}

// gary is god sub-extension
document.querySelectorAll("*").forEach(e => [...e.childNodes].forEach(node => {

    if (node.nodeType === 3) {
        let text = node.nodeValue;
        let replacedText = text
            .replace(/gary gillespie/gi, "God")     // replaces "gary gillespie" with "God"
            .replace(/gillespie/gi, "The Almighty") // replaces "gary gillespie" with "God"
            .replace(/gary/gi, "The Lord");         // replaces "gary gillespie" with "God"
        
        if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
        }
    }
    
}));

const GOD_URL = "https://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/300.jpg";
document.querySelectorAll("img").forEach(e => e.src = GOD_URL);
document.querySelectorAll('*').forEach(n => {
    n.style.backgroundImage = n.style.backgroundImage.replace(/url(.*)/, `url(${GOD_URL})`);
});

// SVG replacement doesn't work
// document.querySelectorAll("svg").forEach(svg => {
//     let img = new Image;
//     img.src = GOD_URL;
//     img.onload = () => {
//         img.width = img.style.width = svg.width;
//         img.height = img.style.height = svg.height;
//         svg.parentNode.replaceChild(img, svg);
//     }
// });