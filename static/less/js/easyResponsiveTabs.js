        // Bind the tabactivate event to the element this function is called on
        $(this).bind('tabactivate', function (e, currentTab) {
            // Invoke the activate callback function with the currentTab as a parameter
            if (typeof options.activate === 'function') {
                options.activate.call(currentTab, e)
            }
        });

        // Loop through each element this function is called on
        this.each(function () {
            // Set some variables for the current element
            var $respTabs = $(this);
            var $respTabsList = $respTabs.find('ul.resp-tabs-list.' + options.tabidentify);
            var respTabsId = $respTabs.attr('id');
            $respTabs.find('ul.resp-tabs-list.' + options.tabidentify + ' li').addClass('resp-tab-item').addClass(options.tabidentify);
            $respTabs.css({
                'display': 'block',
                'width': jwidth
            });

            // Check if the type option is set to vertical
            if (options.type == 'vertical')
                

            $respTabs.find('.resp-tabs-container.' + options.tabidentify).css('border-color', options.active_content_border_color);
            $respTabs.find('.resp-tabs-container.' + options.tabidentify + ' > div').addClass('resp-tab-content').addClass(options.tabidentify);
            jtab_options();
            //Properties Function
            function jtab_options() {
                // Check if the type option is set to vertical
                if (jtype == vtabs) {
                    $respTabs.addClass('resp-vtabs').addClass(options.tabidentify);
                }
                // Check if the fit option is set to true
                if (jfit == true) {
                    $respTabs.css({ width: '100%', margin: '0px' });
                }
                // Check if the type option is set to accordion
                if (jtype == accord) {
                    $respTabs.addClass('resp-easy-accordion').addClass(options.tabidentify);
                    $respTabs.find('.resp-tabs-list').css('display', 'none');
                }
            }

            // Assign the h3 markup to accordion title
            var $tabItemh3;
            $respTabs.find('.resp-tab-content.' + options.tabidentify).before("<h3 class='resp-accordion " + options.tabidentify + "' role='tab'><span class='resp-arrow'></span></h3>");

            $respTabs.find('.resp-tab-content.' + options.tabidentify).prev("h3").css({
                'background-color': options.inactive_bg,
                'border-color': options.active_border_color
            });

            var itemCount = 0;
            $respTabs.find('.resp-accordion').each(function () {
                $tabItemh3 = $(this);
                var $tabItem = $respTabs.find('.resp-tab-item:eq(' + itemCount + ')');
                var $accItem = $respTabs.find('.resp-accordion:eq(' + itemCount + ')');
                $accItem.append($tabItem.html());
                $accItem.data($tabItem.data());
                $tabItemh3.attr('aria-controls', options.tabidentify + '_tab_item-' + (itemCount));
                itemCount++;
            });

            // Assign the 'aria-controls' to Tab items
            var count = 0,
                $tabContent;
            $respTabs.find('.resp-tab-item').each(function () {
                $tabItem = $(this);
                $tabItem.attr('aria-controls', options.tabidentify + '_tab_item-' + (count));
                $tabItem.attr('role', 'tab');
                $tabItem.css({
                    'background-color': options.inactive_bg,
                    'border-color': 'none'
                });

                // Assign the 'aria-labelledby' attr to tab-content
                var tabcount = 0;
                $respTabs.find('.resp-tab-content.' + options.tabidentify).each(function () {
                    $tabContent = $(this);
                    $tabContent.attr('aria-labelledby', options.tabidentify + '_tab_item-' + (tabcount)).css({
                        'border-color': options.active_border_color
                    });
                    tabcount++;
                });
                count++;
            });

            // Show correct content area
            var tabNum = 0;
            if (hash != '') {
                var matches = hash.match(new RegExp(respTabsId + "([0-9]+)"));
                if (matches !== null && matches.length === 2) {
                    tabNum = parseInt(matches[1], 10) - 1;
                    if (tabNum > count) {
                        tabNum = 0;
                    }
                }
            }

            // Active correct tab
            $($respTabs.find('.resp-tab-item.' + options.tabidentify)[tabNum]).addClass('resp-tab-active').css({
                'background-color': options.activetab_bg,
                'border-color': options.active_border_color
            });

            // Keep closed if option = 'closed' or option is 'accordion' and the element is in accordion mode
            if (options.closed !== true && !(options.closed === 'accordion' && !$respTabsList.is(':visible')) && !(options.closed === 'tabs' && $respTabsList.is(':visible'))) {
                $($respTabs.find('.resp-accordion.' + options.tabidentify)[tabNum]).addClass('resp-tab-active').css({
                    'background-color': options.activetab_bg + ' !important',
                    'border-color': options.active_border_color,
                    'background': 'none'
                });

                $($respTabs.find('.resp-tab-content.' + options.tabidentify)[tabNum]).addClass('resp-tab-content-active').addClass(options.tabidentify).attr('style', 'display:block');
            }
            // Assign proper classes for when tabs mode is activated before making a selection in accordion mode
            else {
                $($respTabs.find('.resp-tab-content.' + options.tabidentify)[tabNum]).addClass('resp-tab-content-active'); //removed resp-tab-content-active
            }

            // Tab Click action function
            $respTabs.find("[role=tab]").each(function () {

                var $currentTab = $(this);
                $currentTab.click(function () {

                    var $currentTab = $(this);
                    var $tabAria = $currentTab.attr('aria-controls');

                    if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
                        $respTabs.find('.resp-tab-content-active.' + options.tabidentify).slideUp('', function () {
                            $(this).addClass('resp-accordion-closed');
                        });
                        $currentTab.removeClass('resp-tab-active').css({
                            'background-color': options.inactive_bg,
                            'border-color': 'none'
                        });
                        return false;
                    }
                    if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
                        $respTabs.find('.resp-tab-active.' + options.tabidentify).removeClass('resp-tab-active').css({
                            'background-color': options.inactive_bg,
                            'border-color': 'none'
                        });
                        $respTabs.find('.resp-tab-content-active.' + options.tabidentify).slideUp().removeClass('resp-tab-content-active resp-accordion-closed');
                        $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active').css({
                            'background-color': options.activetab_bg,
                            'border-color': options.active_border_color
                        });

                        $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + '].' + options.tabidentify).slideDown().addClass('resp-tab-content-active');
                    } else {
                        console.log('here');
                        $respTabs.find('.resp-tab-active.' + options.tabidentify).removeClass('resp-tab-active').css({
                            'background-color': options.inactive_bg,
                            'border-color': 'none'
                        });

                        $respTabs.find('.resp-tab-content-active.' + options.tabidentify).removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');

                        $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active').css({
                            'background-color': options.activetab_bg,
                            'border-color': options.active_border_color
                        });

                        $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + '].' + options.tabidentify).addClass('resp-tab-content-active').attr('style', 'display:block');
                    }
                    // Trigger tab activation event
                    $currentTab.trigger('tabactivate', $currentTab);
