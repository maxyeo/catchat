var lines = [].slice.apply(document.getElementsByClassName('_52mr'));
lines = lines.map(function(element) {
	if (element.hasChildNodes()) {
		var tags = element.children;
		for (i = 0; i < tags.length; i++) {
			if (tags[i].tagName == 'SPAN'){
				return element.innerText;
			}
		}
	} else {
  		var message = element.innerText;
	}
    return message;
});

var bad = ['http://', 'https://', 'emoticon'];
for (var i = 0; i < lines.length;) {
	console.log(i + ' ' + lines[i]);
	var isBad = false;
	for (j = 0; j < bad.length; j++) {
		if (lines[i] == null) {
			isBad = true;
			break;
		} else if (lines[i].indexOf(bad[j]) > -1) {
			isBad = true;
			break;
		}
	}
	if (isBad) {
		lines.splice(i, 1);
	} else {
		++i;
	}
}

// names of people in group chat, i think
//var names = [].slice.apply(document.getElementsByClassName('_364g'));
// names = names.map(function(element) {
//     var message = element.innerText;
//     return message;
// });

// lines.sort();

chrome.extension.sendRequest(lines);