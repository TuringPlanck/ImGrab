function getImages(HTML) {

  var img_src = [];
  var images = $('.UFICommentContentBlock').find('a[rel="theater"]');

  if (images.length > 0) { // images are found

    var imgCounter = 0;
    images.each( function() { 

      // get download link
      var downloader = getDownloader($(this).attr('href'));
      img_src.push(downloader);

    });
  }
  return img_src;
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

chrome.extension.sendMessage({
    action: "getImages",
    source: getImages(document)
});