$(document).ready(function(){

    $('textarea.wysiwyg').trumbowyg();

    $('form.delete-form').submit(function(){
        return confirm('Weet je het zeker?');
    });

});