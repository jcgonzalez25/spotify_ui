//figure album movement
//testing for show playing status




(function(){
  
})();


let Carousel = {
  AlbumWrapper:null,
  AlbumElements:null,
  centeredScrollX:328,
  SongBreakPointHandler:{
    scrollPosition:null,
    breakPoint:100,
    handleBrakePoint:function(){
      let point = Carousel.centeredScrollX - this.scrollPosition;
      console.log(this.scrollPosition)

      if(this.breakPoint<Math.abs(point))
        Carousel.changeArtWork(point>0?"left":"right");
      else
        Carousel.AlbumWrapper.style.overflow = "hidden";

    }
  },
  changeArtWork:function(whichWay){
    let dummyArtSrc = "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_68585523.jpg?auto=format&q=60&fit=max&w=930";
    let e = document.createElement("img");
    e.src=dummyArtSrc;
    e.style.height="90%";
    e.style.width="90%";
    if(whichWay === "left"){
      this.AlbumWrapper.insertBefore(e,this.AlbumElements[0]);
      this.AlbumWrapper.removeChild(this.AlbumElements[3]);
      this.AlbumElements = this.AlbumWrapper.children;
      this.AlbumElements[2].id="";
      this.AlbumElements[1].id="current_song_artwork";
      this.AlbumWrapper.scrollLeft = this.centeredScrollX;
    }else{
      this.AlbumElements[1].id = "";
      this.AlbumElements[2].id = "current_song_artwork";
      this.AlbumWrapper.removeChild(this.AlbumElements[0]);
      this.AlbumWrapper.appendChild(e);
    }
   
  },
  s:0,
  scrolling:false,
  disableScroll:false,
  moveArtwork:function(event){
    this.SongBreakPointHandler.scrollPosition = this.AlbumWrapper.scrollLeft;
  },
  focusOnMainElement:function(){
    this.AlbumWrapper.scrollLeft = this.centeredScrollX;
  },
  showAlbumArtwork:function(){
    this.AlbumWrapper.classList.remove("d-none");
    this.AlbumWrapper.classList.add("d-flex");
  },
  startingPosition:null,
  swiperOn:function(){
    this.AlbumWrapper = document.querySelector("#album_art_Wrapper");
    this.showAlbumArtwork();
    this.focusOnMainElement();
    this.AlbumElements = this.AlbumWrapper.children;
    this.AlbumWrapper.addEventListener("scroll",()=>{this.scrolling(event)});
    this.AlbumWrapper.addEventListener("touchend",event=>{this.touching=false;});
    this.AlbumWrapper.addEventListener("touchstart",event=>this.touching=true);
    
  },
  id:null,
  touching:null,
  scrolling:function(event){
    clearTimeout(this.id);
    this.id = setTimeout(() => { 
        this.finishedScrolling();
    }, 66);
  },
  finishedScrolling:function(){
    if(this.disableScroll == false && this.touching == false){
      this.checkIfScrollComplete();
    }
  },
  checkIfScrollComplete:function(){
    if(this.AlbumWrapper.scrollLeft != this.centeredScrollX){
      this.SongBreakPointHandler.scrollPosition = this.AlbumWrapper.scrollLeft;
      this.SongBreakPointHandler.handleBrakePoint();
    }
      
  },
  draggingFinished:function(event){
    this.AlbumWrapper.scrollLeft = this.centeredScrollX;
    this.touching = false;    
    this.SongBreakPointHandler.handleBrakePoint();
  },
  dragging:function(event){
    console.log(event);
    //this.AlbumWrapper.style.overflow = "scroll";
  }
}
