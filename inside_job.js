
var lines = [];
var bad = ['http://', 'https://', 'emoticon'];
var imgURL = chrome.extension.getURL("logo-clear.png");

// function getMessages() {
// 	console.log('getting messages');
// 	lines = $('._52mr');
// 	lines = lines.map(function(element) {
// 		if (element.hasChildNodes()) {
// 			var tags = element.children;
// 			for (i = 0; i < tags.length; i++) {
// 				if (tags[i].tagName == 'SPAN'){
// 					return element.innerText;
// 				}
// 			}
// 		} else {
// 	  		var message = element.innerText;
// 		}
// 	    return message;
// 	});
// }

// function filterMessages() {
// 	console.log('filter messages' + lines.length);
// 	for (var i = 0; i < lines.length;) {
// 		console.log(i + ' ' + lines[i]);
// 		var isBad = false;
// 		for (j = 0; j < bad.length; j++) {
// 			if (lines[i] == null) {
// 				isBad = true;
// 				break;
// 			} else if (lines[i].indexOf(bad[j]) > -1) {
// 				isBad = true;
// 				break;
// 			}
// 		}
// 		if (isBad) {
// 			lines.splice(i, 1);
// 		} else {
// 			++i;
// 		}
// 	}
// }

function implantButton() {
	console.log('implanting');
	var buttons = $('._4rv4');
	buttons.prepend('<li><a class="catbutton"><img id="catButtonImage"></a></li>');
	document.getElementById('catButtonImage').src = imgURL;
}

$( window ).load(function() {
	console.log('inside job loaded');
	implantButton();
});
