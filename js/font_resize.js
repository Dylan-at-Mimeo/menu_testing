   
  document.getElementById("responsive_menu").setScaledFont = function (f) {
       var s = this.offsetWidth,
           fs = s * f;
       this.style.fontSize = fs + '%';
       return this
   };

   document.getElementById("responsive_menu").setScaledFont(0.7);

   window.onresize = function () {
        document.getElementById("responsive_menu").setScaledFont(0.7);
   }