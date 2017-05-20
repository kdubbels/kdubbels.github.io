function popitup(url) {
	newwindow=window.open(url,'tw','height=400,width=500');
	if (window.focus) {newwindow.focus()}
	return false;
}

(function ($) {
	"use strict";
	$(function () {
		$('.subscribe-module .mm-form input[type=radio]').change(function(){
			$(this).parents('.mm-form').find('a.mm-form-submit').attr('href', $(this).attr('value'));
		});
		if($('#issue-slider').length){
		//	Responsive layout, resizing the items
			$('#issue-slider').carouFredSel({
				circular: true,
				infinite: true,
				auto: false,
				responsive: true,
				width: '90%',
				//scroll: "page",
				prev: '#prev3',
				next: '#next3',
				items: {
					width: 120,
					height: 185,	//	optionally resize item-height
					visible: {
						min: 5,
						max: 8
					}
				}
			});
		}
	});
}(jQuery));