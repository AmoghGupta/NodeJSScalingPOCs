

$(document).ready(function(){
  $("form#data").submit(function(e) {
    e.preventDefault();    
    var formData = new FormData(this);
  
    $.ajax({
        xhr: function() {
        var xhr = new window.XMLHttpRequest();
    
        xhr.upload.addEventListener("progress", function(evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            console.log(percentComplete);
    
            if (percentComplete === 100) {
    
            }
    
          }
        }, false);
    
        return xhr;
      },
        url: '/upload',
        type: 'POST',
        data: formData,
        success: function (data) {
            console.log("done");
        },
        cache: false,
        contentType: false,
        processData: false
    });
  });
  
});
