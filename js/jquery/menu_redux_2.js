/********************************/
/*********************************

1.Associate button id's with ViewportButton objects.
  --> 
2. 

BUG:

1. open section
2. open subsection
3. slide to next five
4. close section
5. viewport no longer resizes for <5


css(font size) for px returns 16 * .x where .x represents the percentage on the container

*********************************/

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};



/********************************/
var MENU = function() {
  /********************************/
  /********************************/
  timer = {
    begin: [],
    end: [],
    start: function(slot) {
      this.begin[slot] = performance.now();
    },
    stop: function(slot) {
      this.end[slot] = performance.now();
    },
    time: function(slot) {
      return this.end[slot] - this.begin[slot];
    },
    clear: function() {
      this.begin = [];
      this.end = [];
    }
  };
  result = {
    slot: [],
    slot_count: 0,
    Value: function(operation, expectation, outcome) {
      this.is = operation;
      this.want = expectation;
      this.got = outcome;
    },
    test: function(operation, expectation, outcome) {
      var test = new this.Value(operation, expectation, outcome);
      this.slot.push(test);
      this.slot_count++;
    }, 
    output: function(name) {
      console.log('--------------------------------------');
      console.log('[test][' + name + ']: results');
      console.table(this.slot);
      console.log('--------------------------------------');
      this.slot = [];
      this.slot_count = 0;
    }
  };
  test = function(order, thisMethod) {
    switch(order[0]) {
      case 'begin':
        console.log('______________________________________');
        console.log('[' + thisMethod[0] + ']: entered');
        console.log('[clock][0]: start (' + thisMethod[0] + ')');
        console.log('______________________________________');
        timer.start(0);
        break;
      case 'end':
        timer.stop(0);
        console.log('______________________________________');
        console.log('[clock][0]: result - ' + timer.time(0) + ' ms');
        console.log('[' + thisMethod[0] + ']: exited');
        console.log('______________________________________');
        break;
      case 'inner_begin':
        console.log('[clock][' + order[1] + ']: start');
        timer.start(order[1]);
        break;
      case 'inner_end':
        timer.stop(order[1]);
        timer.output(name);
        console.log('[' + thisMethod[0] + ']: ' + thisMethod[1] + ': ' + timer.time(order[1]));
        break;
      case 'result_in':
        result.test(order[1], order[2], order[3]);
        break;
      case 'result_out':
        result.output(thisMethod[0]);
        break;
      default:
        console.log('[test]: ERROR - Invalid input "' + order[0] + '"');
        break;
    }
  };
  
////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////
  
  var obj = {
    ViewportButton: function(name, id, isParent) {
      this.name = name;
      this.id = id;
      this.btn_height = $(this.id + ' + label').outerHeight(true);
      this.viewport = id + '_vp';
      this.expand = function() { 
        return $(this.id).prop('checked'); };
      this.parent = isParent;
      this.parent_id =  isParent ? null :
                        $(id).parent().parent()
                        .prevAll('input').first().attr('id');
      this.child_count = 0;
      this.child_heights = [];
      this.child_ids = [];
      this.child_active = 0;
      
      
      this.vp_heights = isParent ? [] : null;
      this.test_height = null;

      this.get_max_height = function() {
        var totalHeight = 0, count = 0;
        $(this.viewport + ' > ul > li').each(function() {
          totalHeight += $(this).outerHeight(true);
          count++;
        });
        
        this.child_count = count;
        return totalHeight;
      };
      this.set_max_height = function() {
        $('body').css('transition','all 0s linear !important');
        $(this.id).click();
        var height = this.get_max_height();
        $(this.id).click();
        $(this.id).css('transition','');
        console.log(this.name + '\t' + 'max_height = ' + height);
        return height;
      };
      this.max_height = this.set_max_height();
      this.set_parent_max_heights = function() {
        var heights = [];
      };
      this.height = function() { 
        if(this.parent)
          return this.expand() ? this.vp_heights[this.child_active] + 'px' : 0;
        else
          return this.expand() ? this.max_height + 'px' : 0;
      };
      this.get_trans_speed = function() {
        var height = this.get_max_height();
        var constant = 0.1;
        return constant + height/400 + 's';
      };
      this.trans_speed = this.get_trans_speed();
      this.set_vp = function() { 
        $(this.viewport).css("max-height",this.height());
        $(this.viewport).css("transition","max-height "+this.trans_speed+" ease-in-out");
      };
      
      
      
    }, // ViewportButton
    /********************************/
    SectionUnit: function(parent, children, child_count) {
      this.section = parent.name;
      // learn how to make constructor to use set_parent()
      this.parent = parent;
      this.children = children;
      this.child_count = child_count;
      
      this.set_parent = function() {
        var toAdd = this.children[0].btn_height * child_count;
        this.parent.vp_heights.push(this.parent.max_height);
        for(var i=0; i<child_count; i++) {
          this.parent.child_ids.push(this.children[i].id);
          this.parent.child_heights.push(this.children[i].max_height);
        }
        for(var ii=0; ii<child_count; ii++) {
          this.parent.vp_heights.push(this.parent.child_heights[ii]+toAdd);
        }
        console.log('________________________' +
                    '\n' + this.parent.name + '\n' + 
                    '________________________');
        console.log('btn_height = ' + this.children[0].btn_height);
        console.table(this.parent.vp_heights);
        console.table(this.parent.child_heights);
        // build key index using method in constructor to provide instant access by int (0-n)
        //console.table(this.parent.child_ids);
        //console.table(this.parent.child_heights);
      }; this.set_parent();
      this.recalc_parent = function() { 
        this.parent.set_vp();
        var anyChecked = false;
        for(var i=0; i<this.child_count;i++)
          if($(children[i].id).prop('checked'))
            anyChecked = true;
        if(!anyChecked)
          this.parent.child_active = 0;
      };
      this.recalc_child = function(child_id) {
        //console.log('child');
        for(var c=0; c<this.child_count; c++) {
          if(this.children[c].id == child_id) {
            this.children[c].set_vp();
            this.parent.child_active = 
              $(this.children[c].id).parent().index() + 1;
            console.log('\t\t\t' + 'child_active = ' + this.parent.child_active);
            break;
          }
        }
      };
    }, // SectionUnit
  }; // obj
  /********************************/
  /********************************/
  var data = {
    section: {
      'Products': '#products_main',
      'Solutions': '#solutions_main',
      'Marketplace': '#marketplace_main',
      'Support': '#support_main'
    },
    /********************************/
    subsection: {
      'Products': {
        'Our_Products': '#prod_our',
        'Binding_Products': '#prod_bind',
        'Services': '#prod_serv'
      },
      'Solutions': {
        'Business': '#solu_bus',
        'Industry': '#solu_ind'
      },
      'Marketplace': {
        'Content': '#mark_con',
        'Distribution': '#mark_dis',
        'Packages': '#mark_pac',
        'Benefits': '#mark_ben'
      },
      'Support': {
        'Resources': '#supp_res',
        'Capabilities': '#supp_cap'
      }
    }
  }; // data
  /********************************/
  /********************************/
  var construct = function(obj, data) {
    
    //test(['begin'], ['construct(obj,data)']);
    
    var sections = [];
    var sec_count = 0;
    
    for(var sec in data.section) {
      var subsecs = [];
      var subsec_count = 0;
      var section;
      if(data.section.hasOwnProperty(sec)) { // ignore prototype
        section = new obj.ViewportButton(sec, data.section[sec], true);
        //section.set_vp();
        sec_count++;
        //test(['result_in', section.name + ' (obj)', 'ViewportButton', section]);
      }
      for(var subsec in data.subsection[sec]) {
        if(data.subsection[sec].hasOwnProperty(subsec)) {
          var subsection = new obj.ViewportButton(subsec, data.subsection[sec][subsec], false);
          subsecs.push(subsection);
          //subsection.set_vp();
          subsec_count++;
          //test(['result_in', subsection.name + ' (obj)', 'ViewportButton', subsection]);
        }
      }
      var sec_unit = new obj.SectionUnit(section, subsecs, subsec_count);
      sections.push(sec_unit);
    }
    
    //test(['end'], ['construct(obj,data)']);
    //test(['result_out'], ['ViewportButton']);
    
    //for(var i=0; i<sec_count; i++) {
      //test(['result_in', sections[i].parent.name, 'SectionUnit', sections[i]]);
    //}
    //test(['result_out'], ['SectionUnit']);
    
    var sec_units = { units: sections, num: sec_count };
    
    return sec_units;
  }; // construct
  
  var index = function(sort) {
    //test(['begin'], ['index(sort)']);
    
    var unit_index = [];
    var unit_count = 0;
    
    for(var i=0; i<sort.num; i++) {
      var id_index = [];
      var id_count = sort.units[i].child_count + 1; // +1 parent
      
      var section_id = sort.units[i].parent.id;
      id_index.push(section_id);
      
      for(var ii=0; ii<sort.units[i].child_count; ii++) {
        var subsection_id = sort.units[i].children[ii].id; 
        id_index.push(subsection_id);
      }
      
      var unit_pack = { 
        name: sort.units[i].parent.name, 
        unit: sort.units[i], 
        num: id_count, 
        ids: id_index 
      };
      
      //test(['result_in', unit_pack.name, 'unit_pack', unit_pack]);
      
      unit_index.push(unit_pack);
      unit_count++;
    }
    
    //test(['result_out'], ['unit_pack']);
    
    var unit_control = {};
    var unit_control_key_value = function create(key,value) {
      unit_control[key] = value;
    };
    for(var x=0; x<unit_count; x++) {
      for(var xx=0; xx<unit_index[x].num; xx++) {
        var key = unit_control_key_value(
                  unit_index[x].ids[xx],
                  unit_index[x].unit);  
        //test(['result_in', 'unit_index['+x+'].ids['+xx+']', '#some_id', unit_index[x].ids[xx]]);
        //test(['result_in', 'unit_index['+x+'].unit', 'unit_pack', unit_index[x].unit]);
      }
    }
    
    //test(['end'], ['index(sort)']); 
    //test(['result_out'], ['unit_control']);   
 
    return unit_control;
  };
  
  var assemble = construct(obj,data);
  
  return index(assemble);
  
  /********************************/
  /********************************/
};
/********************************/
/********************************/
/********************************/
/********************************/


