// ========= 燈箱 ==============================================================================================================================
Vue.component("modal", {
    props: ["canClose"],
    data: function () {
        return {
            toggle: false,
            isFixedHeight: false,
        };
    },
    template: ` <transition name="modal">
                    <div class="modal" v-if="toggle">
                        <div class="modal-bg" @click="closeModal()" v-if="canClose == true"></div>
                        <div class="modal-bg" v-if="canClose == false"></div>
                        <div class="modal-container" :class="{fixedHeight: isFixedHeight}" ref="modalContainer" id="modalContainer">
                            <div class="modal-close closeBtn" @click="closeModal()" v-if="canClose == true">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </div>
                            <div class="modal-container-infoArea">
                                <slot name="infoArea"></slot>
                            </div>
                        </div>
                    </div>
                </transition>`,
    methods: {
        closeModal() {
            this.toggle = false;
        },
    },
});

// ========= vue版 slick ==============================================================================================================================
Vue.component("slick", {
    props: {
        options: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },
    mounted() {
        this.create();
    },
    destroyed: function () {
        $(this.$el).slick("unslick");
    },
    methods: {
        create: function () {
            const $slick = $(this.$el);
            $slick.on("after-change", this.onAfterChange);
            $slick.on("before-change", this.onBeforeChange);
            $slick.on("breakpoint", this.onBreakpoint);
            $slick.on("destroy", this.onDestroy);
            $slick.on("edge", this.onEdge);
            $slick.on("init", this.onInit);
            $slick.on("reInit", this.onReInit);
            $slick.on("set-position", this.onSetPosition);
            $slick.on("swipe", this.onSwipe);
            $slick.on("lazyLoaded", this.onLazyLoaded);
            $slick.on("lazyLoadError", this.onLazyLoadError);
            $slick.slick(this.options);
        },
        destroy: function () {
            const $slick = $(this.$el);
            $slick.off("after-change", this.onAfterChange);
            $slick.off("before-change", this.onBeforeChange);
            $slick.off("breakpoint", this.onBreakpoint);
            $slick.off("destroy", this.onDestroy);
            $slick.off("edge", this.onEdge);
            $slick.off("init", this.onInit);
            $slick.off("reInit", this.onReInit);
            $slick.off("set-position", this.onSetPosition);
            $slick.off("swipe", this.onSwipe);
            $slick.off("lazyLoaded", this.onLazyLoaded);
            $slick.off("lazyLoadError", this.onLazyLoadError);
            $(this.$el).slick("unslick");
        },
        reSlick: function () {
            this.destroy();
            this.create();
        },
        next: function () {
            $(this.$el).slick("slickNext");
        },
        prev: function () {
            $(this.$el).slick("slickPrev");
        },
        pause: function () {
            $(this.$el).slick("slickPause");
        },
        play: function () {
            $(this.$el).slick("slickPlay");
        },
        goTo: function (index, dontAnimate) {
            $(this.$el).slick("slickGoTo", index, dontAnimate);
        },
        currentSlide: function () {
            return $(this.$el).slick("slickCurrentSlide");
        },
        add: function (element, index, addBefore) {
            $(this.$el).slick("slickAdd", element, index, addBefore);
        },
        remove: function (index, removeBefore) {
            $(this.$el).slick("slickRemove", index, removeBefore);
        },
        filter: function (filterData) {
            $(this.$el).slick("slickFilter", filterData);
        },
        unfilter: function () {
            $(this.$el).slick("slickUnfilter");
        },
        getOption: function (option) {
            $(this.$el).slick("slickGetOption", option);
        },
        setOption: function (option, value, refresh) {
            $(this.$el).slick("slickSetOption", option, value, refresh);
        },
        setPosition: function () {
            $(this.$el).slick("set-position");
        },
        // Events
        onAfterChange: function (event, slick, currentSlide) {
            this.$emit("after-change", event, slick, currentSlide);
        },
        onBeforeChange: function (event, slick, currentSlide, nextSlide) {
            this.$emit("before-change", event, slick, currentSlide, nextSlide);
        },
        onBreakpoint: function (event, slick, breakpoint) {
            this.$emit("breakpoint", event, slick, breakpoint);
        },
        onDestroy: function (event, slick) {
            this.$emit("destroy", event, slick);
        },
        onEdge: function (event, slick, direction) {
            this.$emit("edge", event, slick, direction);
        },
        onInit: function (event, slick) {
            this.$emit("init", event, slick);
        },
        onReInit: function (event, slick) {
            this.$emit("reInit", event, slick);
        },
        onSetPosition: function (event, slick) {
            this.$emit("set-position", event, slick);
        },
        onSwipe: function (event, slick, direction) {
            this.$emit("swipe", event, slick, direction);
        },
        onLazyLoaded: function (event, slick, image, imageSource) {
            this.$emit("lazyLoaded", event, slick, image, imageSource);
        },
        onLazyLoadError: function (event, slick, image, imageSource) {
            this.$emit("lazyLoadError", event, slick, image, imageSource);
        },
    },
    template: ` <div>
                    <slot></slot>
                </div>`,
});

