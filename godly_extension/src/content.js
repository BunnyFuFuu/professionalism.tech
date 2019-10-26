const GOD_URL = "https://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/300.jpg";
document.querySelectorAll("img").forEach(e => e.src = GOD_URL);
document.querySelectorAll('*').forEach(n => {
    n.style.backgroundImage = n.style.backgroundImage.replace(/url(.*)/, `url(${GOD_URL})`);
});

document.querySelectorAll("svg").forEach(svg => {
    let img = new Image;
    img.src = GOD_URL;
    img.onload = () => {
        img.width = img.style.width = svg.width;
        img.height = img.style.height = svg.height;
        svg.parentNode.replaceChild(img, svg);
    }
});