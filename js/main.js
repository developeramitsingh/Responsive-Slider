
function Slider(divName){
    var overlayCloseBtn;
    var card,card_img,img_Caption;
    var slideContainer, slideWrapper;
    var leftBtnDiv, rightBtnDiv;
    var maxLength = data.cards.length;

    var divName = divName;

    this.createSliderContainer = function(sliderClass, swiperClass){
      this.slideContainer = createTag("div");
      this.slideContainer.classList.add(sliderClass);
      this.slideContainer.classList.add(swiperClass);//for Slider library
      getElement(divName).appendChild(this.slideContainer);
    }

    this.createWrapper = function(wrapperClass){
      this.slideWrapper = createTag("div");
      this.slideWrapper.classList.add(wrapperClass);
      this.slideWrapper.classList.add("swiper-wrapper");
      this.slideContainer.appendChild(this.slideWrapper);
    }

    this.createNextPrev = function(check){
      if(check=="prev"){
        this.leftBtnDiv = createTag("div"); 
        this.leftBtnDiv.id = "left-btn";
        this.slideContainer.appendChild(this.leftBtnDiv);

        var roundBtnLeft = createTag("div");
        roundBtnLeft.classList.add("round-btn");
        roundBtnLeft.classList.add("swiper-button-prev");
        roundBtnLeft.innerHTML = "&#x276E;";
        this.leftBtnDiv.appendChild(roundBtnLeft);
      }
      else{
        this.rightBtnDiv = createTag("div"); 
        this.rightBtnDiv.id = "right-btn";
        this.slideContainer.appendChild(this.rightBtnDiv);

        var roundBtnRight = createTag("div");
        roundBtnRight.classList.add("round-btn");
        roundBtnRight.classList.add("swiper-button-next");
        roundBtnRight.innerHTML = "&#x276F;";
        this.rightBtnDiv.appendChild(roundBtnRight);  
      }
   
    } 
    this.createCards = function(cardClass, cardImgClass, captionClass){
      for(let i=0; i<maxLength;i++){
        this.card = createTag("div");
        this.card.classList.add(cardClass);
        this.card.classList.add("swiper-slide");
        
        this.slideWrapper.appendChild(this.card);    
        
        this.card_img = createTag("div");
        this.card_img.classList.add(cardImgClass);
        this.card.appendChild(this.card_img);

        this.img_Caption =createTag("div");
        this.img_Caption.classList.add(captionClass);
        this.card.appendChild(this.img_Caption);
    }
    }

    this.loadSliderImages = function(cardImgClass){
        this.card_img = getElements("."+cardImgClass);

        for(let i=0;i<maxLength; i++){
          var img = createTag("img");
          img.src = data.cards[i].image;
          this.card_img[i].appendChild(img);
        }
    }

    this.loadCaption = function(captionClass){
       this.img_Caption = getElements("."+captionClass);
       for(let i=0;i<maxLength; i++){
        var p = createTag("p");
        p.innerText = data.cards[i].caption;
        this.img_Caption[i].appendChild(p);
      }
    }

    this.closeBtnOverlay = function (){
      var closeOverlayBtn = createTag("div");
      closeOverlayBtn.classList.add("closeBtn-overlay");
      closeOverlayBtn.innerHTML= "&#x2715;";
      closeOverlayBtn.addEventListener("click", closeOverlay);
      this.slideContainer.appendChild(closeOverlayBtn);
    }

    this.openOverlayEvent = function(){
      this.card = getElements(".card");
      for(let i=0; i<this.card.length; i++){
        this.card[i].addEventListener("click", showOverlay);
      }
    }
   

    showOverlay = function (){
      getElement(".overlay-slider").style.visibility = "visible";
    }

    closeOverlay = function (){
      getElement(".overlay-slider").style.visibility = "hidden";
    }

    createTag = function (tag){
      return document.createElement(tag);
    }

    getElement = function (name){
      return document.querySelector(name);
    }

    getElements = function (name){
      return document.querySelectorAll(name);
    }
}

function init(divName){
  var sliderMain = new Slider(divName);
  sliderMain.createSliderContainer("sliderContainer", "swiper-container");
  sliderMain.createNextPrev("prev");
  sliderMain.createWrapper("wrapper");
  sliderMain.createNextPrev("next");
  sliderMain.createCards("card", "card-img", "imgCaption");
  sliderMain.loadSliderImages("card-img");// for first slider 
  sliderMain.loadCaption("imgCaption");//for first slider
  sliderMain.openOverlayEvent();  

  var sliderOverlay = new Slider(divName);
  sliderOverlay.createSliderContainer("overlay-slider", "swiper-container-overlay");
  sliderOverlay.createWrapper("overlay-wrapper");
  sliderOverlay.closeBtnOverlay();
  sliderOverlay.createCards("overlay-card", "overlay-card-img", "overlay-imgCaption");
  sliderOverlay.loadSliderImages("overlay-card-img");// for second slider
  sliderOverlay.loadCaption("overlay-imgCaption");
  
}




//------------------------Library function--------------------------
window.onload = function () {
	
	init("#main");
  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    updateOnWindowResize: true,
    setWrapperSize: true,
  
    
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 5,
      spaceBetween: 1,
    },

    820:{
      slidesPerView: 6,
      spaceBetween: 2,
    }
  },


    touchEventsTarget: "wrapper",

        
    slidesPerGroup:1,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

     watchSlidesVisibility: true,
      watchSlidesProgress: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    
  });
 

/*var swiper1 = new Swiper('.swiper-container-overlay');*/
var overlaySliderInit = new Swiper ('.swiper-container-overlay', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    updateOnWindowResize: true,
    setWrapperSize: true,

    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 50,
    
    touchEventsTarget: "wrapper",

    effect: 'coverflow',
    grabCursor: true,
           
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },

    slidesPerGroup:1,

     thumbs: {
        swiper: mySwiper
      },

    pagination: {
      el: '.swiper-pagination',
    },

  })

}