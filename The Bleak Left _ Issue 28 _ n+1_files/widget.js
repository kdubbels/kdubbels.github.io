(function($) {

    var $galleryCallout;
    var $galleryContainer;
    var $galleryCarousel;
    var currentScroll;

    get_issue_gallery();

    function get_issue_gallery() {
        if ($('body.issue-landing').length) {
            var galleryApiUrl = galleryAPI.homeurl + '/api/galleries/' + galleryAPI.issue.post_name;
            $.get(galleryApiUrl)
                .done(function (data) {
                    if (data.count) {
                        // Setup the gallery
                        prepareCalloutHtml(data.items[0]);
                        prepareGalleryHtml();
                        setupGallery(data.items);
                        setupEvents();
                    }
                })
                .fail(function (status) {
                    console.log(status);
                });
        }
    }

    function prepareCalloutHtml(item) {
        // Create container to hold link, then hide container
        $galleryCallout = $(
            '<div class="issue-gallery-callout" style="background-image:url(' + item.sizes['medium'].url + ');">' +
            '<a class="button" href="javascript:void(0)">' +
            'View a gallery of art for ' + galleryAPI.issue.post_title +
            '</a>\n' +
            '</div>\n'
        ).hide();

        // Append the container after the 1st section (currently: Intellectual Situation)
        $('.section-container').eq(0).after($galleryCallout.fadeIn());
    }

    function prepareGalleryHtml() {
        // Gallery Container
        $galleryContainer = $(
            '<div id="issue-gallery-container">\n' +
            '<div class="content-wrapper">\n' +
            '<div class="main-content">\n' +
            '<a title="Next" id="issue-gallery-next" class="issue-gallery-nav next" href="#"><img alt="Next" src="' + galleryAPI.homeurl +'/wp-content/themes/n1_durable_goods/img/r-white.png"></a>\n' +
            '<a title="Previous" id="issue-gallery-prev" class="issue-gallery-nav prev" href="#"><img alt="Prev" src="' + galleryAPI.homeurl +'/wp-content/themes/n1_durable_goods/img/l-white.png"></a>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>\n');
    }

    function setupGallery(items) {
        $galleryCarousel = $('<div id="issue-gallery-carousel" class="cf"></div>\n');

        for (var i in items) {
            if (items.hasOwnProperty(i)) {
                var artist = items[i].alt.length ? '<div class="artwork-artist">' + items[i].alt + '</div>' : '';
                var title = items[i].title.length ? '<span class="artwork-title">' + items[i].title + '.</span>' : '';
                var description = items[i].caption.length ? '<span class="artwork-description">' + items[i].caption + '</span>' : '';
                var bio = items[i].description.length ? '<div class="artwork-bio">' + items[i].description + '</div>' : '';
                var article = items[i].article_title.length ? '<div class="artwork-article">Appears with <a href="' + items[i].article_url + '">' + items[i].article_title + '</a></div>' : '';
                var img = items[i].sizes.hasOwnProperty('full') ? '<img src="' + items[i].sizes['full'].url + '">' : '';
            }

            var itemHtml =
                '<div class="issue-gallery-item">\n' +
                '<div class="issue-gallery-info">\n' +
                '<div class="issue-gallery-header cf">\n' +
                '<span class="art-from">Art from </span>\n' +
                '<span class="issue-title">' + galleryAPI.issue.post_title + ': ' + galleryAPI.issue.issue_name + '</span>\n' +
                '<a class="issue-gallery-close" class="button" href="javascript:void(0)">Return to Issue</a>\n' +
                '</div>\n' +
                artist + '\n' +
                '<div class="artwork">\n' +
                title + '\n' +
                description + '\n' +
                '</div>\n' +
                bio + '\n' +
                article + '\n' +
                '</div>\n' +
                '<div class="issue-gallery-image">\n' +
                img + '\n' +
                '</div>\n' +
                '</div>\n';

            $galleryCarousel.append(itemHtml);
        }

        $galleryContainer.find('.main-content').append($galleryCarousel);
    }

    /**
     * Setup callout click event. Init carousel. Setup gallery close events.
     */
    function setupEvents() {
        // Scroll the gallery to the top, then to origin when closed.
        $('.issue-gallery-callout').on('click', function () {
            currentScroll = document.documentElement.scrollTop; // could be bottom of header?
            $('html').addClass('gallery-active');
            $galleryContainer.insertAfter('#header-main').slideDown();
            $galleryCarousel.carouFredSel({
                responsive: true,
                width: '100%',
                scroll: {
                    items: 1,
                    fx : 'fade',
                    duration: 500
                },
                items: {
                    visible: 1
                },
                auto: {
                    play: false
                },
                prev: {
                    button: '#issue-gallery-prev',
                    key: 'left'
                },
                next: {
                    button: '#issue-gallery-next',
                    key: 'right'
                }
            });
            document.documentElement.scrollTop = $('#issue-gallery-container').find('.main-content').scrollTop();
            $('.issue-gallery-close').on('click', function () {
                $galleryContainer.slideUp(function () {
                    $('.gallery-active').removeClass('gallery-active');
                    document.documentElement.scrollTop = currentScroll; // could be $galleryCallout position?
                });
            });
        });
    }
})(jQuery);