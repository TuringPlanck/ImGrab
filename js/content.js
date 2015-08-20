var getImages = function(HTML) {

  var img_src, images, imgCounter, downloader;
  img_src = [];
  images = $('.UFICommentContentBlock').find('a[rel="theater"]');

  if (images.length > 0) { // images are found

    imgCounter = 0;
    images.each( function() { 

      // get download link
      downloader = getDownloader($(this).attr('href'));
      img_src.push(downloader);

    });
  }
  return img_src;
}

var getDownloader = function(url) {
  
  var result, HTML, downloader;
  result = null;
  
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'html',
    async: false,
    success: function(data) {
      result = data;
    }
  });

  HTML = $.parseHTML(result);
  downloader = $('.fbPhotoImage', HTML).attr('src');
  return downloader;
}

chrome.extension.sendMessage({
    action: "getImages",
    source: getImages(document)
});