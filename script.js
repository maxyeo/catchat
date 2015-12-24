var strings =  '';

document.getElementById('leggo').onclick=function(){
	scrape();
};

function scrape() {
	strings = document.getElementsByClassName('_3oh-');
	console.log(strings);
};