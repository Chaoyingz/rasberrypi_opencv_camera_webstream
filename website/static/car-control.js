$(document).ready(function () {
	var socket = io.connect(
		$SCRIPT_ROOT			
	);

	socket.on('connect', function(){
			
		function keyDownHandler(event){
			if (event.keyCode == 87){
				socket.emit('connect event', {'data': 'w'});			
			} else if(event.keyCode == 65){
				socket.emit('connect event', {'data': 'a'});			
			} else if(event.keyCode == 83){
				socket.emit('connect event', {'data': 's'});			
			} else if(event.keyCode == 68){
				socket.emit('connect event', {'data': 'd'});		
			} else if(event.keyCode == 32){
		    socket.emit('connect event', {'data': 'p'});			
			}	
		};

		function keyUpHandler(event){
			socket.emit('connect event', {'data': 'p'});
		};

	document.addEventListener('keydown', keyDownHandler, false);
	document.addEventListener('keyup', keyUpHandler, false);

	});

});


