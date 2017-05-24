/****************************************************************************************
 * Track clicks from special elements								  					*
 * Arnan de Gans from AJdG Solutions (http://meandmymac.net, http://www.ajdg.net)		*
 * Version: 0.6														   					*
 ****************************************************************************************/
jQuery(document).ready(function() {
	jQuery("a.gofollow").click(function(){
		var tracker = jQuery(this).attr("data-track");
		var debug = jQuery(this).attr("data-debug");

		jQuery.post(
			tracker_url,
			{ track: tracker }
		);

		if(debug == 1) {
			alert('Tracker: ' + tracker + '\n\nTracker must be defined for clicktracking to work.');		
		}
	});
});