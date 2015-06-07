$('.naturalLanguageForm').submit(function(e){
    e.preventDefault();
});

$(document).on('click', '#menu .hamburger', function(){
    $('#menu .mobile-menu').stop().slideToggle(500);
});

$(document).on('click', 'body.overlay', function(){
    $('body.overlay #searchForm .inputWrapper .recommendationsPopUp').each(function(index, popUp){
        if($(popUp).css('opacity') === '1' && $(popUp).css('display') === 'block'){
            $('body.overlay #searchForm .inputWrapper .recommendationsPopUp').fadeOut(500);
            $('body').removeClass('overlay');
        }
    });
    //if($('body.overlay #searchForm .inputWrapper .recommendationsPopUp').css('opacity') === '1' && $('body.overlay #searchForm .inputWrapper .recommendationsPopUp').css('display') === 'block'){
    //    $('body.overlay #searchForm .inputWrapper .recommendationsPopUp').fadeOut(500);
    //    $('body').removeClass('overlay');
    //}
});

$(document).on('click', '.dialogWindow > .closeDialog', function(){
    $(this).parent('.dialogWindow').fadeOut(500, function(){
        $(this).remove();
    });
});