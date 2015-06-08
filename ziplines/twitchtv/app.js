console.log("app.js loaded");

/*
	runs through an array of TwitchTV account names
	shows who's online and shows supplemental detail
	allows user to see offline, online, and all
	(ie filtered tab views)
*/

var nameArray = ["freecodecamp", "storbeck", "MedryBW", "terakilobyte", "habathcx", "RobotCaleb", "comster404", "brunofin", "thomasballinger", "noobs2ninjas", "beohoff"];

$(function(){
	
	// populates the page with content for each Twich username
	populateAll();

	// click listeners for each of the nav tabs
	$('li#nav-online').click(populateOnline);
	$('li#nav-offline').click(populateOffline);
	$('li#nav-all').click(populateAll);


});

// clears anything in the status div, then passes each array name to 
// a display function
var populateAll = function(){
	$('#status').empty();
	for (var i = 0; i < nameArray.length; i++){
		makeStatusDisplay(nameArray[i]);
	}	
}

var populateOnline = function(){
	$('#status').empty();
	for (var i = 0; i < nameArray.length; i++){
		makeOnlineDisplay(nameArray[i]);
	}	
}

var populateOffline = function(){
	$('#status').empty();
	for (var i = 0; i < nameArray.length; i++){
		makeOfflineDisplay(nameArray[i]);
	}	
}

// takes a channel name, makes HTML for it, runs an AJAX call & updates view accordingly
var makeStatusDisplay = function(channelName){
	var htmlString = '<div class="status-display" id=' + channelName 
	+ '><a href="http://www.twitch.tv/' + channelName + '"><span class="channel-name">' + channelName 
	+ '</span><i class="fa fa-exclamation"></i></a></div>';
	var display = $('#status').append(htmlString);
	var url = 'https://api.twitch.tv/kraken/streams/' + channelName 
	+ '?callback=?&api_version=2';
	$.getJSON(url, function(response){
		if(response.stream){
			$('#' + channelName + " i").removeClass('fa-exclamation').addClass('fa-check');
			console.log(response);
			$('#' + channelName).append("<p>Now playing: " + response.stream.channel.status 
				+ "</p>");
		} 
	})
}

var makeOfflineDisplay = function(channelName){
	var htmlString = '<div class="status-display" id=' + channelName 
	+ '><a href="http://www.twitch.tv/' + channelName + '"><span class="channel-name">' + channelName 
	+ '</span><i class="fa fa-exclamation"></i></a></div>';
	var display = $('#status').append(htmlString);
	var url = 'https://api.twitch.tv/kraken/streams/' + channelName 
	+ '?callback=?&api_version=2';
	$.getJSON(url, function(response){
		if(response.stream){
			$('#status').remove($('#' + channelName));
		} 
	})
}

var makeOnlineDisplay = function(channelName){
	var htmlString = '<div class="status-display" id=' + channelName 
	+ '><a href="http://www.twitch.tv/' + channelName + '"><span class="channel-name">' + channelName 
	+ '</span><i class="fa fa-check"></i></a></div>';
	var url = 'https://api.twitch.tv/kraken/streams/' + channelName 
	+ '?callback=?&api_version=2';
	$.getJSON(url, function(response){
		if(response.stream){
			$('#status').append(htmlString);
			$('#' + channelName).append("<p>Now playing: " + response.stream.channel.status 
				+ "</p>");
		} 
	})
}