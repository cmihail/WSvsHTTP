var webSocketRun = function() {
	ws = new WebSocket("ws://localhost:8888/message");

	ws.onopen = function() {
		alert("open");
	};

	ws.onmessage = function(e) {
		chatDiv.innerHTML += chatDiv.innerHTML + "<br />" + e.data;
	};

	ws.onclose = function() {
		alert("close");
	};
};

var sendMessage = function() {
	ws.send(messageInput.value);
};

var load = function() {
	chatDiv = document.getElementById("chat");
	messageInput = document.getElementById("message");

	if ("WebSocket" in window) {
		webSocketRun();
	} else {
		messageInput.style.display = "none";
		chatDiv.innerHTML = "WebSocket NOT supported";
	}
};

