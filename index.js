let state = {
  current_page:0
}
let stateHandler = {
  handleIcons:function(){
    let icons = document.querySelectorAll(".navigation .col");
    icons[state.current_page].style.color = "white";
  }
}
window.onload = function (){
  stateHandler.handleIcons();
}
