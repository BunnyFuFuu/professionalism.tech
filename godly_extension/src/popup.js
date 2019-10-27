/* File: popup.js
 * -----------------------
 * This javascript file restores settings when the DOM loads.
 * You shouldn't have to change this file unless you also
 * change the corresponding popup.html file.
 */

let gary = document.getElementById("gary");

gary.onclick = () => {
    gary.style.opacity = gary.style.opacity == 1 ? 0 : 1;
}

document.addEventListener('DOMContentLoaded', function () {
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
