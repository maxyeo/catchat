
var lines = [];
var bad = ['http://', 'https://', 'emoticon'];
var imgURL = chrome.extension.getURL("logo-clear.png");
var imgURLselected = chrome.extension.getURL("logo-hover.png");

function getMessages() {
	console.log('getting messages');
	lines = $('._52mr');
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
}

function filterMessages() {
	console.log('filter messages' + lines.length);
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
}

function implantButton() {
	console.log('implanting');

	var buttons = $('._4rv4');
	var body = $('body');
	var catLogo = '<li><a class="catbutton" title="CatChat, create a cat meme" style="background-image: url(' + imgURL + ')"></a></li>';
	var popup = '<div id="catPopUp" class="hidden_elem"></div>';

	buttons.prepend(catLogo);
	body.append(popup);

	$('#catPopUp').load(chrome.extension.getURL("popup.html"));
}

function popUp() {
	$('#catPopUp').removeClass('hidden_elem');
	$('.uiContextualLayerPositioner').addClass('hidden_elem');
	$('a.catbutton').css('background-image', 'url(' + imgURLselected + ')');
	$('._30yy._yht').removeClass('open');
}

function popDown() {
	if (!$('#catPopUp').hasClass('hidden_elem')) {
		$('#catPopUp').addClass('hidden_elem');
		$('a.catbutton').css('background-image', 'url(' + imgURL + ')');
	}
}

function clickCatButton() {
	if ($('#catPopUp').hasClass('hidden_elem')) {
		popUp();
	} else {
		popDown();
	}
}

$( window ).load(function() {

	console.log('inside job loaded');
	implantButton();

	$('a.catbutton').click(clickCatButton);
	$('#catPopUp, a.catbutton').click(function(e) { e.stopPropagation(); });
	$('body').click(function() { popDown() });

});
