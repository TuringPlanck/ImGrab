chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var source = $.parseHTML(request.source);
    getImages(source);
  }
});

//TODO: Implement getImages
function getImages(HTML) {
  
  }

//TODO: Get page source from active Chrome tab
function onWindowLoad() {

}

window.onload = onWindowLoad;