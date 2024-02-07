const mainDiv = document.getElementById("canvas");
let dragXOffset = 0, dragYOffset = 0;

document.onmousedown = function(event) {
    function dragGrid(event) {
        document.documentElement.style.setProperty("--viewX", (dragXOffset + event.clientX).toString());
        document.documentElement.style.setProperty("--viewY", (dragYOffset + event.clientY).toString());
    }
    function releaseGrid() {
        document.removeEventListener("mousemove", dragGrid);
        document.removeEventListener("mouseup", releaseGrid);
        //mainDiv.style.cursor = "grab";
    }
    dragXOffset = Number(getComputedStyle(document.documentElement).getPropertyValue("--viewX")) - event.clientX;
    dragYOffset = Number(getComputedStyle(document.documentElement).getPropertyValue("--viewY")) - event.clientY;
    document.addEventListener("mousemove", dragGrid);
    document.addEventListener("mouseup", releaseGrid);
    //mainDiv.style.cursor = "grabbing";
}

document.onwheel = function(event) {
    // TODO: Center zoom on mouse
    document.documentElement.style.setProperty("--gridSize",
    Math.min(200, Math.max(25, (Number(getComputedStyle(document.documentElement).getPropertyValue("--gridSize").replace("px", "")) * (2 ** (event.deltaY / -100.0))))).toString() + "px");
}