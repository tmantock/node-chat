var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

// Update h1 tag
$('.room-title').text(room);

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = $('.messages');
	var $message = $('<li class="list-group-item"></li>');
	var messageBody = document.getElementById("messages");


	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
	messageBody.scrollTop = messageBody.scrollHeight;
});

// Handles submitting of new message
var $form = $('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	if(textRegex($message.val())){
		$('.text-help').html("");
		socket.emit('message', {
			name: name,
			text: $message.val()
		});

		$message.val('');
	} else {
		$('.text-help').html("Please enter a valid message");
	}

	
});

function textRegex (string) {
	var exp = /^[a-z 0-9 ,.'%$#@!"&-]+$/i;
	var test = exp.test(string);
	console.log(test);
	return test;
}
