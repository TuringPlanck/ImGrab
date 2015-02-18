function onWindowLoad() {
	chrome.storage.sync.get(null, function(result){
		var imgCounter = 0;
		for(i = 0; i < result["src"].length; i++) {

		  var image = document.createElement('a');
	      var display = document.createElement('img');
	      imgCounter++;

	      // add image to window
	      document.body.appendChild(image);
	      display.src = result["src"][i];
	      image.outerHTML = '<a href="' + display.src + '"data-lightbox="Image">' + display.outerHTML + '</a>';

	      // add download button to images
	      var button = document.createElement('button');
	      button.type = 'download';
	      document.body.appendChild(button);
	      button.innerHTML = '<a href="' + display.src + '"download="' + 'Img' + imgCounter + '.jpg' + '">Download</a>';
		}
	});
}

window.onload = onWindowLoad;