//var menu = new MENU(), 
var init = true, winHeight, current, accordHeight, available, afterSpan;

(function($) {
    $.fn.setHeight = function() {
        return this.each(function() {
          var id = '#' + $(this).attr('id'), 
              label = $(id + ' + label');
          if($('input[name="section"]:checked').length == 0 
            && !$(this).prop('checked')) {
            //console.log('if');
            label.css('height',available);
          }
          else {
            //console.log('else');
            if($(this).prop('checked')) {
              //console.log('if 2');
              label.css('height',defSecHeight);
            } 
            else {
              //console.log('else 2');
              //label.parent().css('height',available);
              label.css('height',available);
            }
          }
       });
    };
}(jQuery));   

var emToPx = function(em) {
  var emSize = parseFloat($("#responsive_menu").css("font-size"));
  return emSize * em;
};

var viewConsts = function() {
  
  winHeight = $(window).innerHeight();
  afterSpan = emToPx(0.5);
  defSecHeight = emToPx(2);
  current = (function() {
      return '#' + $('input[name=section]:checked').first().attr('id');
  })();
  accordHeight = winHeight - 
    ($('ul.account_links').outerHeight() +
     $('ul#bot_icons').outerHeight());
  available = (function () {
    if($('input[name="section"]:checked').length == 0) {
      return accordHeight / 4 + 'px';
    }
    else {
      var openMax = (function() {
          var total = 0;
          $(current + '~ div.viewport > ul').children().each(function() {
            total += $(this).outerHeight();
          });
          return total; 
      })(), 
          subtract = openMax + defSecHeight + afterSpan,
          remainder = accordHeight - subtract;
      return remainder / 3 + 'px';
    }
  })();
};

