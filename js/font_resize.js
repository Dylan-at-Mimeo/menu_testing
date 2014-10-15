   
  document.getElementById("boss").setScaledFont = function (f) {
       var s = this.offsetWidth,
           fs = s * f;
       this.style.fontSize = fs + '%';
       return this
   };

   document.getElementById("boss").setScaledFont(0.7);

   window.onresize = function () {
        document.getElementById("boss").setScaledFont(0.7);
   }