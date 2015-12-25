var allLines = [];

// prints chat lines to popup
function showLines() {
	console.log('printing');
	var arena = document.getElementById('picture');
	while (arena.children.length > 1) {
		arena.removeChild(arena.children[arena.children.length - 1]);
	}
	for (var i = 0; i < allLines.length; ++i) {
		var row = document.createElement('P');
		row.innerText = allLines[i];
		arena.appendChild(row);
	}
}

// gets a picture from thecatapi
function generate() {
	var index = Math.floor(Math.random() * allLines.length);
	var arena = document.getElementById('picture');
	arena.innerHTML = "";

	var row = document.createElement('P');
	row.innerText = allLines[index];
	
	var image = document.createElement('IMG');
	image.src = 'http://thecatapi.com/api/images/get?format=src&' + new Date().getTime();
	
	arena.appendChild(row);
	arena.appendChild(image);
}

chrome.extension.onRequest.addListener(function(lines) {
	console.log('listended');
	for (var index in lines) {
		allLines.push(lines[index]);
	}
	//showLines();
	generate();
});

document.getElementById('generate').addEventListener("click", function(lines) {
	generate();
});

window.onload = function() {
	console.log('onload');
	chrome.windows.getCurrent(function (currentWindow) {
		chrome.tabs.query({active: true, windowId: currentWindow.id},
						function(activeTabs) {
			chrome.tabs.executeScript(
				activeTabs[0].id, {file: 'leggo.js', allFrames: true});
		});
	});
};