var shouldResize = function(id,l,h) {
  if( l > 5 && l < 10 ) {
    console.log('len!!!!!!!!!!!!!!!!!!!!!!!!!!');
    if($(id).prop('checked') === true) {
      $(id).parent().css('max-height', function() {
        return (l - 5) * h;
      });
    }
    else {
      $(id).parent().css('max-height', function() {
        return 5 * h;
      });
    }
  }
};

////////////////////////////////////////////////////////////  
$(document).ready(function() {//////////////////////////////
  var menu = new MENU();
  
  $(function() {
    $('input.sec').trigger('change');
  });

  $('input').change(function(event) {   
    
    var id = '#' + $(this).attr('id'), check;
    viewConsts();
    
    if(init) {
      $('input[name="section"]').each(function() {
        var id = '#' + $(this).attr('id');
        $(this).setHeight();
        menu[id].recalc_parent();
      });
      $('input[name="subsection"]').each(function() {
        var id = '#' + $(this).attr('id');
        menu[id].recalc_child(id);
      });
      init = false;
    }
    
    if($(this).hasClass('sec')) {
      console.log('change ------ section');
      $('input[name="section"]').each(function() {
        $(this).setHeight();
      });
    }
    
    if($(this).hasClass('sub')) {
      console.log('change ------ subsection');
      
//       if($('input.sub:checked:not('+id+')').length > 0 && $(this).prop('checked')) {
//         $('input.sub:checked:not('+id+')').click(); 
//       }
      //setTimeout(function(){  menu[id].recalc_child(id); },0);
       

      $(id+' + label + div.viewport').on('transitionend', function(event) {
        if(event.originalEvent.propertyName == 'max-height') {
          viewConsts();
          $('input[name="section"]').each(function() {
            $(this).setHeight();
          });
          //setTimeout(function(){ menu[id].recalc_parent(); },500);
        }
      });
    }

    
//     var nxts = $('input[name="next_five"]:checked:first');
//     if(nxts.length > 0 && nxts.parent().prevAll('input:first').prop('checked') === false) {
//       nxts.off('click').click();
//     }
    
    
  });
  
//   $('input[name="next_five"]').click(function(event) {

    
//     var id = '#' + $(this).attr('id');
//     var len = $(id+' ~ ul[class="mimeo_links"]').children().length;
//     var child_height = $(id+'~ul[class="mimeo_links"] > li').outerHeight(true);
    
    
//     shouldResize(id,len,child_height);
    
//   });
  
  $('input[name="subsection"]').on('click',function(event) {    
   
    
    var sub_input = '#'+ $(this).attr('id'); 
    var parent = '#' + $(sub_input).parent().parent().parent().attr('id');
    
//     $(sub_input).one('click',function(event) {
//       if($(event.target).data('oneclicked')!='yes')
//       {
//         console.log('live');
//       }
//       $(event.target).data('oneclicked','yes');
//     });
//     
//     
 
    if($(this).prop('checked')) {
      $(parent + ' input.sub:checked:not('+sub_input+')').click(); 
    }
    setTimeout(function(){  menu[sub_input].recalc_child(sub_input); },0);
      
     // menu[sub_input].recalc_child(sub_input); 
     // setTimeout(function(){ menu[sub_input].recalc_parent(); },500);
    
//       $('input[name="section"]').each(function() {
//             $(this).setHeight();
//       });
//       $(sub_input+' + label + div.viewport').one('transitionend', function(event) {
//         if(event.originalEvent.propertyName == 'max-height') {
//           console.log('TRANSITION');
//           //viewConsts();
//           $('input[name="section"]').each(function() {
//             $(this).setHeight();
//           });
          
           //setTimeout(function(){ menu[sub_input].recalc_parent(); },250);

//         }
//       });
    
//     $(sub_input).one('mouseup',function(event){
//       console.log('AHHHHHHHHHHHHHHHHHHHHHHHHHHH = ' + sub_input);
      
//       if($('input.sub:checked:not('+sub_input+')').length > 0 && $(this).prop('checked')) {
//          $('input.sub:checked:not('+sub_input+')').click(); 
//       }
      
//       menu[sub_input].recalc_child(sub_input); 

//       $(sub_input+' + label + div.viewport').one('transitionend', function(event) {
//         if(event.originalEvent.propertyName == 'max-height') {
//           console.log('TRANSITION');
//           //viewConsts();
//           $('input[name="section"]').each(function() {
//             $(this).setHeight();
//           });
          
//           setTimeout(function(){ menu[sub_input].recalc_parent(); },250);

//         }
//       });
//     });
    
//     if($('input.sub:checked:not('+sub_input+')').length > 0 && $(this).prop('checked')) {
//        $('input.sub:checked:not('+sub_input+')').click(); 
//     }
//     menu[sub_input].recalc_child(sub_input); 

//     $(sub_input+' + label + div.viewport').on('transitionend', function(event) {
//       if(event.originalEvent.propertyName == 'max-height') {
        
//         //viewConsts();
//         $('input[name="section"]').each(function() {
//           $(this).setHeight();
//         });
//         setTimeout(function(){ menu[sub_input].recalc_parent(); },250);
        
//       }
//     });
    
  }).on('click', function(event){
    //alert('yo');
    var sub_input = '#' + $(this).prop('id');
    
    
    setTimeout(function(){  console.log('click - subsec -> parent - calc'); 
                            menu[sub_input].recalc_parent(); }, 0);
    
//     $(sub_input + ' ~ div.viewport').on('transitionend',function(event){
//       $('input[name="section"]').each(function() {
//         $(this).setHeight();
//       });
//     });
  });


  $('input.sec').off('click').click(function(event) {
    var sec_input = '#' + $(this).attr('id');
    //console.log('SECTION');
    if( $(this).prop('checked') === false ) {
      $(sec_input + ' ~ div.viewport input[name="subsection"]:checked').click();
    } 
    
    if($(this).prop('checked')) {
      $('input.sec:checked:not('+sec_input+')').click();
    }
    
    setTimeout(function(){  console.log('click - parent - calc'); 
                            menu[sec_input].recalc_parent(); }, 0);
    
  });
  
   
  
});////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//
//
//
// $(document).ready(function() {//////////////////////////////
  
