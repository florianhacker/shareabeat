$(document).ready(function(){
			
	var sounds = [
	"audio/kick/1.wav", "audio/kick/2.wav", "audio/kick/7.wav", "audio/kick/5.wav", "audio/kick/6.wav",
	"audio/snare/1.wav", "audio/snare/2.wav", "audio/snare/3.wav", "audio/snare/4.wav", "audio/snare/5.wav", 
	"audio/hihat/1.wav", "audio/hihat/2.wav",  
	"audio/crash/1.wav", "audio/crash/2.wav", "audio/crash/3.wav", "audio/crash/4.wav", "audio/crash/5.wav",
	"audio/ride/1.wav", "audio/ride/2.wav", "audio/ride/3.wav",
	"audio/tom/1.wav", "audio/tom/2.wav", "audio/tom/3.wav", "audio/tom/4.wav", "audio/tom/5.wav"
	];	
	
	/**
		LOAD USER PATTERN
	*/
	
	config = {}; //global
	var configParameters = gup("c");
		
	if( configParameters == ""){
		console.log("NO USER PATTERN")
		// setup init pattern
		config.segments = [5, 5, 2, 5, 3, 5]; //proportioning sounds into channels
		config.volume = [0.8, 0.8, 0, 0, 0, 0];
		config.activeSamples = [1, 3, 1, 1, 0, 3];

		var kick = [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0];
		var snare = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
		var hihat = [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1];
		var crash = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var ride = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var tom = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		config.sequence = [kick, snare, hihat, crash, ride, tom];

	}
	else{
		// setup USER pattern
		console.log("USER PATTERN")
		configParameters = decodeURIComponent( configParameters );
		console.log( configParameters );	
		config = JSON.parse( configParameters );
		console.log(config.sequence);
	}
	
	
	/**
		INIT VIEW / PATTERN / DRUMMACHINE
	*/
		
	$('.sampleselect select').empty();
	$('.sampleselect select').html("<option value='1'>No Sample</option>");
		
	var drumtypes = ["Kick ", "Snare ", "Hi-Hat ", "Crash ", "Ride ", "Tom "];
	for(var i = 0; i<6; i++){
				
		$('input.volume').eq(i).val( config.volume[i] );
		$('input.volume').eq(i).trigger('change');
		$('.sampleselect select').eq(i).empty();	
		
		for(var j=0; j<config.segments[i]; j++){
			
			var opt = "";
			
			if( config.activeSamples[i] == j){
				opt = "<option selected='selected' value='" + j + "'>" + drumtypes[i] + (j+1) + "</option>";
			}
			else{
				opt = "<option value='" + j + "'>" + drumtypes[i] + (j+1) + "</option>";	
			}
			
			$('.sampleselect select').eq(i).append(opt);		
		}
	}
	
	/**
		INITALISE DRUMMACHINE / STUDIO.JS
	*/
	
	//global
	studio = new audio.Studio();

	studio.installDrumMachine( sounds, config, onDrumMachineReady );	

	function onDrumMachineReady()
	{				
		studio.drumMachine.connectIO( null, studio.studioMixer.channels[0] ); 
	}
	
});