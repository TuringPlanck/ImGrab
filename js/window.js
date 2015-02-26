function onWindowLoad() {
	// pull images from chrome storage
	chrome.storage.local.get(null, function(result){
		for(i = 0; i < result['src'].length; i++) {

		  var lightbox = document.createElement('a');
	      
	      var display = document.createElement('img');
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
      $('a.selected > img').each(function() {
        $(this).trigger( "click" );
      });
  	});
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; 
}

var imgCounter = 0;
function drop(evt) {
	evt.stopPropagation();
	evt.preventDefault(); 
	imgCounter++;
	var imageUrl = evt.dataTransfer.getData('URL');
	var link = '<a href="' + imageUrl + '"download="' + 'Img_' + imgCounter + '.jpg' + '" class="selected">';
	var display = '<img src="' + imageUrl + '" class="img-drop">';
	var downloader = link + display + '</a>';
	$('#images').append(downloader);
}

window.onload = onWindowLoad;