//   $(function() {
//     $('input.sec').trigger('change');
//   });

//   $('input').change(function(event) {
//     clock = performance.now();
//     //var sub_input = '#'+ $(this).attr('id'); 
//     console.log('change - ' + clock);
    
//     viewConsts();
    
//     $('input[name="section"]').each(function() {
//       $(this).setHeight();
//     });
    
//     var nxts = $('input[name="next_five"]:checked:first');
//     if(nxts.length > 0 && nxts.parent().prevAll('input:first').prop('checked') === false) {
//       nxts.off('click').click();
//     }
    
    
//   });
  
//   $('input[name="next_five"]').click(function(event) {

    
//     var id = '#' + $(this).attr('id');
//     var len = $(id+' ~ ul[class="mimeo_links"]').children().length;
//     var child_height = $(id+'~ul[class="mimeo_links"] > li').outerHeight(true);
    
//     if( len > 5 && len < 10 ) {
//       debugger;
//       console.log('len!!!!!!!!!!!!!!!!!!!!!!!!!!');
//       if($(this).prop('checked') === true) {
//         $(this).parent().css('max-height', function() {
//           return (len - 5) * child_height;
//         });
//       }
//       else {
//         $(this).parent().css('max-height', function() {
//           return 5 * child_height;
//         });
//       }
//     }
    
    
//   });
  
