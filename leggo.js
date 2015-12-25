console.log('injected');
var lines = [].slice.apply(document.getElementsByClassName('_3oh-'));
lines = lines.map(function(element) {
    var message = element.innerText;
    return message;
});

// lines.sort();

chrome.extension.sendRequest(lines);