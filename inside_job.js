
var lines = [];
var bad = ['http://', 'https://', 'emoticon'];
var imgURL = chrome.extension.getURL("img/logo-clear.png");
var imgURLselected = chrome.extension.getURL("img/logo-hover.png");
var image = '';

function getMessages() {
	console.log('getting messages');
	lines = [].slice.apply(document.getElementsByClassName('_52mr'));
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
	console.log('filter messages: ' + lines.length + ' messages found.');
	for (var i = 0; i < lines.length;) {
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

function getText() {
	getMessages();
	filterMessages();
	var index = Math.floor(Math.random() * lines.length);
	return lines[index];
}

function generate() {
	chrome.runtime.sendMessage({greeting: 'hello'}, function(response) {
		image = response.url;

		console.log('generating');
		
		var catBody = $('#catBody');
		catBody.html('');

		var catImage = '<div id="picture" style="background-image: url(' + image + ')">';
		catBody.append(catImage);

		var catText = '<h3>' + getText() + '</h2>';
		catBody.append(catText);

		window.setTimeout(function() {
			console.log('making download link');
			generateDownload();
		}, 200);
	});
}

function generateDownload() {
	chrome.runtime.sendMessage({greeting: 'itsme'}, function(response) {
		var canvas = document.createElement('canvas');
		canvas.width = 275 * window.devicePixelRatio;
		canvas.height = 275 * window.devicePixelRatio;
      	
      	var context = canvas.getContext('2d');
      	var imageObject = new Image();
      	
      	imageObject.src = response.url;

      	var catImagePosition = document.getElementById('catBody').getBoundingClientRect();

     	imageObject.onload = function() {

			context.drawImage(imageObject, catImagePosition.left * window.devicePixelRatio, catImagePosition.top * window.devicePixelRatio, catImagePosition.width * window.devicePixelRatio, catImagePosition.height * window.devicePixelRatio, 0, 0, 275 * window.devicePixelRatio, 275 * window.devicePixelRatio);
		  	$('#download').attr('href', canvas.toDataURL());
      	};
	});
}

function implantButton() {
	console.log('implanting');

	var buttons = $('._4rv4');
	var body = $('body');
	var catLogo = '<li><a class="catbutton" title="CatChat, create a cat meme" style="background-image: url(' + imgURL + ')"></a></li>';
	var popup = '<div id="catPopUp" class="hidden_elem"></div>';

	buttons.prepend(catLogo);
	body.append(popup);

	$('#catPopUp').load(chrome.extension.getURL("popup.html"), function() {
		$('#generate').click(generate);
	});
}

function position() {
	var leftOffset = $('a.catbutton').offset().left - 247;
	$('#catPopUp').css('left', leftOffset);
}

function popUp() {
	$('#catPopUp').removeClass('hidden_elem');
	$('.uiContextualLayerPositioner').addClass('hidden_elem');
	$('a.catbutton').css('background-image', 'url(' + imgURLselected + ')');
	$('._30yy._yht').removeClass('open');
	position();
	generate();
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

$( window ).resize(function() {

	position();

});

