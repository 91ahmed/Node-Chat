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

    // Welcome message
    $('.chat-box-container').delay(3000).prepend(`
        <div class="row chat-box wow bounceInUp">
            <div class="col-12">
                <div class="chat-image" style="background-image:url(../images/avatars/boy_2.png);"></div>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title chat-title"> Ahmed Hassan &nbsp;<small>(owner)</small></h5>
                        <p class="card-text chat-text">
                            You can use another device or browser to <b>simulates</b> the second user
                        </p>  
                    </div>
                </div>
            </div>
            <small class="currentDateTime">1/20/2021, 3:56:19 AM</small>
        </div>
    `);
});