var slickFunction = {
    data() {
        return {
            featuredFundOptions: {
                slidesToShow: 4,
                slidesToScroll: 4,
                autoplay: true,
                pauseOnHover: false,
                // dots: true,
                infinite: true,
                autoplaySpeed: 5000,
                speed: 500,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                ],
            },
        };
    },
    methods: {
        next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },

        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                // this.$refs.slick.reSlick();
                this.$refs.steps1_top.reSlick();
                this.$refs.steps1_content.reSlick();
            });
        },
        reInit2() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.steps2_top.reSlick();
                this.$refs.steps2_content.reSlick();
            });
        },
        reInit3() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.steps3_top.reSlick();
                this.$refs.steps3_content.reSlick();
            });
        },
        reInit4() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.steps4_top.reSlick();
                this.$refs.steps4_content.reSlick();
            });
        },

        
        reInitUS_etf() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.US_etf_content.reSlick();
            });
        },
        reInitUS_stock() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.US_stock_content.reSlick();
            });
        },

        // Events listeners
        handleAfterChange(event, slick, currentSlide) {
            // console.log('handleAfterChange', event, slick, currentSlide);
        },
        handleBeforeChange(event, slick, currentSlide, nextSlide) {
            // console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
        },
        handleBreakpoint(event, slick, breakpoint) {
            // console.log('handleBreakpoint', event, slick, breakpoint);
        },
        handleDestroy(event, slick) {
            // console.log('handleDestroy', event, slick);
        },
        handleEdge(event, slick, direction) {
            // console.log('handleEdge', event, slick, direction);
        },
        handleInit(event, slick) {
            // console.log('handleInit', event, slick);
        },
        handleReInit(event, slick) {
            // console.log('handleReInit', event, slick);
        },
        handleSetPosition(event, slick) {
            // console.log('handleSetPosition', event, slick);
        },
        handleSwipe(event, slick, direction) {
            // console.log('handleSwipe', event, slick, direction);
        },
        handleLazyLoaded(event, slick, image, imageSource) {
            // console.log('handleLazyLoaded', event, slick, image, imageSource);
        },
        handleLazeLoadError(event, slick, image, imageSource) {
            // console.log('handleLazeLoadError', event, slick, image, imageSource);
        }
    },
};

