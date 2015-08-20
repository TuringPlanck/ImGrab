function onWindowLoad() {
	// pull images from chrome storage
	chrome.storage.local.get(null, function(result){
		var i, lightbox, display;
		for(i = 0; i < result['src'].length; i++) {

		  lightbox = document.createElement('a');
	      
	      display = document.createElement('img');
	      display.src = result['src'][i];
	      display.className = "image-display";

	      // add image to window
	      document.getElementById('display').appendChild(lightbox);
	      lightbox.outerHTML = '<a href="' + display.src + '" class="image-link" data-lightbox="Image">' + display.outerHTML + '</a>';
		}
	});
	
	// enable image drop zone
	var dropZone = document.getElementById('dropZone');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', drop, false);
	$('#downloadAll').click(function() {
      $('a.selected').children().each(function() {
        $(this).trigger( "click" );
      });
  	});
}

var handleDragOver = function (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; 
}

var imgCounter = 0;
var drop = function(evt) {
	
	var imageUrl, link, display, downloader;

	evt.stopPropagation();
	evt.preventDefault(); 
	imgCounter++;
	imageUrl = evt.dataTransfer.getData('URL');
	link = '<a href="' + imageUrl + '"download="' + 'Img_' + imgCounter + '.jpg' + '" class="selected">';
	display = '<img src="' + imageUrl + '" class="img-drop">';
	downloader = link + display + '</a>';
	$('#images').append(downloader);
}

window.onload = onWindowLoad;