$('.naturalLanguageForm').submit(function(e){
    e.preventDefault();
});

$(document).on('click', '#menu .hamburger', function(){
    $('#menu .mobile-menu').stop().slideToggle(500);
});