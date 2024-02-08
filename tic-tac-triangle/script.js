var mainDiv = document.getElementById("canvas");
var dragXOffset = 0, dragYOffset = 0;
document.body.onmousedown = function (event) {
    function dragGrid(event) {
        document.documentElement.style.setProperty("--viewX", (dragXOffset + event.clientX).toString());
        document.documentElement.style.setProperty("--viewY", (dragYOffset + event.clientY).toString());
    }
    function releaseGrid() {
        document.removeEventListener("mousemove", dragGrid);
        document.removeEventListener("mouseup", releaseGrid);
    }
    dragXOffset = Number(getComputedStyle(document.documentElement).getPropertyValue("--viewX")) - event.clientX;
    dragYOffset = Number(getComputedStyle(document.documentElement).getPropertyValue("--viewY")) - event.clientY;
    document.addEventListener("mousemove", dragGrid);
    document.addEventListener("mouseup", releaseGrid);
};
document.onwheel = function (event) {
    document.documentElement.style.setProperty("--gridSize", Math.min(200, Math.max(25, (Number(getComputedStyle(document.documentElement).getPropertyValue("--gridSize").replace("px", "")) * (Math.pow(2, (event.deltaY / -100.0)))))).toString() + "px");
};
