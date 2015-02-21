function onWindowLoad() {
	chrome.storage.sync.get(null, function(result){
		for(i = 0; i < result['src'].length; i++) {

		  var image = document.createElement('a');
	      var display = document.createElement('img');

	      // add image to window
	      document.body.appendChild(image);
	      display.src = result['src'][i];
	      image.outerHTML = '<a href="' + display.src + '"data-lightbox="Image">' + display.outerHTML + '</a>';
		}
	});
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
	var downloader = '<a href="' + imageUrl + '"download="' + 'Img' + imgCounter + '.jpg' + '" class="selected"><img src="' + imageUrl + '"></a>';
	$('#images').append(downloader);
}

window.onload = onWindowLoad;