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
    ViewportButton: function(name, id) {
      this.name = name;
      this.id = id;
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
      this.set_vp = function() { 
        $(this.viewport).css("max-height",this.height()); };
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
      'Marketplace': null,
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
        section = new obj.ViewportButton(sec, data.section[sec]);
        sec_count++;
        test(['result_in', section.name + ' (obj)', 'ViewportButton', section]);
      }
      for(var subsec in data.subsection[sec]) {
        if(data.subsection[sec].hasOwnProperty(subsec)) {
          var subsection = new obj.ViewportButton(subsec, data.subsection[sec][subsec]);
          subsecs.push(subsection);
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
    var unit_control_key_value = function create(access,arg) {
      unit_control[access] = arg;
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
    
    
//     var formula = function(n,h,r,c) {
//       var height = n * h;
//       var ratio = r;
//       var constant = c;
      
//       return height/ratio * 0.01 + c;
//     };
    
//     var nums = [2,3,4,5,6,7];
//     var heights = [20,25,30,35,40,45];
//     var ratios = [ 9, 12, 15, 18, 21, 24 ];
//     var constants = [ 0.08, 0.1, 0.12, 0.14, 0.16, 0.18];
    
    
//     var results = [];
    
//     for(var y=0; y<6; y++) {
//       for(var t=0; t<6; t++) {
//         console.log('Height: '+(nums[y]*heights[y])+'\n'+
//                     'Ratio: '+ratios[t]+'\t'+
//                     'Constant: '+constants[t]+'\n'+
//                     'Result: '+formula(nums[y],heights[y],ratios[t],constants[t])); 
//         results.push({ 
//           height: nums[y]*heights[y],
//           ratio: ratios[t],
//           constant: constants[t], 
//           result:formula(nums[y],heights[y],ratios[t],constants[t]) 
//         });
//       }
//       console.table(results);
//       results = [];
//     }
//      console.log("+++++++++++++++++++++++++++++++");
//      for(var y=0; y<6; y++) {
//       for(var t=0; t<6; t++) {
//         console.log('Height: '+(nums[t]*heights[t])+'\n'+
//                     'Ratio: '+ratios[y]+'\t'+
//                     'Constant: '+constants[y]+'\n'+
//                     'Result: '+formula(nums[t],heights[t],ratios[y],constants[y])); 
//         results.push({ 
//           height: nums[t]*heights[t],
//           ratio: ratios[y],
//           constant: constants[y], 
//           result:formula(nums[t],heights[t],ratios[y],constants[y]) 
//         });
//       }
//       console.table(results);
//       results = [];
//     }
    
    
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

  $('input.sub + label').mouseup(function(event) {    

    var sub_clean = $(this).prev(':input').attr('id');
    var sub_input = '#'+sub_clean; 

    $(sub_input).click();
  
    if($('input[name="subsection"]:checked').length > 1) {
      var check_arr = $('input[name="subsection"]:checked').not(sub_input).toArray();
      for(var i=0; i< menu[sub_input].child_count; i++) {
        var uncheck = menu[sub_input].children[i].id; 
        if(uncheck != sub_input && $(uncheck).prop('checked') === true) {
          $(uncheck).click();
          menu[uncheck].recalc_child(uncheck);
        } 
      }
    }
    menu[sub_input].recalc_child(sub_input);

    $(sub_input+' + label + div.viewport').on('transitionend', function(event) {
      var sub_input_after = '#'+$(this).prev().prev(':input').attr('id');
      menu[sub_input_after].recalc_parent();
    });
    
  });
  
  $('input.sec').click(function(event) {
    var sec_input = '#'+event.target.id;
    menu[sec_input].recalc_parent();
  });

});////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
