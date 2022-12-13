var socket = io();

// Start scroll from bottom
var chatContainer = document.querySelector('.chat-box-container');
chatContainer.scrollTop = chatContainer.scrollHeight;

// Get chat messages by ajax
function getChatData ()
{
    $.get('http://localhost:3000/chat', function(data) {
        $('.chat-box-container').html(data);
    });
}

$(function(){
    $('.chat-form').on('submit', function(e){
        e.preventDefault();

        // Get textarea value
        var message = $('.message').val();
        message = message.replace(/\r?\n/g, '<br />'); // Convert new line to html <br/>

        /*
        $.post('http://localhost:3000/chat/send', {'message': message}, function(data) {
            //$('.chat-box-container').html(data);
        });
        */

        // Get data
        //getChatData();
        
        if (!message == '') {
            // Prepend message
            prependMessage(getCookie('avatar'), getCookie('name')+' <small>(you)</small> ', message);
            // Send data to the server
            socket.emit('chat-message', {'message':message, 'name': getCookie('name'), 'avatar': getCookie('avatar')});
            // Clear textarea
            $('.message').val('');
        }

        return false;
    });
});

$(function(){
    var imageUrl = 'images/avatars/'+getCookie('avatar')+'.png';

    $('.user-name').html('Welcome, '+getCookie('name'));
    $('.welcome-user').html(" "+getCookie('name')+"");
    $('.user-avatar').css('background-image', 'url(' + imageUrl + ')');
});

socket.on('send-data', data => {
    //getChatData();
    prependMessage(data.avatar, data.name, data.message);
    playChatRingtone();
});

function prependMessage (avatar, title, message)
{
    $(function(){
        var currentDateTime = new Date().toLocaleString();
        $('.chat-box-container').prepend('<div class="row chat-box wow bounceInUp"><div class="col-12"><div class="chat-image" style="background-image:url('+"../images/avatars/"+avatar+".png"+');"></div><div class="card"><div class="card-body"><h5 class="card-title chat-title">'+title+'</h5><p class="card-text chat-text">'+message+'</p></div></div></div><small class="currentDateTime">'+currentDateTime+'</small></div>');
    });
}

function getCookie(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

function playChatRingtone() {
    var ringtone = document.getElementById('chat-audio');
    ringtone.play();
}