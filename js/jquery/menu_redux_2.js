/********************************/
/*********************************

1.Associate button id's with ViewportButton objects.
  --> 
2. 


*********************************/
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
      this.parent = isParent;
      this.viewport = id + '_vp';
      this.expand = function() { 
        return $(this.id).prop('checked'); };
      this.get_max_height = function() {
        var totalHeight = 0;
        $(this.viewport).children().each(function() {
          totalHeight += $(this).outerHeight(true);
        });
        return totalHeight + 'px';
      };
      this.max_height = this.get_max_height();
      this.height = function() { 
        return this.expand() ? this.get_max_height() : 0; };
      this.get_trans_speed = function() {
        var height = this.max_height.substr(0,this.max_height.length-2);
        var constant = this.parent ? 0.25 : 0.075;
        return constant + height/300 + 's';
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
      this.parent = parent;
      this.children = children;
      this.child_count = child_count;
      this.recalc_parent = function() { 
        this.parent.set_vp(); };
      this.recalc_child = function(child_id) {
        for(var c=0; c<this.child_count; c++) {
          if(children[c].id == child_id) {
            children[c].set_vp();
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
    
    test(['begin'], ['construct(obj,data)']);
    
    var sections = [];
    var sec_count = 0;
    
    for(var sec in data.section) {
      var subsecs = [];
      var subsec_count = 0;
      var section;
      if(data.section.hasOwnProperty(sec)) { // ignore prototype
        section = new obj.ViewportButton(sec, data.section[sec], true);
        section.set_vp();
        sec_count++;
        test(['result_in', section.name + ' (obj)', 'ViewportButton', section]);
      }
      for(var subsec in data.subsection[sec]) {
        if(data.subsection[sec].hasOwnProperty(subsec)) {
          var subsection = new obj.ViewportButton(subsec, data.subsection[sec][subsec], false);
          subsecs.push(subsection);
          subsection.set_vp();
          subsec_count++;
          test(['result_in', subsection.name + ' (obj)', 'ViewportButton', subsection]);
        }
      }
      var sec_unit = new obj.SectionUnit(section, subsecs, subsec_count);
      sections.push(sec_unit);
    }
    
    test(['end'], ['construct(obj,data)']);
    test(['result_out'], ['ViewportButton']);
    
    for(var i=0; i<sec_count; i++) {
      test(['result_in', sections[i].parent.name, 'SectionUnit', sections[i]]);
    }
    test(['result_out'], ['SectionUnit']);
    
    var sec_units = { units: sections, num: sec_count };
    
    return sec_units;
  }; // construct
  
  var index = function(sort) {
    test(['begin'], ['index(sort)']);
    
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
      
      test(['result_in', unit_pack.name, 'unit_pack', unit_pack]);
      
      unit_index.push(unit_pack);
      unit_count++;
    }
    
    test(['result_out'], ['unit_pack']);
    
    var unit_control = {};
    var unit_control_key_value = function create(key,value) {
      unit_control[key] = value;
    };
    for(var x=0; x<unit_count; x++) {
      for(var xx=0; xx<unit_index[x].num; xx++) {
        var key = unit_control_key_value(
                  unit_index[x].ids[xx],
                  unit_index[x].unit);  
        test(['result_in', 'unit_index['+x+'].ids['+xx+']', '#some_id', unit_index[x].ids[xx]]);
        test(['result_in', 'unit_index['+x+'].unit', 'unit_pack', unit_index[x].unit]);
      }
    }
    
    test(['end'], ['index(sort)']); 
    test(['result_out'], ['unit_control']);   
 
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


var menu = new MENU();
var checked;


////////////////////////////////////////////////////////////  
$(document).ready(function() {//////////////////////////////
  
//   $('input.sub + label').mouseup(function(event) {  
//     var sub_clean = $(this).prev(':input').attr('id');
//     var sub_input = '#'+sub_clean; 
//     $(sub_input).click();
//   });

  $('input[name="subsection"]').change(function(event) {    
    var sub_clean = $(this).attr('id');
    var sub_input = '#'+sub_clean; 
    //console.log(sub_input);
    //$(sub_input).click();
    menu[sub_input].recalc_child(sub_input);
    if($('input[name="subsection"]:checked').length > 1) {
      //console.log('over limit'); 
      var check_arr = $('input[name="subsection"]:checked').not(sub_input).toArray();
      for(var i=0; i< menu[sub_input].child_count; i++) {
        var uncheck = menu[sub_input].children[i].id; 
        if($(uncheck).prop('checked') === true) {
          //console.log('(uncheck) = '+uncheck);
          //console.log('(sub_input) = '+sub_input);
          $(uncheck).click();
          menu[uncheck].recalc_child(uncheck);
          //$(sub_input).click();
          //menu[sub_input].recalc_child(sub_input);
        } 
      }
    }

    $(sub_input+' + label + div.viewport').on('transitionend', function(event) {
      var sub_input_after = '#'+$(this).prev().prev(':input').attr('id');
      //console.log('sub_input_after = '+sub_input_after);
      //console.log(menu[sub_input_after].child_count * .13 + 's');
      $(menu[sub_input_after].parent.viewport).css("transition",menu[sub_input_after].child_count * .13 + 's');
      menu[sub_input_after].recalc_parent();
    });
    
  });

  $('input.sec').click(function(event) {
    var sec_input = '#'+event.target.id;
    
    if($(sec_input).prop('checked') === true) {
      $('input.sec ~ div.viewport > ul > li > input.sub:checked').click();
    }
    
    menu[sec_input].recalc_parent();
    
    if($('input.sec:checked').not(sec_input).length > 0) {
      //console.log('section overflow');
      $('input.sec:checked').not(sec_input).click();
      $(sec_input).click();
    }
  });

//   $('#mimeoAccordion').css({
//     'position': 'absolute',

//     'top': '50%',

//     'margin-top': -$(this).outerHeight(true)/2  + $('.account_links').outerHeight(true)
//   });
  
});////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
