chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getImages") { 
    images = request.source;
    if (images.length > 0) { // images found
      var loading = document.getElementById("loading");
      var img_counter = 0;
      for(i = 0; i < images.length; i++) {

        var link = document.createElement('a');
        img_counter++;

        var display = document.createElement('img');
        display.src = images[i];
        display.className = "image-display";

        // add image to popup
        document.getElementById('display').appendChild(link);
        link.outerHTML = '<a href="' + display.src + '" class="image-link" download="Img_' + img_counter + '".jpg>' + display.outerHTML + '</a>';
      }
      loading.parentNode.removeChild(loading);
      chrome.storage.local.set({"src": images});
      addNewWindow();
    }    
    else { // no images found
      
      var loading = document.getElementById("loading");
      loading.parentNode.removeChild(loading);

      var apologize = document.createElement("div");
      apologize.id = "apologize";
      document.body.appendChild(apologize);
      apologize.innerHTML = '<p>no images found</p>';
    }
  }
});

function addNewWindow() {
  // adds new window button
  var button = document.createElement('div');
  button.type = 'window';
  document.body.appendChild(button);
  button.innerHTML = '<a href="window.html", target ="_blank">Window View</a>';
}

function onWindowLoad() {

  var message = document.querySelector('#loading');

  // inject content script to find images
  chrome.tabs.executeScript(null, {
    file: "/lightbox/js/jquery-1.11.0.min.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
    else {
      chrome.tabs.executeScript(null, {
        file: "js/content.js"
      });
    }
  });
}

window.onload = onWindowLoad;