require([


    "dojo/query",
    "dojo/dom-class",
    "dojo/dom",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/date",
    "dojo/date/locale",
    "dojo/request",
    "dojo/_base/declare",
    "dojo/dom-style",
    "dojo/_base/fx",
    "dojo/keys",
    "dojo/html",

    // Dojo
    "dojo/domReady!"
], function (query, domClass, dom, on, domConstruct, date, locale, request, declare, domStyle, fx, keys, html) {

    initailizeSubmitButtonEvent();


    function initailizeSubmitButtonEvent() {
        query("#submitstep1").on("click", function (e) {
            console.log("step1 submit");
            var plantActive = query(".ui.button.active")[0];
            if (plantActive != null) {
                var plant = plantActive.innerHTML;
                var path = location.href.replace("step=1", "step=2")
                switch (plant) {
                    case "棉花":
                        window.location.href = path + '&plant=mianhua';
                        break;
                    case "玉米":
                        window.location.href = path + '&plant=yumi';
                        break;
                    case "小麦":
                        window.location.href = path + '&plant=xiaomai';
                        break;
                    case "梨":
                        window.location.href = path + '&plant=li';
                        break;
                    case "桃":
                        window.location.href = path + '&plant=tao';
                        break;
                    default:
                        break;

                }
            }
            // window.location.href='/suggestion?step=2';
        });

        query("#submitstep2").on("click", function (e) {
            console.log("step2 submit");
            var productActive = query(".ui.button.active")[0];
            if (productActive != null) {
                var path = location.href.replace("step=2", "step=3")
                window.location.href = path + '&product=' + productActive.innerHTML.substr(0, productActive.innerHTML.length - 2);

            }
            // window.location.href='/suggestion?step=2';
        });

        query("#backstep2").on("click", function (e) {
            var path = location.href.replace("step=2", "step=1");
            path = path.substring(0, path.indexOf("&plant"));
            window.location.href = path;

            // window.location.href='/suggestion?step=2';
        });

        query("#backsuggestion").on("click", function (e) {
            var path = location.href.replace("step=3", "step=2");
            path = path.substring(0, path.indexOf("&product"));
            window.location.href = path;

            // window.location.href='/suggestion?step=2';
        });

        query(".ui .buttons").on("click", function (e) {
            console.log();
            var activeButton = query(".ui.button.active")[0];
            if (activeButton != null) {
                domClass.remove(query(".ui.button.active")[0], "active");
            }
            domClass.add(e.target, "active");
        });
    }
});