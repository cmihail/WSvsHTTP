var load = function() {
	chatDiv = document.getElementById("chat");
	messageInput = document.getElementById("message");
	usernameInput = document.getElementById("username");
	loginDiv = document.getElementById("login");
	mainDiv = document.getElementById("main");
};

var webSocketRun = function() {
	ws = new WebSocket("ws://localhost:8888/message/" + usernameInput.value);

	ws.onmessage = function(e) {
		chatDiv.innerHTML += e.data + "<br />";
	};

	ws.onclose = function(e) {
		// Not best place to handle this, but we don't care.
		mainDiv.style.display = "none";
		loginDiv.style.display = "block";
		alert("Username is taken");
	};
};

var sendMessage = function() {
	ws.send(messageInput.value);
};

var userLogin = function() {
	mainDiv.style.display = "block";
	loginDiv.style.display = "none";

	if ("WebSocket" in window) {
		webSocketRun();
	} else {
		messageInput.style.display = "none";
		chatDiv.innerHTML = "WebSocket NOT supported";
	}
};
