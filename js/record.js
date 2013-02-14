$(document).ready(function() {
	
	recorded = false;
	recording = false;
	
	SC.initialize({
	 client_id: "a176cfbc7deaec78f7c8a37c498634cf",
	 redirect_uri: "http://192.168.1.64/~florianhacker/shareabeat/redirect.html",
	});


  $("#recordbutton").click(function(e){

	$('.controls ol li.red').addClass('pressed');		
	$('#flash-wrapper').fadeOut(200);
	$('.controls p').text('Stop Recording');
	
	console.log("record click: " + recording)
	 
	if(!recording){
		// updateTimer(0);
		  SC.record({
	      start: function(){
			//$('.pcm .guidelines').animate( { top : '-95px'} );
			$('p.micaccess').fadeOut();
			$('p.rapnow').fadeIn();			
			
			$("canvas").fadeIn();
			//$('#drummachine .overlay').fadeIn();
//			$("div.vocals").addClass("recording");
			console.log( $(".controls") )
			$(".controls").addClass("recording");
			recording = true;
	        setRecorderUIState("recording");
			studio.drumMachine.play();	
	      },
	      progress: function(ms, avgPeak){
		//console.log( avgPeak )
		//	updateTimer(ms);
	      }
		});
	}
  });

//  $("#stopbutton").live("click", function(e){
  $(".controls.recording").live("click", function(e){
	
	console.log("recording off clicked");
	if(recording){
		//$('.pcm .guidelines').animate( { top : '-197px'} );
		
		$('p.rapnow').fadeOut();			
		$('p.loadsoundcloud').fadeIn();
		
		$('.controls ol li.red').removeClass('pressed');		

		setRecorderUIState("recorded");
		SC.recordStop();
		e.preventDefault();
		recorded = true;
		recording = false;
		studio.drumMachine.stop();	
		uploadRecord(onRecordUploaded);		
	}
	//$("div.vocals").removeClass("recording");
	$(".controls").removeClass("recording");
  });
	
  function onRecordUploaded(track){
	console.log("recorduploaded");
	console.log(track);
	
	//$('.pcm .guidelines').animate( { top : '-300px'} );
	$('.loadsoundcloud').fadeOut();
	$("#loading").fadeIn();

	
	var t = setInterval(function(){
		
		SC.oEmbed(track.permalink_url, {"show_comments" : "false", "enable_api" : "true"}, function(oembed){
			if( oembed ){
				console.log(oembed);
				clearInterval(t);
				//$(".controls.global").fadeOut();
				//$('.vocals').html(oembed.html);
				player.api_load( track.permalink_url );
				$("#loading").fadeOut();
				$("canvas").fadeOut();
			}
		} )
		
	}, 1000);
  }

	function uploadRecord(cb){
		window.SC.cb = cb;

		var i = { title: "atestrecord", sharing: "public" };

		SC.connect({
	      connected: function(){
				SC.recordUpload( { track : { title: "atestrecord", sharing: "public"} } , function(track){ console.log("upload finished!"); console.log(cb); cb(track) } )
			}
	    });
	}

/*  $("#playbutton").live("click", function(e){
    
	if(recorded || 	!$("div.vocals").hasClass("recording") ){
		updateTimer(0);
	    setRecorderUIState("playing");
	    SC.recordPlay({
	      progress: function(ms){
	        updateTimer(ms);
	      },
	      finished: function(){
	        setRecorderUIState("recorded");
	      }
	    });
	    e.preventDefault();
	}

  }); */




	


  function updateTimer(ms){
    $("#timer").text(SC.Helper.millisecondsToHMS(ms));
  }

  function setRecorderUIState(state){
    // state can be reset, recording, recorded, playing, uploading
    // visibility of buttons is managed via CSS
    $("#recorderUI").attr("class", state);
  }

  function updateWidget(track){
	
	var secret_uri = track.secret_uri;
	console.log(secret_uri);
	
	var params = secret_uri.substring(34, secret_uri.length)
	console.log(params);
	
	//"https://api.soundcloud.com/tracks/33080113?secret_token=s-62kEg"
	//33081820?secret_token=s-K0dvD
	
	console.log( track );
	
	var embedURL = "http://w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/" + params + "&show_artwork=true&secret_url=true";
	console.log(embedURL);
		
	var embedURLencoded = encodeURIComponent(embedURL);
	console.log(embedURLencoded);
	
	console.log( $(".vocals") )
	
	$(".vocals").html("<iframe width='100%' height='166' scrolling='no' frameborder='no' src='" + embedURL + "'></iframe>");
}



$(document).bind('soundcloud:onPlayerReady', function(event, data) {
  	var mediaUri = data.mediaUri,
    mediaId   = data.mediaId,
    flashNode = event.target;
	//console.log("api ready")
	
	player = soundcloud.getPlayer('myPlayer');
	player.api_setVolume(0);
	//console.log(player)
	//player.api_play();
	
});

$('.vocal-volume').change(function(e){
	console.log( $(e.target).val() )
	player.api_setVolume( $(e.target).val() * 100 );
});


soundcloud.addEventListener('onMediaStart', function(player, data) {
  console.log('track started id:' + data.mediaId);	

});

soundcloud.addEventListener('onMediaPlay', function(player, data) {
  console.log('onmediaplay! ... track is playing id:' + data.mediaId);
  if(!playing) studio.drumMachine.play();

  //console.log(data);
});

soundcloud.addEventListener('onMediaPause', function(player, data) {
  console.log('track stopped at:' + player.api_getTrackPosition());
  //console.log(data);
  player.api_seekTo(0);
  player.api_stop();
  studio.drumMachine.stop();
});

soundcloud.addEventListener('onMediaBuffering', function(player, data) {
 // console.log('track loading:' + data.percent + '%');
//	console.log(data);

});

soundcloud.addEventListener('onMediaDoneBuffering', function(player, data) {
 //console.log('track loaded!');
// player.api_seekTo(35);
//console.log(data);
});

soundcloud.addEventListener('onMediaEnd', function(player, data) {
 // console.log('track finished!');
//	console.log(data);
	player.api_seekTo(0);
	player.api_play();
});

soundcloud.addEventListener('onMediaSeek', function(player, data) {
  //console.log('seeking in the track!');
	//console.log(data);
});

soundcloud.addEventListener('onPlayerError', function(player, data) {
//  console.error('track couldnt be loaded!');
//	console.log(data);

});

//var player = soundcloud.getPlayer('myPlayerId');



});