const largeGear = document.getElementById("largeGear");
const smallGear = document.getElementById("smallGear");
const gearHandle = document.getElementById("handle");
const gearHandleInteract = document.getElementById("handleInteract");

if(gearHandleInteract) gearHandleInteract.onmousedown = function(event) {
  function gearTurn(event) {
    if(smallGear == null) { console.warn("Could not find element: smallGear"); return; }
    const rect = smallGear.getBoundingClientRect();
    const angle = Math.atan2(event.clientY - (rect.y + rect.height / 2), event.clientX - (rect.x + rect.width / 2));
    document.body.style.setProperty("--rotation", angle + grabOffset + "rad"); 
  }
  function releaseHandle() {
    document.removeEventListener("mousemove", gearTurn);
    document.removeEventListener("mouseup", releaseHandle);
    if(gearHandleInteract) gearHandleInteract.style.filter = "";
  }
  if(smallGear == null) { console.warn("Could not find element: smallGear"); return; }
  if(gearHandle == null) { console.warn("Could not find element: gearHandle"); return; }
  const rect = smallGear.getBoundingClientRect();
  const angle = Math.atan2(event.clientY - (rect.y + rect.height / 2), event.clientX - (rect.x + rect.width / 2));
  const grabOffset = parseFloat(getComputedStyle(gearHandle).getPropertyValue("--rotation")) - angle;
  gearTurn(event);
  gearHandleInteract.style.filter = "brightness(50%)";
  document.addEventListener("mousemove", gearTurn);
  document.addEventListener("mouseup", releaseHandle);
}