const injectScript = (file, node) => {
    let th = document.getElementsByTagName(node)[0];
    let s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

const u = () => {
    try {
        console.log("Injecting");
        injectScript(chrome.extension.getURL('/src/content.js'), 'body');
    } catch (e) {
        setTimeout(u, 500);
    }
}
u();
