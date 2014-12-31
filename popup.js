chrome.extension.onMessage.addListener(function(request, sender) {
  // if received, get images from source
  if (request.action == "getSource") {
    var source = $.parseHTML(request.source);
    getImages(source);
  }
});

function getImages(HTML) {
  
  // extracts page images to popup
  var imgCounter = 0;
  $('.UFICommentContentBlock', HTML).find('a[rel="theater"]').find("img").each( function() {
      
      var zoom = document.createElement('a');
      document.body.appendChild(zoom);

      // adds lightbox to images
      var img = document.createElement('img');
      img.src = $(this).attr('src');
      imgCounter++;
      zoom.innerHTML = '<a href="' + img.src + '"data-lightbox="Image">' + img.outerHTML + '</a>';

      // adds download button to images
      var button = document.createElement('button');
      button.type = 'download';
      button.appendChild(document.createTextNode('Download'));
      document.body.appendChild(button);
      button.innerHTML = '<a href="' + img.src + '"download="' + 'Img' + imgCounter + '.jpg' + '">Download</a>';
    });
  }

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });

}

window.onload = onWindowLoad;