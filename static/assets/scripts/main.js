var APP = APP || {}; //Global Namespace

// Some Global methods and properties available with APP Object.
(function($, window, document, undefined) {
    $.extend(APP, {
        eventTarget: $('body')
    });
})(jQuery, this, this.document);

(function($, window, document, undefined) {
    APP.subModules = (function() {
        function _subModules() {
            this.init = function() {
                expendableColumn('mdl-card');
            };
            this.pluginInit = function() {

            };
            this.onWindowLoad = function() {
                waterFallTabs();
            };

            var waterFallTabs = function() {
                var $targetEle = APP.eventTarget.find('#waterFallTabs');

                

                if ($targetEle[0] && !$('.mdl-layout').hasClass('is-small-screen')) {
                    var $main = APP.eventTarget.find('.mdl-layout__content'),
                        $targetEle = APP.eventTarget.find('#waterFallTabs'),
                        $header = APP.eventTarget.find('.mdl-layout__header'),
                        $body = APP.eventTarget,
                        $scrollOffset = APP.eventTarget.find('#waterFallScrollPos'),
                        $scrollPos;

                    var waterFallContent = function(){
                        var getContent = APP.eventTarget.find('.regularCardBody [data-fall-tab="true"]'),
                            $defaultTab = APP.eventTarget.find('.primaryDetailCard');
                        
                        $targetEle.find('.mdl-cell').append('<ul class="tabs"><li data-position="'+$defaultTab.position().top +'">'+$defaultTab.data('fall-tab-default')+'</li></ul>');

                        for (var i = 0; i < getContent.length; i++) {
                            var createList = $('<li data-position="'+$(getContent[i]).parent().position().top + 64+'">'+$(getContent[i]).text()+'</li>')
                            $targetEle.find('.tabs').append(createList);
                        }

                        $targetEle.on('click', '.tabs li', function(){
                            $main.animate({ scrollTop: $(this).data('position') }, 600);    
                        });

                        
                    };

                    setTimeout(function(){
                        $scrollPos = $scrollOffset.offset().top + $scrollOffset.height();
                    },600);

                    var detectScroll = function() {
                        var $this = $(this),
                            scroll = $this.scrollTop(),
                            pos = $scrollPos - 60;

                        var updateScroll = function(){
                            console.log('again');
                            $this.on('scroll');
                        };

                        if (scroll > pos) {
                            if ($body.hasClass('scrolled')) {
                                return false;
                            }

                            $body.removeClass('scrollHiding').addClass('scrolled');
                            $header.removeClass('fadeInDown').addClass('animated fadeOutUp');
                            $targetEle.removeClass('fadeOut').addClass('animated fadeIn');
                        
                        } else {
                            if ($body.hasClass('scrollHiding')) {
                                return false
                            }
                            
                            $body.removeClass('scrolled').addClass('scrollHiding');
                            
                            if ($header.hasClass('fadeOutUp')) {
                                $header.removeClass('fadeOutUp').addClass('animated fadeInDown');    
                                $targetEle.removeClass('fadeIn').addClass('animated fadeOut');
                            }
                        };
                    };

                    $main.on('scroll', detectScroll);
                    waterFallContent();                    
                };

                
            };

            var expendableColumn = function(ui) {
                var card = APP.eventTarget.find('.' + ui + '[data-expendable="true"]'),
                    oldHeight;

                for (var i = 0; i < card.length; i++) {
                    var setHeight = $(card[i]).data('height'),
                        getHeight = $(card[i]).find('.inner'),
                        ctaDom = $('<div class="btnWrap"><button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect"><i class="material-icons add">keyboard_arrow_down</i><i class="material-icons remove">keyboard_arrow_up</i></button></div>');

                    $(card[i]).find('.cardWrap').height(setHeight);

                    if (getHeight.height() >= setHeight) {
                        $(card[i]).append(ctaDom).find('.cardWrap').css('padding-bottom', 0);
                    }
                };

                $(card).on('click', '.mdl-button', function() {
                    var $this = $(this),
                        $parent = $this.parents('.' + ui);

                    if ($this.hasClass('expended')) {
                        $parent.find('.cardWrap').animate({ height: oldHeight }, 300, function() {
                            $this.removeClass('expended');
                        });
                        return false;
                    }

                    var actualHeight = $parent.find('.inner').height();

                    oldHeight = $parent.find('.cardWrap').height();

                    $parent.find('.cardWrap').animate({ height: actualHeight + 10 }, 300, function() {
                        $this.addClass('expended');
                    });
                });
            }

            var inLineDatePicker = function($calender) {
                var dateStart = $calender.data('date-start'),
                    dateEnd = $calender.data('date-end');

                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    objDateStart = new Date(dateStart),
                    objDateEnd = new Date(dateEnd);
                dateStartText = objDateStart.getDate() + ' ' + months[objDateStart.getMonth()],
                    dateEndMonth = objDateEnd.getDate() + ' ' + months[objDateStart.getMonth()];

                $calender.datepicker({
                    showOtherMonths: true,
                    nextText: dateEndMonth,
                    prevText: dateStartText + ' - ',
                    stepMonths: 0,
                    beforeShowDay: function(date) {
                        var dateFrom = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateStart);
                        dateTo = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateEnd);
                        return [true, dateFrom && ((date.getTime() == dateFrom.getTime()) || (dateTo && date >= dateFrom && date <= dateTo)) ? "dp-highlight" : ""];
                    }
                });

                $calender.datepicker('setDate', dateStart);
            };
        }
        return new _subModules();
    }());
})(jQuery, this, this.document);

