const largeGear = document.getElementById("largeGear");
const smallGear = document.getElementById("smallGear");
const gearHandle = document.getElementById("handle");

gearHandle.onmousedown = function(event) {
  function gearTurn(event) {
    const rect = smallGear.getBoundingClientRect();
    const angle = Math.atan2(event.clientY - (rect.y + rect.height / 2), event.clientX - (rect.x + rect.width / 2));
    document.body.style.setProperty("--rotation", angle + grabOffset + "rad"); 
  }
  function releaseHandle() {
    document.removeEventListener("mousemove", gearTurn);
    document.removeEventListener("mouseup", releaseHandle);
    gearHandle.style.filter = "";
  }
  const rect = smallGear.getBoundingClientRect();
  const angle = Math.atan2(event.clientY - (rect.y + rect.height / 2), event.clientX - (rect.x + rect.width / 2));
  const grabOffset = parseFloat(getComputedStyle(gearHandle).getPropertyValue("--rotation")) - angle;
  gearTurn(event);
  gearHandle.style.filter = "brightness(80%)";
  document.addEventListener("mousemove", gearTurn);
  document.addEventListener("mouseup", releaseHandle);
}