// ========= 社群分享 ==============================================================================================================================
Vue.component('shareLink', {
    data: function () {
        return {
            pageUrl: window.location.href,
            pageTitle: document.title,
        };
    },
    template: ` <div class="shareLink">
                    <ul class="shareLink-list">
                        <li>
                            分享<span v-if="$root.windowWidth < 992">：</span>
                        </li>
                        <li>
                            <a href="javascript:void(0)" title="複製網址" @click="copyUrl()">
                                <i class="fas fa-link"></i>
                            </a>
                        </li>
                        <li>
                            <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl" title="分享到Facebook" target="_blank">
                                <i class="fab fa-facebook-square"></i>
                            </a>
                        </li>
                        <li>
                            <a :href="'http://line.naver.jp/R/msg/text/?' + pageTitle + ' ' + pageUrl" title="分享到LINE" target="_blank">
                                <i class="fab fa-line"></i>
                            </a>
                        </li>
                    </ul>
                </div>`,
    methods: {
        //-------------------------------------複製網址
        copyUrl() {
            var temp = $('<input>'); // 建立input物件
            $('body').append(temp); // 將input物件增加到body
            var url = window.location.href; // 取得要複製的連結
            temp.val(url).select(); // 將連結加到input物件value
            document.execCommand('copy'); // 複製
            temp.remove(); // 移除input物件
            this.$root.toggleModal('copyUrlSuccess');
        }
    },
});
var content = new Vue({
    el: "#content",
    mixins: [slickFunction],
    components: {
        apexchart: VueApexCharts,
    },
    data: {
        // apexchart data start
        options: {
            chart: {
                id: 'stkchart',
                background: '#fff',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: true, // 看User是否要關閉,因為太小所以最後一天顯示不了
                }
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    show: false,
                    datetimeUTC: false,
                },
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + '';
                    }
                },
            },
            tooltip: {
                style: {
                    fontSize: '12px',
                    "text-align": 'center'
                },
                x: {
                    format: "yyyy/MM/dd"
                }
            },
            legend: {
                show: false,
            },
            colors: ['#f0e374']
        },
        series: [{
            name: '收盤價',
            data: []
        }],
        noData: {
            text: 'Loading...'
        },
        // apexchart data end
        canToggleModal: false,
        canCloseModal: true,
        isFixedHeight: true,
        modalMessage: '',
        baseUrl: location.origin + "/EventSite/EventSite", // Api網址
        pmtResult: '4,126',
        pmtPre: '4,126',
        fvResult: '24,252 ',
        stockList: [],// 投資標的
        calcResultList: [],// 投資標的試算結果
        hisTotal: 0, // 歷史報酬
        roi: [], //回測報酬
        name: "凱基證券",
        screenWidth: document.body.clientWidth,
        screenHeight: document.body.clientHeight,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        navbarShow: false,
        thisPath: location.protocol + "//" + location.host,
        menuBtnActive: false,
        navbarShow: false,
        activeNumber: "999",

        bannerMoney: 5,

        heartDharmaOptions: {
            // lazyLoad: 'ondemand',
            autoplay: false,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            adaptiveHeight: true,
            arrows: true,
            infinite: true,
        },

        targetActive: 1,

        target8: '0',

        qaActive: 1,

        qa1_0: false,
        qa1_1: false,
        qa1_2: false,
        qa1_3: false,
        qa1_4: false,
        qa1_5: false,
        qa1_6: false,
        qa1_7: false,
        qa1_8: false,
        qa1_9: false,

        qa2_1: false,
        qa2_2: false,
        qa2_3: false,
        qa2_4: false,
        qa2_5: false,
        qa2_6: false,
        qa2_7: false,
        qa2_8: false,
        qa2_9: false,
        qa2_10: false,
        qa2_11: false,
        qa2_12: false,

        qa3_1: false,
        qa3_2: false,
        qa3_3: false,
        qa3_4: false,
        qa3_5: false,
        qa3_6: false,
        qa3_7: false,
		
        note: false,
        notice: true,
        notice2: false,

        stepsActive: 1,

        steps1_topOptions: {
            autoplay: false,
            autoplaySpeed: 5000,
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            adaptiveHeight: true,
            arrows: false,
            infinite: true,
            asNavFor: '.steps1_content',
            focusOnSelect: true
        },
        steps1_contentOptions: {
            autoplay: false,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            adaptiveHeight: true,
            arrows: true,
            infinite: true,
            asNavFor: '.steps1_top',
        },

        steps2_topOptions: {
            autoplay: false,
            autoplaySpeed: 5000,
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            adaptiveHeight: true,
            arrows: false,
            infinite: true,
            asNavFor: '.steps2_content',
            focusOnSelect: true
        },
        steps2_contentOptions: {
            autoplay: false,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            adaptiveHeight: true,
            arrows: true,
            infinite: true,
            asNavFor: '.steps2_top',
        },

        steps3_topOptions: {
            autoplay: false,
            autoplaySpeed: 5000,
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            adaptiveHeight: true,
            arrows: false,
            infinite: true,
            asNavFor: '.steps3_content',
            focusOnSelect: true
        },
        steps3_contentOptions: {
            autoplay: false,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            adaptiveHeight: true,
            arrows: true,
            infinite: true,
            asNavFor: '.steps3_top',
        },
        steps4_topOptions: {
            autoplay: false,
            autoplaySpeed: 5000,
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            adaptiveHeight: true,
            arrows: false,
            infinite: true,
            asNavFor: '.steps4_content',
            focusOnSelect: true
        },
        steps4_contentOptions: {
            autoplay: false,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            adaptiveHeight: true,
            arrows: true,
            infinite: true,
            asNavFor: '.steps4_top',
        },

        browser: {
            language: ``,
            isMobile: ``,
            isIos: ``,
            isAndroid: ``,
            isIPhone: ``,
            isIPad: ``,
        },

        download1Link: 'https://www.kgieworld.com.tw/ExternalFiles/mobile/WFLinkApp.aspx?rUrl=kgiA',
        download2Link: 'https://www.kgieworld.com.tw/ExternalFiles/mobile/WFLinkApp.aspx?rUrl=kgiA',
        download3Link: 'https://www.kgieworld.com.tw/ExternalFiles/mobile/WFLinkApp.aspx?rUrl=kgiA',
        download4Link: 'https://event.kgi.com.tw/news/201711_wmapp/index.html',

        trialCalculationActive: 1,
        form1: true,
        form1_1: '100000',
        form1_2: '5',
        form1_3: '4',

        form2: true,
        form2_1: '1000',
        form2_2: '5',
        form2_3: '4',

        form3: true,
        form3_2: '1000',
        form3_11: '0', // 投資標的
        form3_12: 3000, // 投資金額(新台幣)
        form3_13: [], // 扣款日
        form3_Result: '', // 選擇標的名稱及代號
        fundListActive: 1,
        formDate: new Date().getFullYear() + '/' + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '/' + (new Date().getDate() < 10 ? '0' + (new Date().getDate() - 1) : (new Date().getDate() - 1)),
        crawStockList: [],
        crawCheckList: [],
        CheckCnt: 0,
        crawETFList: [],
        crawKGIList: [],
        showtest: 1,

        characteristicTab: 1,

        citieSocialNotice: false,

        showKelly: false,

        designatedTargetModal: {
            show: false,
            value: null,
            sliderOptions: {
                autoplay: true,
                autoplaySpeed: 3000,
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: true,
                // adaptiveHeight: true,
                arrows: true,
                infinite: true,
                spaceBetween: 30,
                responsive: [
                    {
                        breakpoint: 1399,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1
                        }
                    },
                ],
            }
        },

        citieSocialSliderOptions: {
            autoplay: true,
            autoplaySpeed: 4000,
            slidesToShow: 3,
            slidesToScroll: 1,
            // dots: true,
            arrows: true,
            centerMode: true, // 啟用中間對齊模式
            variableWidth: true,
            infinite: true,
        }
    },
    // components: {
    // },
    mounted() {
        // this.signature();
        // this.addNoOpener();
        this.useJq();
        this.showTarget();
        this.topBtn();
        // this.scrollMagic();

        // this.sameHeight("notSureWhatItIs2-item-bg");
        // setTimeout(() => {
        //     this.sameHeight('notSureWhatItIs2-item-bg');
        // }, 1000);

        $(window).resize(() => {
            this.windowWidth = $(window).innerWidth()
            this.windowHeight = $(window).innerHeight()

            // this.sameHeight('notSureWhatItIs2-item-bg')
        });

        // this.countToNumber1($('.assets1Num'), 1.5, '', 2500);
        // this.countToNumber2($('.assets2Num'), 1500000000000, '', 2500);

        // this.moneyGoPig();
        // this.download1();
        // this.download2();
        // this.download3();

        this.getStockQuoteInfo();

        window.addEventListener('mousemove', e => {
            this.setMoneyPos();
        })
        window.addEventListener('deviceorientation', e => {
            this.setMoneyPos2()
        });

        // this.characteristicSlider();

        window.addEventListener('scroll', e => {
            this.fixedKelly();
        });

        $('.citieSocial-slider .slick-slider .slick-active').eq(0).addClass('show1');
        $('.citieSocial-slider .slick-slider .slick-active').eq(1).addClass('show2');
        $('.citieSocial-slider .slick-slider .slick-active').eq(2).addClass('show3');
        $('.citieSocial-slider .slick-slider')
            .on('beforeChange', function(event, slick, currentSlide, nextSlide){
                $('.citieSocial-slider .slick-slider .slick-slide').removeClass('show1 show2 show3');
            })
            .on('afterChange', function(event, slick, currentSlide){
                $('.citieSocial-slider .slick-slider .slick-active').eq(0).addClass('show1');
                $('.citieSocial-slider .slick-slider .slick-active').eq(1).addClass('show2');
                $('.citieSocial-slider .slick-slider .slick-active').eq(2).addClass('show3');
            });
    },
    methods: {
        closeModal() {
            this.canToggleModal = false;
        },
        signature() {
            console.log(
                "%cMade by Captain%c2023/12",
                "color: #fff; border-radius: 5px; background: #1a4f9c; padding: 2px 10px; font-weight: bold;",
                "color: #000; border-radius: 5px; background: #ffde00; padding: 2px 10px; margin: 0px 5px;"
            );
        },
        toggleModal(name) {
            this.$refs[name].toggle = !this.$refs[name].toggle;
        },
        sameHeight(name) {
            let item = $("." + name),
                itemLeight = item.length,
                giftItemHeight = [];

            item.removeAttr("style");

            for (let n = 0; n < itemLeight; n++) {
                giftItemHeight[n] = item.eq(n).innerHeight();
            }
            let height = Math.max.apply(null, giftItemHeight);
            item.css("height", height);
        },
        addNoOpener() {
            // 資安用  target="_blank" 加 rel="nofollow me noopener noreferrer"
            var _linkHasTargetBlank = $('a[target="_blank"]');
            for (var n = 0; n < _linkHasTargetBlank.length; n++) {
                // 如果要連的網址跟這網站網域不同  加[rel="nofollow me noopener noreferrer"]
                _linkHasTargetBlank.eq(n).attr("href").indexOf(this.thisPath) ? _linkHasTargetBlank.eq(n).attr("rel", "nofollow me noopener noreferrer") : "";
            }
        },
        showTarget() {
            // 抓網址參數判斷要馬上顯示的區塊
            var url = location.href,
                i,
                openInfo = "";

            if (url.indexOf("?") != -1) {
                // 抓取網址參數判斷 --- Start
                function getUrlParams(url) {
                    // 回傳網址參數Object
                    var params = {};
                    (url + "?")
                        .split("?")[1]
                        .split("&")
                        .forEach(function (pair) {
                            pair = (pair + "=").split("=").map(decodeURIComponent);
                            if (pair[0].length) {
                                params[pair[0]] = pair[1];
                            }
                        });
                    return params;
                }

                var obj = getUrlParams(location.href);
                // 因為#hash會直接串在最後一個參數後面, 故需要取代處理
                if (Object.keys(obj).length && obj.hasOwnProperty("openInfo")) openInfo = obj.openInfo.indexOf("#") > -1 ? obj.openInfo.replace(location.hash, "") : obj.openInfo;
                // 抓取網址參數判斷 --- End

                // 2020-11-26 Jeffery 修正openInfo空值在jQuery的錯誤
                if (openInfo && $("#" + openInfo).length > 0) {
                    setTimeout(() => {
                        var targetOffset = $("#" + openInfo).offset().top;
                        window.scrollTo(0, targetOffset);
                        console.log(openInfo, targetOffset)
                    }, 500);
                    // setTimeout(()=>{
                    // 	this.$scrollTo('#' + openInfo);
                    // }, 500)
                }
                /*
                    例 /index.html?openInfo=q1
                */
            }
        },
        topBtn() {
            $(window)
                .bind("scroll resize", function () {
                    var $this = $(this);
                    var $this_Top = $this.scrollTop();

                    //當高度小於100時，關閉區塊
                    if ($this_Top < 100) {
                        $(".topBtn").stop().css({
                            transform: "matrix(1, 0, 0, 1, 0, 400)",
                            opacity: 0,
                        });
                    }
                    if ($this_Top > 100) {
                        $(".topBtn").stop().css({
                            transform: "matrix(1, 0, 0, 1, 0, 0)",
                            opacity: 1,
                        });
                    }
                })
                .scroll();
        },
        toThousands(num) {
            // 錢加逗號
            return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, `$1,`);
        },
        delHtmlTag(info) {
            // 剔除htmlCode 只留文字
            String.prototype.stripHTML = function () {
                var reTag = /<(?:.|\s)*?>/g;
                return this.replace(reTag, "");
            };
            return info.stripHTML();
        },
        countToNumber1(element, number, suffix, duration) {
            // 數字遞增效果 - 小數點第一位
            var roundX = function (val, precision) {
                return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
            }
            $({ count: parseInt(element.text().split("+")[0].replace(/\,/g, "")) }).animate(
                { count: number },
                {
                    duration: duration ? duration : 1000,
                    easing: "swing",
                    step: function (now) {
                        element.text((roundX(now, 1) + suffix).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                    },
                    complete: function () {
                        // countingFromZero = false;
                    },
                }
            );
        },
        countToNumber2(element, number, suffix, duration) {
            // 數字遞增效果
            $({ count: parseInt(element.text().split("+")[0].replace(/\,/g, "")) }).animate(
                { count: number },
                {
                    duration: duration ? duration : 1000,
                    easing: "swing",
                    step: function (now) {
                        element.text((Math.floor(now) + suffix).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                    },
                    complete: function () {
                        // countingFromZero = false;
                    },
                }
            );
        },

        //-------------------------------------navbar
        toggleMobileNavbar() {
            this.menuBtnActive === false ? (this.menuBtnActive = true) : (this.menuBtnActive = false);
            this.navbarShow === false ? (this.navbarShow = true) : (this.navbarShow = false);
        },
        hideMobileNavbar() {
            this.menuBtnActive = false;
            this.navbarShow = false;
        },
        navClick(no, hashName) {
            this.navbarShow = false;
            this.$scrollTo("#" + hashName);
        },

        //-------------------------------------使用jq區塊
        useJq() {
            AOS.init({
                once: true
            })
        },

        //-------------------------------------scrollMagic
        scrollMagic() {
            // // init controller
            // let controller = new ScrollMagic.Controller(),
            //     bannerTit = new TimelineMax();
            // // howToPickTimeLine = new TimelineMax(),

            // new ScrollMagic.Scene({
            //     triggerElement: ".banner",
            //     duration: 400,
            //     // offset: 0,
            // })
            //     .setTween(bannerTit)
            //     // .addIndicators({name: "1 (duration: 0)"})
            //     .addTo(controller);

            // bannerTit.add(
            //     TweenMax.from(".banner-tit-sTit", 5, {
            //         x: 50,
            //         y: -80,
            //     })
            // );
            TweenMax.from('.banner-man', 0.3, { opacity: 0, delay: 0, x: -200, y: 420 });
            TweenMax.to(".banner-man", 0.3, { x: 10, y: 10, delay: 0.3 });
            TweenMax.from('.banner-tit', 0.3, { opacity: 0, delay: 0.3 });
            TweenMax.from('.banner-tit-sTit', 0.3, { delay: 0.3, x: -300, y: 20 });
            TweenMax.from('h1', 0.3, { opacity: 0, delay: 0.5, x: -300, y: 20 });

            TweenMax.to('.banner-man', 1, { x: 0, y: 0, repeat: -1, yoyo: true, delay: 0.6 });
        },

        //-------------------------------------錢進撲滿
        // moneyGoPig() {
        //     setInterval(() => {
        //         this.bannerMoney >= 5 ? this.bannerMoney = 1 : this.bannerMoney++;
        //     }, 300);
        // },

        //-------------------------------------滑鼠互動
        setMoneyPos() {
            let e = window.event;

            let posX = e.clientX;
            let posY = e.clientY;
            $('.banner-decorate div:eq(0), .heartDharma-decorate div:eq(0)').css({
                'transform': 'translate(-' + posX / 60 + 'px, -' + posY / 60 + 'px)',
            });
            $('.banner-decorate div:eq(1), .heartDharma-decorate div:eq(1)').css({
                'transform': 'translate(-' + posX / 80 + 'px, -' + posY / 80 + 'px)',
            });
            $('.banner-decorate div:eq(2), .heartDharma-decorate div:eq(2)').css({
                'transform': 'translate(-' + posX / 70 + 'px, -' + posY / 70 + 'px)',
            });
            $('.banner-decorate div:eq(3)').css({
                'transform': 'rotate(45deg) translate(-' + posX / 60 + 'px)',
            });
            // $('.banner-content').css({
            //     'transform' : 'translate(' + posX/100 + 'px, ' + posY/100 + 'px)',
            // });
        },

        setMoneyPos2() {
            let e = window.event;

            let posX = e.gamma;
            let posY = 0;
            $('.banner-decorate div:eq(0)').css({
                'transform': 'translate(' + posX / 2 + 'px, ' + posY / 2 + 'px)',
            });
            $('.banner-decorate div:eq(1)').css({
                'transform': 'translate(' + posX / 8 + 'px, ' + posY / 8 + 'px)',
            });
            $('.banner-decorate div:eq(2)').css({
                'transform': 'translate(-' + posX / 70 + 'px, -' + posY / 70 + 'px)',
            });
            $('.banner-decorate div:eq(3)').css({
                'transform': 'translate(-' + posX / 50 + 'px, -' + posY / 50 + 'px)',
            });
            $('.banner-decorate div:eq(4)').css({
                'transform': 'rotate(45deg) translate(-' + posX / 60 + 'px)',
            });
        },

        //-------------------------------------凱莉
        fixedKelly() {
            this.showKelly = true;
            setTimeout(() => {
                this.showKelly = false;
            }, 1000)
        },

        /**
         * 立刻去存點擊事件
         */
        toWeb() {
            /*
            * 智慧機瀏覽器版本資訊:
            *
            */
            var browser = {
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {//移動終端瀏覽器版本資訊 
                        trident: u.indexOf('Trident') > -1, //IE核心
                        presto: u.indexOf('Presto') > -1, //opera核心
                        webKit: u.indexOf('AppleWebKit') > -1, //蘋果、谷歌核心
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐核心
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否為移動終端
                        ios: !!u.match(/\(i[^;] ;( U;)? CPU. Mac OS X/), //ios終端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android終端或者uc瀏覽器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否為iPhone或者QQHD瀏覽器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web應該程式，沒有頭部與底部
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            }

            this.$set(this.browser, 'language', browser.language);
            this.$set(this.browser, 'isMobile', browser.versions.mobile);
            this.$set(this.browser, 'isIos', browser.versions.ios);
            this.$set(this.browser, 'isAndroid', browser.versions.android);
            this.$set(this.browser, 'isIPhone', browser.versions.iPhone);
            this.$set(this.browser, 'isIPad', browser.versions.iPad);

            if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
                window.location.href = `kgi-ecapp://Web?Action=100&WebType=46&Title=%E5%AE%9A%E6%9C%9F%E5%AE%9A%E9%A1%8D%E5%B0%88%E5%8D%80&stock=${this.form3_11.split("_")[0]}`;
                document.addEventListener('visibilitychange', function () { // 判斷用戶離開當前頁面
                    if (document.visibilityState === 'hidden') {
                        window.location.reload(); //如果離開就重整網頁，免得轉跳到下載app頁
                    }
                });
                setTimeout(function () {
                    window.location.href = `https://h5webtrade.kgieworld.com.tw/ServicesWeb/Auth/Login?orign=P&applytype=46&clear=Y&stock=${this.form3_11.split("_")[0]}`;
                }, 500);
            }
            else { // 電腦版
                window.location.href = `https://h5webtrade.kgieworld.com.tw/ServicesWeb/Auth/Login?orign=P&applytype=46&clear=Y&stock=${this.form3_11.split("_")[0]}`;
            }

            // console.log("語言版本: ", browser.language);
            // console.log(" 是否為移動終端: ", browser.versions.mobile);
            // console.log(" ios終端: ", browser.versions.ios);
            // console.log(" android終端: ", browser.versions.android);
            // console.log(" 是否為iPhone: ", browser.versions.iPhone);
            // console.log(" 是否iPad: ", browser.versions.iPad);
            // console.log(navigator.userAgent);
        },

        /**
        * 立即定期定額申購點擊事件
        */
        toWeb2() {
            var chkCount = 0
            var chkList = ''
            this.crawStockList.forEach(s => {
                if (s.checked) {
                    chkCount += 1
                    chkList += `${s.StockName.split('(')[1].replace(')', '')},`
                }
            })
            this.crawETFList.forEach(s => {
                if (s.checked) {
                    chkCount += 1
                    chkList += `${s.StockName.split('(')[1].replace(')', '')},`

                }
            })
            this.crawKGIList.forEach(s => {
                if (s.checked) {
                    chkCount += 1
                    chkList += `${s.StockName.split('(')[1].replace(')', '')},`
                }
            })
            if (chkCount <= 0) {
                this.toggleModal('noSelectAlert')
                return
            }
            if (chkCount > 10) {
                this.toggleModal('selectTooMuchAlert')
                return
            }

            chkList = chkList.substring(0, chkList.length - 1)
            /*
            * 智慧機瀏覽器版本資訊:
            *
            */
            var browser = {
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {//移動終端瀏覽器版本資訊 
                        trident: u.indexOf('Trident') > -1, //IE核心
                        presto: u.indexOf('Presto') > -1, //opera核心
                        webKit: u.indexOf('AppleWebKit') > -1, //蘋果、谷歌核心
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐核心
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否為移動終端
                        ios: !!u.match(/\(i[^;] ;( U;)? CPU. Mac OS X/), //ios終端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android終端或者uc瀏覽器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否為iPhone或者QQHD瀏覽器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web應該程式，沒有頭部與底部
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            }

            this.$set(this.browser, 'language', browser.language);
            this.$set(this.browser, 'isMobile', browser.versions.mobile);
            this.$set(this.browser, 'isIos', browser.versions.ios);
            this.$set(this.browser, 'isAndroid', browser.versions.android);
            this.$set(this.browser, 'isIPhone', browser.versions.iPhone);
            this.$set(this.browser, 'isIPad', browser.versions.iPad);

            // 點了帶選取的列表 "2330,2308"
            if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
                window.location.href = `kgi-ecapp://Web?Action=100&WebType=46&Title=%E5%AE%9A%E6%9C%9F%E5%AE%9A%E9%A1%8D%E5%B0%88%E5%8D%80&stock=${chkList}`;
                document.addEventListener('visibilitychange', function () { // 判斷用戶離開當前頁面
                    if (document.visibilityState === 'hidden') {
                        window.location.reload(); //如果離開就重整網頁，免得轉跳到下載app頁
                    }
                });
                setTimeout(function () {
                    window.location.href = `https://h5webtrade.kgieworld.com.tw/ServicesWeb/Auth/Login?orign=P&applytype=46&clear=Y&stock=${chkList}`;
                }, 500);
            }
            else { // 電腦版
                window.location.href = `https://h5webtrade.kgieworld.com.tw/ServicesWeb/Auth/Login?orign=P&applytype=46&clear=Y&stock=${chkList}`;
            }
        },



        //-------------------------------------連結判斷
        download1() {
            if (this.browser.isAndroid) {
                this.download1Link = 'https://play.google.com/store/apps/details?id=tw.com.kgi.ecapp&hl=zh_TW&gl=US';
                return;
            } if (this.browser.isIPad) {
                this.download1Link = 'https://apps.apple.com/tw/app/%E9%9A%A8%E8%BA%ABe%E7%AD%96%E7%95%A5/id1473914290';
                return;
            } if (this.browser.isIPhone && this.windowWidth < 768) {
                this.download1Link = 'https://apps.apple.com/tw/app/%E9%9A%A8%E8%BA%ABe%E7%AD%96%E7%95%A5/id1473914290';
                return;
            } else {
                this.download1Link = "https://www.kgieworld.com.tw/news/202008_estrategy/"
            }
        },

        download2() {
            if (this.browser.isAndroid) {
                this.download2Link = 'https://play.google.com/store/apps/details?id=tw.com.kgi.ecapp&hl=zh_TW&gl=US';
                return;
            } if (this.browser.isIPad) {
                this.download2Link = 'https://apps.apple.com/tw/app/%E9%9A%A8%E8%BA%ABe%E7%AD%96%E7%95%A5/id1473914290';
                return;
            } if (this.browser.isIPhone && this.windowWidth < 768) {
                this.download2Link = 'https://apps.apple.com/tw/app/%E9%9A%A8%E8%BA%ABe%E7%AD%96%E7%95%A5/id1473914290';
                return;
            } else {
                this.download2Link = "https://www.kgieworld.com.tw/news/202008_estrategy/"
            }
        },

        download3() {
            if (this.browser.isAndroid) {
                this.download3Link = 'https://play.google.com/store/apps/details?id=com.kgi.etrade.tw&hl=zh_TW&gl=US';
                return;
            } if (this.browser.isIPad) {
                this.download3Link = 'https://apps.apple.com/tw/app/%E7%90%86%E8%B2%A1%E5%BF%ABe%E5%AF%8C/id1278795372';
                return;
            } if (this.browser.isIPhone && this.windowWidth < 768) {
                this.download3Link = 'https://apps.apple.com/tw/app/%E7%90%86%E8%B2%A1%E5%BF%ABe%E5%AF%8C/id1278795372';
                return;
            } else {
                this.download3Link = "https://play.google.com/store/apps/details?id=com.kgi.etrade.tw&hl=zh_TW&gl=US"
            }
        },
        /**
         * 取回投資標的
         * */
        getStockQuoteInfo() {
            $.post(`${this.baseUrl}/Query`, {
                QueryType: 'sl',
            })
                .done((data) => {
                    this.stockList = /*JSON.parse(*/data.list;
                })
        },
        /**
         * 計算每月存多少
         * */
        calcPmt() {
            // 目標金額form1_1
            // 投資期間form1_2
            // 預期報酬率form1_3
            $.post(`${this.baseUrl}/Query`, {
                QueryType: 'pmt',
                Fv: this.form1_1,
                Nper: this.form1_2,
                Rate: this.form1_3
            })
                .done((data) => {
                    this.pmtPre = data.pmtpre
                    this.pmtResult = this.toThousands(data.pmt)
                    this.form1 = false
                    this.$scrollTo('#trialCalculation')
                });
        },
        /**
         * 計算總收益
         * */
        calcFv() {
            // 目標金額form1_1
            // 投資期間form1_2
            // 預期報酬率form1_3
            $.post(`${this.baseUrl}/Query`, {
                QueryType: 'fv',
                Pmt: parseInt(`-${this.form2_1}`),
                Nper: this.form2_2,
                Rate: this.form2_3
            })
                .done((data) => {
                    this.fvResult = this.toThousands(data.fv)
                    this.form2 = false;
                    this.$scrollTo('#trialCalculation')
                });
        },
        /**
         * 計算熱門標的
         * */
        calcStock() {
            // 當用戶未選擇投資標的，畫面顯示
            if (this.form3_11 === '0') {
                this.canToggleModal = true;
                this.modalMessage = '請選擇投資標的。'
                return
            }
            // 當用戶未輸入金額或金額<1000時，畫面顯示
            if (parseInt(this.form3_12) < 1000) {
                this.canToggleModal = true;
                this.modalMessage = '請輸入金額，每月最小投資金額為1,000元。'
                return
            }
            // 當用戶未選擇扣款日時，畫面顯示
            if (this.form3_13.length === 0) {
                this.canToggleModal = true;
                this.modalMessage = '請選擇每月扣款日。'
                return
            }
            this.stockList.forEach(s => {
                if (s.stkCode === this.form3_11.split("_")[0]) this.form3_Result = `${s.stkName}(${s.stkCode})`
            })
            this.$scrollTo('#trialCalculation')
            this.form3 = false;
            this.queryStockChartData()
            this.queryStockORI()
        },
        /**
         * 重新計算熱門標的
         * */
        reCalcStock() {
            this.form3_11 = '0'
            this.form3_12 = 3000
            this.form3_13 = []
            this.form3 = true
            this.calcResultList = []
            this.$scrollTo('#trialCalculation')
        },
        /**
         * 取回個股走勢
         * */
        queryStockChartData() {
            var symbolId = this.form3_11
            $.post(`${this.baseUrl}/Query`, {
                QueryType: 'his',
                SymbolId: `${symbolId}`
            })
                .done((data) => {
                    this.$refs.realtimeChart.updateSeries([{
                        data: data.data,
                    }], false, true);
                });
        },
        /**
         * 取回回測報酬率
         * */
        queryStockORI() {
            $.post(`${this.baseUrl}/Query`, {
                QueryType: 'roi',
                SymbolId: this.form3_11,
                Pmt: this.form3_12,
                ChargeDays: this.form3_13
            })
                .done((data) => {
                    //this.canToggleModal = true
                    this.calcResultList = data.list
                    this.hisTotal = data.hisTotal
                    this.roi = [data.oneYearRate, data.threeYearRate, data.fiveYearRate]
                    this.modalMessage = `總股數：${data.threeStock}`
                });
        },

        /**
        * 取得台股定期定額熱門排行榜
        * */

        queryCraw(modalname) {

            $.post(`${this.baseUrl}/Query`, {
                QueryType: 'craw',
            })
                .done((data) => {
                    this.crawStockList = [];
                    this.crawETFList = [];
                    this.crawKGIList = [];
                    this.$refs[modalname].toggle = !this.$refs[modalname].toggle;
                    let j = 0;
                    for (var i = 0; i <= data.Result.length; i++) {
                        if (data.Result[i].Rank == '1') j++;
                        if (j < 2) this.crawStockList.push(data.Result[i]) // 股
                        else if (j == 2) this.crawETFList.push(data.Result[i]) // ETF
                        else this.crawKGIList.push(data.Result[i]) // 凱基精選
                    }
                });
        },

        //-------------------------------------試算功能
        toggleForm(now) {
            // if(this.trialCalculationActive == now) {
            //     return;
            // }else {
            //     if(this.trialCalculationActive == 1) {
            //         this.form1 = true;
            //     }else if(this.trialCalculationActive == 2) {
            //         this.form2 = true;
            //     }else if(this.trialCalculationActive == 3) {
            //         this.form3 = true;
            //     }
            // }
        },
        openAppUrl(appUrl) {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;  //android終端或者uc瀏覽器
            var isiOS = !!u.match(/\(i[^;] ;( U;)? CPU. Mac OS X/);  //ios終端
            // var PC_WebAddress = "https://www.kgieworld.com.tw/kgiswapi/iframe_KGISvcLogin/KGIS_LoginM.aspx?orign=P&Data=Trade%3FAction%3D000%26SymbolID%3D" + fundCode;     //電腦版網址
            var Mobile_WebAddress = appUrl //手機版網址
            var isMobile  //是否為小網

            //RWD判斷
            if (window.screen.width < 991) {
                isMobile = true;
            } else {
                isMobile = false;
            }

            //解析自身網址參數
            let url = window.location.toString();
            if (url.indexOf("?") != -1) {
                var ary = "",
                    str,
                    utm_source,
                    utm_medium,
                    utm_campaign;
                if (url.indexOf("#") < 0) {
                    //網址內不含 # (無錨點)
                    ary = url.split("?")[1].split("&");
                } else {
                    ary = url.split("#")[0];
                    ary = ary.split("?")[1].split("&");
                }


                for (var i in ary) {
                    str = ary[i].split("=")[0];
                    //指定要接的參數
                    if (str == "utm_source") {  //UTM
                        utm_source = decodeURI(ary[i].split("=")[1]);
                        utm_source = utm_source.replace("#", "");
                    }
                    else if (str == "utm_medium") {  //UTM
                        utm_medium = decodeURI(ary[i].split("=")[1]);
                        utm_medium = utm_medium.replace("#", "");
                    }
                    else if (str == "utm_campaign") {  //UTM
                        utm_campaign = decodeURI(ary[i].split("=")[1]);
                        utm_campaign = utm_campaign.replace("#", "");
                    }
                }


                var UTM = "utm_source=" + utm_source + "&utm_medium=" + utm_medium + "&utm_campaign=" + utm_campaign;


                if (isMobile) { //小網
                    if (Mobile_WebAddress.indexOf("?") < 1) {
                        Mobile_WebAddress += "?" + UTM;   //按鈕網址已有參數
                    } else {
                        Mobile_WebAddress += "&" + UTM;   //按鈕網址無參數
                    }
                } else {  //大網
                    // if( PC_WebAddress.indexOf("?") < 1 ){
                    //     PC_WebAddress += "?" + UTM;    //按鈕網址已有參數
                    // } else {
                    //     PC_WebAddress += "&" + UTM;    //按鈕網址無參數
                    // }
                }
            }

            if (isMobile) {  //小網
                window.location.href = Mobile_WebAddress; //開啟App
                document.addEventListener('visibilitychange', function () { // 判斷用戶離開當前頁面
                    if (document.visibilityState === 'hidden') {
                        window.location.reload(); //如果離開就重整網頁，免得轉跳到下載app頁
                    }
                });
                if (isAndroid) {
                    window.setTimeout(function () {
                        window.location.href = "https://play.google.com/store/apps/details?id=tw.com.kgi.ecapp";  //No App，Play商店
                    }, 2000);
                } else {
                    window.setTimeout(function () {
                        window.location.href = "https://apps.apple.com/tw/app/%E9%9A%A8%E8%BA%ABe%E7%AD%96%E7%95%A5/id1473914290";  //No App，App store
                    }, 2000);
                }
            } else {  //大網
                // window.location.href = PC_WebAddress;
            }
        },

        //-------------------------------------四大特性輪播
        characteristicSlider() {
            setInterval(() => {
                if (this.characteristicTab < 4) {
                    this.characteristicTab++;
                } else {
                    this.characteristicTab = 1
                }
            }, 5000);
        }
    },

    watch: {
        screenWidth(val) {
            this.screenWidth = val;
        },
        screenHeight(val) {
            this.screenHeight = val;
        },
        windowWidth(val) {
            this.windowWidth = val;
        },
        windowHeight(val) {
            this.windowHeight = val;
        },
    },
});


