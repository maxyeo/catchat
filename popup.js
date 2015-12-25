var allLines = [];

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

chrome.extension.onRequest.addListener(function(lines) {
	console.log('listended');
	for (var index in lines) {
		allLines.push(lines[index]);
	}
	//allLines.sort();
	showLines();
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