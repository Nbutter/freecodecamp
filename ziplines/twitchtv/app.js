console.log("app.js loaded");

var nameArray = ["freecodecamp", "storbeck", "MedryBW", "terakilobyte", "habathcx", "RobotCaleb", "comster404", "brunofin", "thomasballinger", "noobs2ninjas", "beohoff"];

$(function(){
	for (var i = 0; i < nameArray.length; i++){
		makeStatusDisplay(nameArray[i]);
	}	
});

var makeStatusDisplay = function(channelName){
	var htmlString = '<div class="status-display" id=' + channelName 
	+ '><a href="http://www.twitch.tv/' + channelName + '"><span class="channel-name">' + channelName 
	+ '</span><i class="fa fa-exclamation"></i></a></div>';
	var display = $('#status').append(htmlString);
	var url = 'https://api.twitch.tv/kraken/streams/' + channelName + '?callback=?&api_version=2';
	$.getJSON(url, function(response){
		if(response.stream){
			$('#' + channelName + " i").removeClass('fa-exclamation').addClass('fa-check');
			$('#' + channelName).append("<p>Now playing: " + response.stream.game + "</p>");
		} 
	})
}