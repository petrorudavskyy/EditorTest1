
$(document).ready(function() {

	var originalImageSrc = $('#editable-image').attr('src');
	var currentImage; // assigned when the Edit button is clicked

	// Image Editor configuration, using Creative CDK IPI
	var csdkImageEditor = new Aviary.Feather({
		apiKey: 'f1c391379dd74ed7b07fd73c2cac413d',
		tools: ['crop','text','effects','resize'],
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
});