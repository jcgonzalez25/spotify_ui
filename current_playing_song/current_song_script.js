



function editKeyFrameValue(keyframeName,propertyName,newValue){
  function doRule(cssRule,value,ruleIndex){
    let ParentRule = cssRule.parentStyleSheet;
    ParentRule.deleteRule(ruleIndex);
    ParentRule.insertRule(value);
  }
  let x = document.styleSheets;
  for(let i = 0; i < x.length;i++){
    let c = x[i].cssRules;
    for(let m = 0; m< c.length;m++){
      let r = new RegExp("^@keyframes "+keyframeName,"g");      
      let haystack = c[m].cssText;
      let keyFrameFindStatus = haystack.search(r);
      if(keyFrameFindStatus != -1){
        finder = propertyName +  ": .*;";
        replacement = propertyName + ": " + newValue +";";
        finder = new RegExp(finder);
        let rep = c[m].cssText.replace(finder,replacement);
        doRule(c[m],rep,m);
      }
    }
  }
};

const getIntValue = function(eStyleValue) {
  return parseInt(eStyleValue.slice(0, -2));
}
const song_statusbar_element             = document.querySelector(".currently_playing");
const song_progress_bar                  = document.querySelector(".progress");
const song_info_div                      = document.querySelector(".song_info_div");
const screenHeight                       = window.innerHeight;
const navigation_original_height         = document.querySelector(".navigation").offsetHeight;
let SongInfo, SongController, SongState,CurrentSongAnimation;

(function() {
  song_statusbar_element.addEventListener("click", () => SongInfo.showPlayingStatus());
  document.querySelector("#now_playing_toggle_button").addEventListener("click",()=> SongInfo.showPlayingStatus());
})();


function ElementHandler(element){
  this.element = element;
  this.implementedCss=null;
  this.expandSelectorName=null;
  this.shrinkSelectorName=null;
  this.setkeyFrameCSSValues = function(cssExpanderName,cssShrinkerName){
    this.expandSelectorName = cssExpanderName;
    this.shrinkSelectorName = cssShrinkerName;
  }
  this.setInitialStyling=function(){
    if(this.element.classList.contains("navigation")){
      this.element.style.height = this.element.clientHeight + "px";
    }
  }
  this.toggleDisplayAnimation=function(){
    if(this.implementedCss == null){
      this.setInitialStyling();
      if(this.element.classList.contains("navigation")){
        this.element.classList.add(this.shrinkSelectorName);
      }else if(this.element.classList.contains("song_info_div")){
        this.element.classList.add(this.expandSelectorName);
      }
      this.implementedCss = true;
    }else{
      if(this.element.classList.contains(this.expandSelectorName)){
        this.element.classList.add(this.shrinkSelectorName);
        this.element.classList.remove(this.expandSelectorName);
      }else{
        this.element.classList.add(this.expandSelectorName);
        this.element.classList.remove(this.shrinkSelectorName);
      }
    }
  }
}

let CAnimation = {
  fullScreen:null,
  SongInfoElement:new ElementHandler(document.querySelector(".song_info_div")),
  NavigationElement:new ElementHandler(document.querySelector(".navigation")),
  haveInitialized:false,
  init:function(){
    if(this.haveInitialized == false){
      this.haveInitialized = true;
      this.NavigationElement.element.addEventListener("animationend",(event)=>this.onFullScreenAnimationComplete(event));
    }
  },
  animateNav:function(){
    this.NavigationElement.setkeyFrameCSSValues("nav_expander","nav_shrinker");
    this.NavigationElement.toggleDisplayAnimation();
  },
  animateMainContent:function(){
    this.SongInfoElement.setkeyFrameCSSValues("current_song_expander","current_song_shrinker")
    this.SongInfoElement.toggleDisplayAnimation();
  },
  onFullScreenAnimationComplete:function(){
    Carousel.swiperOn();
  }
}

SongInfo = {
  showPlayingStatus:function() {
    CAnimation.init();
    CAnimation.animateNav();
    CAnimation.animateMainContent();    
  },
  hidePlayingStatus: function() {

  }
};
SongController = {
  updateElements:function(){

  }
};
