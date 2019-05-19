// ==UserScript==
// @name         DMMdetail
// @namespace    https://github.com/taktheh/DMMdetail
// @version      0.1
// @description  display a detail window on mouse over
// @author       Takamaro the Hentai
// @match        https://www.dmm.com/*/list/*
// @match        https://www.dmm.co.jp/*/list/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const frameName = "DMMdetailFrame";

    function onmouseover() {
        var rect = this.getBoundingClientRect();
        var src = this.getElementsByTagName("a")[0].href;
        var timeoutID = window.setTimeout(() => {
            var iframe = document.getElementById(frameName);
            if (iframe.src === src) {
                iframe.style.display = null;
            }
            else {
                var left = rect.left + window.pageXOffset;
                var top = rect.top + window.pageYOffset;
                iframe.src = src;
                iframe.style.top = "" + top + "px";
                if (left < window.innerWidth * 0.5) {
                    iframe.style.left = "" + left + "px";
                } else {
                    iframe.style.left = "" + window.innerWidth * 0.5 + "px";
                }
                iframe.onload = function() {
                    iframe.style.display = null;
                    this.contentDocument.body.onmouseleave = function() {
                        iframe.style.display = "none";
                    };
                };
            }
        }, 2500);
        this.onmouseout = function() {
            window.clearTimeout(timeoutID);
        };
    };

    (function () {
        var style = document.createElement("style");
        document.head.appendChild(style);
        style.sheet.insertRule(
            '#' + frameName + ' {' +
                'position: absolute;' +
                'z-index: 32767;' +
                'width: 50vw;' +
                'height: 50vh;' +
                'background: #FFFFFF;' +
                '}'
        );
    })();

    (function() {
        var list = document.getElementById('list');
        if (list) {
            var iframe = document.createElement("iframe");
            iframe.id = frameName;
            iframe.style.display = "none";
            document.body.appendChild(iframe);

            var tmb = list.getElementsByClassName('tmb');
            for (var i = 0; i < tmb.length; i++) {
                tmb[i].onmouseover = onmouseover;
            }
        }
    })();
})();
