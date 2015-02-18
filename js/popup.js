chrome.extension.onMessage.addListener(function(request, sender) {
  // if received, get images from source
  if (request.action == "getSource") {
    
    var pge_src = $.parseHTML(request.source);
    var img_src=[];
    
    getImages(pge_src, img_src);
    
    $('#loading').remove();
    if (img_src.length > 0) {
      chrome.storage.sync.set({"src": img_src});
      addNewWindow();
    }
  }
});

function getImages(page, img_src) {
  
  // if images are found
  var images = $('.UFICommentContentBlock', page).find('a[rel="theater"]');
  if (images.length > 0) {

    // extract page images to popup
    var imgCounter = 0;
    images.each( function() {
        
      var zoom = document.createElement('a');
      document.body.appendChild(zoom);

      // add lightbox to images
      var img = document.createElement('img');
      img.src = $(this).find("img").attr('src');
      imgCounter++;
      zoom.innerHTML = '<a href="' + img.src + '"data-lightbox="Image">' + img.outerHTML + '</a>';

      // get download link for image
      var downloader = getDownloader($(this).attr('href'));
      $(this).source = downloader;
      img_src.push(downloader);

      // add download button to images
      var button = document.createElement('button');
      button.type = 'download';
      document.body.appendChild(button);
      button.innerHTML = '<a href="' + downloader + '"download="' + 'Img' + imgCounter + '.jpg' + '">Download</a>';
    });
  }
  
  else { // no images found
    
    // apologize to user
    $('#loading').remove();
    var apologize = document.createElement("div");
    apologize.id = "apologize";
    document.body.appendChild(apologize);
    apologize.innerHTML = '<p>no images found</p>';
  }
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

function addNewWindow() {
  // adds new window button
  var button = document.createElement('button');
  button.type = 'window';
  document.body.appendChild(button);
  button.innerHTML = '<a href="window.html", target ="_blank">Window View</a>';
}

function onWindowLoad() {

  var message = document.querySelector('#loading');

  chrome.tabs.executeScript(null, {
    file: "js/getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      $('#loading').remove();
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });

}

window.onload = onWindowLoad;