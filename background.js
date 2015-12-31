var index, image;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.greeting == 'hello') {

			var catImageURL = 'http://thecatapi.com/api/images/get?format=html&' + new Date().getTime();

			$.ajax({
				url: catImageURL
			}).done(function(data) {
				index = data.indexOf('src=');
				image = data.substring(index + 5, data.length - 7);
				console.log(image);
			});
			
			sendResponse({url: image});

		}
		if (request.greeting == 'itsme') {
 		    chrome.tabs.captureVisibleTab( null, {}, function(dataUrl){
        		sendResponse({url:dataUrl});
        	});
    		return true;
		}
	}
);