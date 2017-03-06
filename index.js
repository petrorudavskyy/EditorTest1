
$(document).ready(function() {
  
	var originalImageSrc = $('#editable-image').attr('src');
	var currentImage; // assigned when the Edit button is clicked

	// Image Editor configuration, using Creative CDK IPI
	var csdkImageEditor = new Aviary.Feather({
		apiKey: 'f1c391379dd74ed7b07fd73c2cac413d',
		tools: 'all',
		onSave: function(imageID, newURL) {
			currentImage.src = newURL;
			csdkImageEditor.close();
			console.log(newURL);
      $("#save-image-button").attr("href", newURL);
		},
		onError: function(errorObj) {
			console.log(errorObj.code);
			console.log(errorObj.message);
			console.log(errorObj.args);
		},
		onLoad: function() {
      document.getElementById('edit-image-button').style.display = 'block';
    }	    
	});
  
	// Launch Image Editor
	$('#edit-image-button').click(function() {
		// Get the image to be edited
		currentImage = $('#editable-image')[0];

		csdkImageEditor.launch({
			image: currentImage.id,
			url: currentImage.src
		});
	});

	// Reset
	$('#reset-image-button').click(function() {

		if ($('#editable-image').attr('src') === originalImageSrc) {
			alert('Sorry, nothing to reset');
		}
		else {
			$('#editable-image').attr('src', originalImageSrc);
		}
	});
  // Adding User Image from Url Provided
  $("#url-form").on("submit", function(e){
    var url = $(".url-box").val();
    $("#editable-image").attr("src", url);
    e.preventDefault();
  });
  
  $('.image img').click(function(event) {
		// detect data-id for later
		var id = $(this).data('id');
		// grab src to replace #editable-image
		var src = $(this).attr('src');
		// set #editable-image
		var img = $('#editable-image');

		img.fadeOut('fast', function() {
			$(this).attr({src: src,});
			$(this).fadeIn('fast');
		});
	});
  // Upload image
  $(":file").change(function () {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(this.files[0]);
    }
  });
  function imageIsLoaded(e) {
    $('#editable-image').attr('src', e.target.result);
  };
});