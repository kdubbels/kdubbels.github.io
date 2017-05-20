/*!
 * 
 * MemberMouse(TM) (http://www.membermouse.com)
 * (c) MemberMouse, LLC. All rights reserved.
 */
var MM_SocialLoginJS = Class.extend({
	
	
	_constructParams: function(cmd, provider, membershipLevel, redirectUrl, email)
	{
		var params = {"cmd":cmd,"provider":provider};
		if (membershipLevel != undefined)
		{
			params['membershipLevel'] = membershipLevel;
		}
		
		if (redirectUrl != undefined)
		{
			params['redirectUrl'] = redirectUrl;
		}
		
		if (email != undefined)
		{
			params['email'] = email;
		}
		return params;
	},
	
	socialLoginLogin: function(provider, membershipLevel, redirectUrl) 
	{		
		var params = this._constructParams("login",provider,membershipLevel, redirectUrl);		
		//this.nonAjaxPost(socialLoginVars.endpointUrl, params);
		this.redirectAuth(socialLoginVars.endpointUrl, params);
	},
	
	
	socialLoginSignup: function(provider, membershipLevel, redirectUrl)
	{
		var params = this._constructParams("signup",provider,membershipLevel, redirectUrl);		
		//this.nonAjaxPost(socialLoginVars.endpointUrl, params);
		this.redirectAuth(socialLoginVars.endpointUrl, params);
	},
	
	socialLoginSignupPromptForEmail: function(provider, membershipLevel,redirectUrl)
	{
		jQuery("#socialLoginSignupModal").remove();	
		jQuery('<div id="socialLoginSignupModal" style="display:none; cursor: default; padding:10px; line-height:30px;">' + 
			   '<form>Please enter your email address: <br/><input type="text" name="email" style="width:300px;"><br/>' +
			   '<input type="button" id="socialLoginSignupModalOk" value="Continue" ' + 
			   'onClick="javascript:sociallogin_js.socialLoginSignupWithEmail(\'' + provider + '\',\'' + membershipLevel + '\',\'' + redirectUrl + '\');">' + 
			   '<input type="button" id="socialLoginSignupModalCancel" value="Cancel" onClick="javascript:jQuery.unblockUI();">' +
			   '</form></div>').appendTo(jQuery(document.body));
		jQuery.blockUI({ message: jQuery('#socialLoginSignupModal') }); 
		jQuery(".blockMsg").addClass(MemberMouseGlobal.checkoutProcessingMessageCSS);
	},
	
	socialLoginSignupWithEmail: function(provider, membershipLevel, redirectUrl)
	{
		var email = jQuery("#socialLoginSignupModal input[name='email']").val(); //TODO: get email from form; validate
		var params = this._constructParams("signup",provider,membershipLevel, redirectUrl, email);		
		//this.nonAjaxPost(socialLoginVars.endpointUrl, params);
		this.redirectAuth(socialLoginVars.endpointUrl, params);
	},
	
	
	redirectAuth: function(destinationUrl, params)
	{
		var first = true;
		var urlComponent = "";
		var finalUrl = "";
		
		for (var param in params)
		{
			if (!first)
			{
				urlComponent += "&";
			}
			else
			{
				first = false;
			}
			urlComponent += (param + "=" + encodeURIComponent(params[param]));
		}
		finalUrl = destinationUrl + ((destinationUrl.indexOf('?') === -1)?"?":"&") + urlComponent;
		location.href = finalUrl;
	},
	
	
	nonAjaxPost: function(destinationUrl, params)
	{
		var form = jQuery('<form action="' + destinationUrl +'" method="POST"/>');
		if ((params != undefined) && (typeof params === 'object') && (params != null))
		{
			for (var paramName in params)
			{
				form.append(jQuery('<input type="hidden" name="' + paramName + '" value="' + params[paramName] + '">'));
			}
		}
		form.appendTo(jQuery(document.body)).submit();
	}
	
});

var sociallogin_js = new MM_SocialLoginJS();