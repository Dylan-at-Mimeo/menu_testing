$(function(){
    $("input[name='subsection']").prop('checked', false);
    $("input[name='subsection']").click(function(){
        if($(this).is(':checked')){
            $("input[name='subsection']").not(this).prop('checked', false);        
        }
    });
});

