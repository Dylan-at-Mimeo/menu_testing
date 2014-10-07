var slidemenu = angular.module('slidemenu',[]);

prodSec.controller('slidemenuSection', function($scope) {

  $scope.expand = {
    'products' : false
  }
  
  $scope.viewport = {
    'products' : {
      'name' : '[Products]',
      'id' : $('#products_our'),
      'expand' : false,
      'max_height' :
        function() {
          var totalHeight = 0;
          $("#viewport_products").children().each(function(){
            totalHeight += $(this).outerHeight(true);  
          });
          return totalHeight + 'px';
        },
      'height' : function() { return this.expand ? this.max_height() : 0; },
      'subs' : {
        'our_products' : {
          'name' : '[Products]|[Our Products]',
          'expand' : false,
          'max_height' :
            function() {
              console.log('our_products.max_height()');
              var totalHeight = 0;
              $("#viewport_products_ourProducts").children().each(function(){
                totalHeight += $(this).outerHeight(true);  
              });
              return totalHeight + 'px';
            },
          'height' : function() { return this.expand ? this.max_height() : 0; },
          'report' : 
            function() { 
              console.log('--------------------' + '\n' +
                          this.name + '\n' +
                          '(expand): ' + this.expand + '\n' +
                          '(height): ' + this.height() + '\n' +
                          '(max_height): ' + this.max_height() + '\n' +
                          '--------------------'); 
            }
        }
      }
    }    
  };
});


prodSub.controller('slidemenuSection', function($scope) {

});