//   $('input[name="subsection"]').off('click').click(function(event) {    
   
    
//     var sub_input = '#'+ $(this).attr('id'); 
//     var parent = '#' + $(this).parent().parent().attr('id');
    
    
//     if($('input.sub:checked:not('+sub_input+')').length > 0 && $(this).prop('checked')) {
//        $('input.sub:checked:not('+sub_input+')').click(); 
//     }
//     menu[sub_input].recalc_child(sub_input); 

//     $(sub_input+' + label + div.viewport').on('transitionend', function(event) {
//       if(event.originalEvent.propertyName == 'max-height') {
        
//         //viewConsts();
//         $('input[name="section"]').each(function() {
//           $(this).setHeight();
//         });
//         setTimeout(function(){ menu[sub_input].recalc_parent(); },250);
        
//       }
//     });
    
//   });


//   $('input.sec').off('click').click(function(event) {
//     var sec_input = '#' + $(this).attr('id');
//     console.log('SECTION');
//     if( $(this).prop('checked') === false ) {
//       $(sec_input + ' ~ div.viewport input[name="subsection"]:checked').click();
//     } 
    
//     if($('input.sec:checked:not('+sec_input+')').length > 0 && $(this).prop('checked')) {
//       $('input.sec:checked').not($(this)).click().stop();
//     }
    
//     menu[sec_input].recalc_parent();    
    
//   });
   
  
// });
