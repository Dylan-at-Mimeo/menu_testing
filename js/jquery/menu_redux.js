/********************************/
/********************************/
/********************************/
/********************************/
var MENU = function() {
  /********************************/
  /********************************/
  var obj = {
  /********************************/
  /********************************/
    ViewportButton: function(name, id) {
      this.name = name;
      this.id = id;
      this.viewport = $(this.id).nextAll('.viewport:first');
      this.expand = function() { return this.id.prop('checked'); };
      this.get_max_height =
        function() {
          var totalHeight = 0;
          this.viewport.children().each(function( ) {
            totalHeight += this.viewport().outerHeight(true);  
          });
          return totalHeight + 'px';
        };
      this.max_height = this.get_max_height();
      this.height = function() { return this.expand() ? this.max_height : 0; };
    }, // ViewportButton
    /********************************/
    SectionUnit: function(parent, children, child_count) {
      this.section = parent.name;
      this.parent = parent;
      this.children = children;
      this.child_count = child_count;   
      this.recalc = function() {
        this.parent.viewport.css('max-height',this.parent.height());
        for(var i=0; i < this.child_count; i++) {
          this.children[i].viewport.css('max-height',this.children[i].height());
        }
        console.log('SectionUnit[recalc]: (viewport) - ' + this.parent.viewport;
      };
    }, // SectionUnit
    /********************************/
    IndexUnit: function(section_unit) {
      this.unit = section_unit;
      this.section = this.unit.parent.name;
      this.sec_id = this.unit.parent.id;
      this.build_subsec_ids = function(sec_unit) {
        var ids = [];
        for(var i=0; i < this.unit.child_count; i++) {
          ids.push(sec_unit.children[i].id);
        }
        return ids;
      };
      this.subsec_ids = this.build_subsec_ids(this.unit);
    }, // IndexUnit
    /********************************/
    SectionIndex: function(index_count, index_units) {
      this.index_count = index_count;
      this.buildIndex = function(units) {
        var index = [];
        for(var i = 0; i < this.index_count; i++) {
          index.push(units[i]);
        }
        return index;
      };
      this.index = this.buildIndex(index_units);
      this.calcSection = function(id) {
        for(var i=0; i < this.index_count; i++) {
          console.log('SectionIndex[calcSection]: id=');
          console.log(id);
          console.log('SectionIndex[calcSection]:')
          console.log(this.index[i].sec_id);
          if(this.index[i].sec_id == id) {
            console.log('SectionIndex[calcSection]: this.index[i].sec_id == id');
            this.index[i].unit.recalc();
            break;
          }          
        }
        console.log('SectionIndex[calcSection]:' + id);
      };
    } // SectionIndex
  }; // obj
  /********************************/
  /********************************/
  var data = {
  /********************************/
  /********************************/
    section : {
      'Products': '#products_main',
      'Solutions': '#solutions_main',
      'Marketplace': '#marketplace_main',
      'Support': '#support_main'               
    },
    /********************************/
    subsection : {
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
  /********************************/
  /********************************/
    console.log('CONSTRUCT START');    
    var sections = [];
    var sec_count = 0;
    for(var sec in data.section) {
      var subsecs = [];
      var subsec_count = 0;
      if(data.section.hasOwnProperty(sec)) {
        var section = new obj.ViewportButton(sec,data.section[sec]);
        sec_count++;
        console.log(section);
        console.log(section.id);
      }
      console.log(sec);
      for(var subsec in data.subsection[sec]) {
        if(data.subsection[sec].hasOwnProperty(subsec)) {
          var subsection = new obj.ViewportButton(subsec,data.subsection[sec][subsec]);
          subsecs.push(subsection);
          subsec_count++; 
          console.log(subsection.name);
          console.log(subsection.id);
        }
      }
      sections.push(new obj.SectionUnit(section,subsecs,subsec_count));
    }
    var index_units = [];
    for(var i = 0; i < sec_count; i++) {
      index_units.push(new obj.IndexUnit(sections[i]));
    }
    console.log(index_units);
    console.log('CONSTRUCT END');
    return new obj.SectionIndex(sec_count,index_units);
  };
  
  return construct(obj,data);
};
/********************************/
/********************************/
/********************************/
/********************************/

$(document).ready(function() {
  var menu = new MENU();
  $('#products_main:checked').click(function(event) {
    console.log('click');
    console.log($(this));
    menu.calcSection($(this));
  });
});
 // put in 'on page load' structure



