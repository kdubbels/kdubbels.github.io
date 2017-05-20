(function ($) {
	"use strict";
	$(function () {
		$('#nav-actions-signin').click(function(e){
			if($(this).hasClass('signout')) return;
			else{
				e.preventDefault();
				classie.toggle( headerSignin, 'active' );
				classie.toggle( headerMain, '_headerSigninActive' );
			}
		});
	});
}(jQuery));
var navsheetOpen = document.getElementById( 'primary-menu' ),
	//navActionsSignin = document.getElementById( 'nav-actions-signin' ),
	headerSignin = document.getElementById( 'header-signin' ),
	headerSigninClose = document.getElementById( 'header-signin-close' ),
	headerSearch = document.getElementById( 'header-search' ),
	headerMain = document.getElementById( 'header-main' ),
	magazineIssueMeta = document.getElementById( 'issue-meta' ),
	magazineIssueDisplayTrigger = document.getElementById( 'issue-display-trigger' )
	;


navsheetOpen.onclick = function() {
	classie.toggle( headerSearch, 'active' );
	classie.toggle( headerSignin, 'active' );
	classie.toggle( headerMain, '_headerSigninActive' );
};
 /*
navActionsSignin.onclick = function(e) {
	e.preventDefault();
	classie.toggle( headerSignin, 'active' );
	classie.toggle( headerMain, '_headerSigninActive' );
};
*/
headerSigninClose.onclick = function() {
	classie.toggle( headerSignin, 'active' );
	classie.toggle( headerMain, '_headerSigninActive' );
};
if(null != magazineIssueDisplayTrigger){
	magazineIssueDisplayTrigger.onclick = function() {
		classie.toggle( magazineIssueMeta, 'active' );
	};
}