// x coordinate - red increases
// y coordinate - blue increases
// rgb(0,0,0)

window.addEventListener("mousemove", function(e) {
    let r = Math.round((e.pageX / this.window.innerWidth) * 255);
    let b = Math.round((e.pageY / this.window.innerHeight) * 255);
    const color = `rgb(${r}, 0, ${b})`;
    document.body.style.backgroundColor = color;
})