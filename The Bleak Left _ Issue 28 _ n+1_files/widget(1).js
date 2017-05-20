(function ($) {
    "use strict";

    $('.infinite').each(function () {
        var $self = $(this);
        if ($self.data('paged') > $self.data('totalpages')) {
            $self.hide();
        }
    });
    $('.infinite').click(function (e) {
        e.preventDefault();
        var $self = $(this);
        var paged = $self.data('paged');
        paged++;
        $('.spinner').slideDown();
        $self.hide();
        jQuery.ajax({
            type: "post",
            dataType: "json",
            url: modmulti.ajaxurl,
            data: {
                action: "get_multi_posts",
                flavor: $self.data('flavor'),
                number: $self.data('number'),
                ad_after: $self.data('ad_after'),
                newsletter_after: $self.data('newsletter_after'),
                social_after: $self.data('social_after'),
                order: $self.data('order'),
                orderby: $self.data('orderby'),
                taxonomy: $self.data('taxonomy'),
                term: $self.data('term'),
                paged: paged
            },
            success: function (response) {
                if (response.type == 'success') {
                    $('.spinner').slideUp();
                    $(response.content).insertBefore($self.parent());
                    var totalpages = parseInt($self.data('totalpages'));
                    console.log("paged: " + paged);
                    console.log("totalpages: " + totalpages);
                    $self.data('paged', paged);
                    if (paged > totalpages) {
                        $self.hide();
                    } else {
                        $self.show();
                    }
                } else if (response.type == 'fail') {
                    $('.spinner').slideUp();
                    $(response.content).insertAfter($('.spinner'));
                    $self.hide();
                }

            }
        });
    });

})(jQuery);