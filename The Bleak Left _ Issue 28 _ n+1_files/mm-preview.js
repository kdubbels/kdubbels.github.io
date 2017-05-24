/*!
 * 
 * MemberMouse(TM) (http://www.membermouse.com)
 * (c) MemberMouse, LLC. All rights reserved.
 */
var MM_Preview = MM_Core.extend({
	savePreview:function()
	{
      var form_obj = new MM_Form('mm-preview-settings-bar');
      var values = form_obj.getFields();
      values.member_type_id = jQuery("#mm-preview-member_type").val();
      values.mm_action = "savePreview";
      values.preview_access_tags = this.getAccessTagsFromField();
      values.mm_preview_days = jQuery("#mm-preview-days").val();
      
      var module = "MM_PreviewView";
      var method = "performAction";
      var action = 'module-handle';
	  jQuery("#mm-preview_btn").attr('disabled','disabled');
      
      var ajax = new MM_Ajax(false, module, action, method);
      ajax.send(values, false, 'mmPreviewJs','handleSave');
	},
	
	enableChangeButton: function()
	{
		jQuery("#mm-preview_btn").removeAttr('disabled');
	},
	
	hideNonMemberItems: function()
	{
		  var memberTypeId = jQuery("#mm-preview-member_type").val();
		  if(memberTypeId=="none")
		  {
			  jQuery("#mm-preview_btn").removeAttr("disabled");
			  jQuery("#mm-show-at").hide();
			  return true;
		  }
		  return false;
	},
	
	changeMembershipLevel: function()
	{
	  var memberTypeId = jQuery("#mm-preview-member_type").val();
	
	  if(memberTypeId=="none"){
		  jQuery("#mm-preview_btn").removeAttr("disabled");
		  jQuery("#mm-show-at").hide();
		  jQuery("#mm-preview-access-tags").hide();
		  return true;
	  }
	  else if(memberTypeId==""){
		jQuery("#mm-show-at").show();
		return false;  
	  }
	  else{
		  jQuery("#mm-show-at").show();
	  }
	  
      var form_obj = new MM_Form('mm-preview-settings-bar');
      var values = form_obj.getFields();
      values.member_type_id = memberTypeId;
      values.mm_action = "previewChangeMembership";
      
      var module = "MM_PreviewView";
      var method = "performAction";
      var action = 'module-handle';
      
      var ajax = new MM_Ajax(false, module, action, method);
      ajax.useLoader=false;
      ajax.send(values, false, 'mmPreviewJs','handleUpdate');
	  
	},
	
	changeBundles: function()
	{
      var form_obj = new MM_Form('mm-preview-settings-bar');
      var values = form_obj.getFields();
      values.member_type_id = jQuery("#mm-preview-member_type").val();
      values.mm_action = "previewChangeBundles";
      values.preview_access_tags = this.getAccessTagsFromField();
      
      var module = "MM_PreviewView";
      var method = "performAction";
      var action = 'module-handle';
      
      var ajax = new MM_Ajax(false, module, action, method);
      ajax.useLoader=false;
      ajax.send(values, false, 'mmPreviewJs','handleUpdate');
	},
	
	getAccessTagsFromField: function()
	{
		var preview_access_tags = "";
		var count = 0;
	    jQuery("select[name=preview_access_tags\\[\\]] :selected").each(function()
	    {
	    	preview_access_tags += jQuery(this).val()+",";
	    	count++;
	    });
	    jQuery("#mm-applied-tag-count").html(count);
	    return preview_access_tags;
	},
	
	startPreview: function()
	{
		document.location.reload();
	},
	
	showAccessTags: function()
	{
		if(jQuery("#mm-preview-access-tags").is(":hidden"))
		{
			jQuery("#mm-preview-access-tags").show();
		}
		else
		{
			jQuery("#mm-preview-access-tags").hide();
		}
	},
	
	handleSave: function(data)
	{
		if(data.type=='error')
		{
			alert(data.message);
		}
		else
		{
			document.location.reload();
		}
	},
	
	handleUpdate: function(data)
	{
		if(data.type=='error')
		{
			alert(data.message);
		}
		else
		{
			this.enableChangeButton();
			if(data.message.access_tags != undefined)
			{
		        jQuery("#preview_access_tags").find("option").remove().end().append(data.message.access_tags);
			}
			if(data.message.days != undefined)
			{
		        jQuery("#mm-preview-days").find("option").remove().end().append(data.message.days);
			}
		}
	},
	
});

var mmPreviewJs = new MM_Preview("MM_Preview", "Preview");