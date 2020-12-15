function serverSliderPageStart() {
  const Slides = {
    duration: 7,//seconds
    currentPage: 1,
    isUpdate: true,
    lineElement: '',
    currentLineWidth: 0,
    quantityPage: 3,
    initialize: function () {
      this.quantityPage = Array.from(document.querySelectorAll(".page_slider")).length;
      this.openPage(1);
      setInterval(this.updateTimer,1);
    },
    openPage(indexPage) {
      Slides.currentLineWidth = 0;
      this.currentPage = indexPage;
      document.querySelectorAll(".page_slider_display").forEach(function callback(currentValue, index, array) {
        currentValue.style.display = "none";
      });
      document.querySelector(".page:nth-child(" + indexPage + ")").style.display = 'flex';
      document.querySelectorAll(".lines .out").forEach(function callback(currentValue, index, array) {
        if (index + 1 < Slides.currentPage) {
          currentValue.querySelector('.white').style.width = '100%';
        }
        else
          currentValue.querySelector('.white').style.width = '0';
      });
      this.startTimer();
    },
    startTimer: function () {
      Slides.lineElement = document.querySelector(".lines .out:nth-child(" + Slides.currentPage + ") .white");
      Slides.isUpdate = true;
    },
    stopTimer: function () {
      // console.log('stopTimer');
      this.isUpdate = false;
    },
    nextSlider: function () {
      let index = this.currentPage + 1;
      if (index > this.quantityPage) {
        //index = 6;
        this.isUpdate = true;
        return;
      }
      this.openPage(index);
    },
    backSlider: function () {
      let index = this.currentPage - 1;
      if (index < 1) index = 1;
      this.openPage(index);
    },
    updateTimer() {
      if(!Slides.isUpdate) return;
      if (Slides.lineElement.style.width == '100%') {
        if(Slides.isNext()) {
          Slides.nextSlider();
        } else {
          fn.load('registration.html');
          Slides.isUpdate = false;
        }
      }
      else {
        Slides.currentLineWidth = Slides.currentLineWidth + 1 / (Slides.duration * 2);
        if(Slides.currentLineWidth > 100) Slides.currentLineWidth = 100;
        Slides.lineElement.style.width = Slides.currentLineWidth + '%';
      }
    },
    isNext:function(){
      return this.currentPage < this.quantityPage;
    }
  }
  const Events = {
    startTime: 0,
    currentButton: "null",
    deltaTime: 200,
    initialize: function(){ 
      if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
        document.querySelector("div.back").addEventListener('touchstart', function(){Events.checkStartEvent('back');});
        document.querySelector("div.next").addEventListener('touchstart', function(){Events.checkStartEvent('next');});
    
        document.querySelector("div.back").addEventListener('touchend', function(){Events.checkEndEvent('back');});
        document.querySelector("div.next").addEventListener('touchend', function(){Events.checkEndEvent('next');});
      }
      else{
        document.querySelector("div.back").addEventListener('mousedown', function(){Events.checkStartEvent('back');});
        document.querySelector("div.next").addEventListener('mousedown', function(){Events.checkStartEvent('next');});
        
        document.querySelector("div.back").addEventListener('mouseup', function(){Events.checkEndEvent('back');});
        document.querySelector("div.next").addEventListener('mouseup', function(){Events.checkEndEvent('next');});
      }
    },
    checkStartEvent(target){
      // console.log("start " + target);
      this.startTime = Date.now();
      this.eventHold();
      switch(target){
        case 'back':
          this.currentButton = "back";
          break;
        case 'next':
          this.currentButton = "next";
          break;
      }
    },
    checkEndEvent(target){
      // console.log("END " + target);
      if(Date.now() - this.startTime <= this.deltaTime){
        this.eventClick();
      }
      else{
        Slides.startTimer();
      }
    },
    eventClick(){
      switch(this.currentButton){
        case 'back':
          Slides.backSlider();
          break;
        case 'next':
          Slides.nextSlider();
          break;
      }
    },
    eventHold(){
      Slides.stopTimer();
    }
  }
  const contentSlider = `
    <div class="photo-wrapper">
      <div class="lines">
        <div class="out">
          <div class="white"></div>
        </div>
      <div class="out">
        <div class="white"></div>
      </div>
      <div class="out">
        <div class="white"></div>
      </div>
    </div>
      <div class="pages">
      <div class="page page_slider">
        <div class="page__paragraphs page__paragraphs_position_up">
          <p class="page__text">test 1</p>
        </div>
        <img class="page__image" src="https://www.shans-na-schastye.ru/wp-content/uploads/2019/02/biz.jpg">
          </div>
      <div class="page page_slider page_slider_display">
        <div class="page__paragraphs page__paragraphs_position_center" style="max-height: 100px;">
          <p class="page__text">test 2</p>
        </div>
        <img class="page__image" src="https://psy-files.ru/wp-content/uploads/2/2/0/2203d5ae92c1ff6d85317e7a06e8997d.jpg">
          </div>
      <div class="page page_slider page_slider_display">
            <div class="page__paragraphs page__paragraphs_position_down">
              <p class="page__text">test 3</p>
            </div>
            <img class="page__image" src="https://gurutest.ru/uploads/publication/2016/02/15/c3d61f38e36c3c1dd093b63db2aea2aa.jpg>
          </div>
    </div>
  </div>`;
  function createSlides() {
    const slidesDocument = document.querySelector('#slides-content');
    slidesDocument.innerHTML = contentSlider;
    Events.initialize();
    Slides.initialize();
  }
  createSlides()
}