chrome.extension.onMessage.addListener(function(request, sender) {
  // if received, get images from source
  if (request.action == "getSource") {
    var source = $.parseHTML(request.source);
    getImages(source);
    $('#loading').remove();

    // adds new window button
    var button = document.createElement('button');
    button.type = 'window';
    button.appendChild(document.createTextNode('Window'));
    document.body.appendChild(button);
    button.innerHTML = '<a href="popup.html", target ="_blank">Window View</a>';
  }
});

function getImages(Page) {
  
  // extracts page images to popup
  var imgCounter = 0;
  $('.UFICommentContentBlock', Page).find('a[rel="theater"]').each( function() {
      
      var zoom = document.createElement('a');
      document.body.appendChild(zoom);

      // adds lightbox to images
      var img = document.createElement('img');
      img.src = $(this).find("img").attr('src');
      imgCounter++;
      zoom.innerHTML = '<a href="' + img.src + '"data-lightbox="Image">' + img.outerHTML + '</a>';

      // gets download link for image
      var downloader = getDownloader($(this).attr('href'));

      // adds download button to images
      var button = document.createElement('button');
      button.type = 'download';
      button.appendChild(document.createTextNode('Download'));
      document.body.appendChild(button);
      button.innerHTML = '<a href="' + downloader + '"download="' + 'Img' + imgCounter + '.jpg' + '">Download</a>';
    });
  }

function getDownloader(url) {
  var result = null;
     $.ajax({
        url: url,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        }
     });
     var HTML = $.parseHTML(result);
     var downloader = $('.fbPhotoImage', HTML).attr('src');
     return downloader;
}

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "js/getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });

}

window.onload = onWindowLoad;