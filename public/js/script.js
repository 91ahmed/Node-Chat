$(document).ready(function(){
    $('.ajax-form').on('submit', function(e){
        e.preventDefault();
        
        var formAction = $(this).attr('action');
        var formData   = new FormData($(this)[0]);
        var formMethod = $(this).attr('method');

        // Convert formData to Json object
        var object = {};
        formData.forEach((value, key) => {
            // Reflect.has in favor of: object.hasOwnProperty(key)
            if(!Reflect.has(object, key)){
                object[key] = value;
                return;
            }
            if(!Array.isArray(object[key])){
                object[key] = [object[key]];    
            }
            object[key].push(value);
        });
        var data = JSON.stringify(object);

        $.ajax({
            url: formAction,
            method: formMethod,
            data: data,
            contentType: "application/json; charset=utf-8",
            cache: false,
            processData: false,
            success: function (data)
            {
                $('.ajax-errors ul').empty();
                $('.ajax-errors ul').html('<li>'+data+'</li>');
            },
            error: function (dataError, exception)
            {
                $('.ajax-errors ul').empty();

                if(exception == 'error'){
                    var errors = dataError.responseJSON;

                    $.each(errors, function(key, value){
                        $('.ajax-errors ul').append('<li>'+key+" "+value+'</li>');
                    });
                }
            }
        });

        return false;
    });

    // Change avatar
    $('.avatar-choose').on('click', function(){
        var avatarPath = $(this).attr('data-avatar');
        $('.logo').attr('src', 'images/avatars/'+avatarPath+'.png');
        $('.avatar-input').val(avatarPath);
    });

    // Wow js init
    new WOW().init();
});