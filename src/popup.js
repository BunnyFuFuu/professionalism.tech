/* File: popup.js 
 * contains the button to toggle professional and gary mode
 */

let gary = document.getElementById("gary");
var garyModeActivated = false;

gary.onclick = () => {
    gary.style.opacity = gary.style.opacity == 0 ? 1 : 0;
    window.garyModeActivated = window.garyModeActivated ? false : true;
}

document.addEventListener('readystatechange', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});
