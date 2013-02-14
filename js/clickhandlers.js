/**
	DRUMMACHINE CLICK HANDLERS
*/

$(document).ready(function(){
	
	var _this = this;
	SC.oEmbed("http://soundcloud.com/florianhacker/atestrecord-32", {"enableAPI" : "true"}, function(oembed){
		console.log(oembed);
		$('.vocals').html(oembed.html);
	} )
	
	$('#playbutton').click(function(event){
		console.log("clicked")
		if( !recording && !recorded && !playing ){
			studio.drumMachine.play();	
			console.log("playx");
		}
	});


	//catch fb request and addparameters
	$("#fb").click(function(event){
		
		event.preventDefault();
		
		if(recorded){
			console.log(this.uploadRecord)
			console.log("call method");
//			_this.uploadRecord(shareOnFacebook);
			console.log("after call")
			
			/*function(track){
				updateWidget(track);
				$("#uploadStatus").html("Uploaded: <a href='" + track.permalink_url + "'>" + track.permalink_url + "</a>");
	        }*/
		}
		else{
			shareOnFacebook();
		}
		
	})
	
	function shareOnFacebook(track){

		if(track){
			console.log(track);
			
			console.log(track.permalink_url)
			

		}
		else{
			var u = encodeURIComponent( document.URL + "?" );
			var c = JSON.stringify(config);
			var t = encodeURIComponent("shareabeat");
			window.open( "http://www.facebook.com/sharer.php?u=" + u + "c=" + c + "&t=" + t, "_blank");
		}
		

	}
	
});