//jQuery functions and plug-ins that will be reused across the site

(function($, window, document, undefined) {
    $.fn.extend({
        tabbing: function(config) {
            var $tabsParent = $(this);

            var settings = $.extend({
                tab: 'tabsHead', //Tabs parent class
                contentPanel: 'tabsContent', //Content panel parent class
                content: 'moduleWrapper',
                defaultTab: 0, //Default tab
                animationSpeed: 600,
                afterInit: function($tabsParent) {}, //Callback after init
                afterShow: function() {} //Callback after content show 
            }, config);

            var doTabbing = function() {
                var $tabs = $('.' + settings.tab + ' li'),
                    $tabsContent = $('.' + settings.contentPanel + ' .' + settings.content),
                    defaultTab = $tabsParent.find($tabs).get(settings.defaultTab),
                    defaultTabContent = $tabsParent.find($tabsContent).get(settings.defaultTab);

                //Show default tab & conetent panel
                $(defaultTab).addClass('active');
                $(defaultTabContent).addClass('active');

                $tabsParent.on('click', '.' + settings.tab + ' li', function(event) {
                    event.preventDefault();

                    var $this = $(this),
                        getContent = $this.data('tab');

                    if ($this.hasClass('active')) {
                        return false; //Do nothing if user click on active tab!
                    } else {
                        //Initially removed "active" class from "Tab" & "Content"
                        $tabsParent.find($tabs).removeClass('active').end().find($tabsContent).removeAttr('style').removeClass('active');
                        $(this).addClass('active'); //Add "active" class on current tab
                        $tabsParent.find($tabsContent).filter('[data-tab=' + getContent + ']').fadeIn(settings.animationSpeed).addClass('active'); //Add "active" class on content panel tab
                        settings.afterShow.call(this);
                    };
                });
                settings.afterInit.call(this, $tabsParent);
            };

            return this.each(function() {
                doTabbing();
            });
        }
    });
})(jQuery, this, this.document);

//Global code to be run on all pages
(function($, window, document, undefined) {
    $(function() {
        APP.subModules.pluginInit();
        APP.subModules.init();
    });

    // Global window load event.
    $(window).load(function() {
        APP.subModules.onWindowLoad();
    });
})(jQuery, this, this.document);
