// ==UserScript==
// @name         DMMdetail
// @namespace    https://github.com/taktheh/DMMdetail
// @version      0.2
// @description  display a detail window on mouse over
// @author       Takamaro the Hentai
// @downloadURL  https://github.com/taktheh/DMMdetail/raw/master/DMMdetail.user.js
// @match        https://www.dmm.com/*/list/*
// @match        https://www.dmm.co.jp/*/list/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const idName = "DMMdetailFrame";

    function load(url, func) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "document";
        xhr.onreadystatechange = function() {
            if ((xhr.readyState === 4) && (xhr.status === 200)) {
                func(xhr.response)
            }
        }
        xhr.open("GET", url, true);
        xhr.send(null);
    };
    function dismiss(e) {
    }
    function onmouseover() {
        var rect = this.getBoundingClientRect();
        var src = this.getElementsByTagName("a")[0].href;
        var timeoutID = window.setTimeout(() => {
            var popup = document.getElementById(idName);
            load(src, (e) => {
                var styles = e.getElementsByTagName("style");
                for (var i = 0; i < styles.length; i++) {
                    popup.appendChild(styles[i]);
                }
                var style = document.createElement("style");
                popup.appendChild(style);
                style.textContent =
                    '.page-detail > table > tbody > tr > td:nth-child(n+2) ' +
                    '{ display: none }';
                popup.appendChild(e.getElementById("mu"));
                var left = rect.left + window.pageXOffset;
                var top = rect.top + window.pageYOffset;
                popup.style.top = "" + top + "px";
                if (left < window.innerWidth * 0.5) {
                    popup.style.left = "" + left + "px";
                } else {
                    popup.style.left = "" + window.innerWidth * 0.5 + "px";
                }
                popup.onmouseleave = function() {
                    popup.style.display = "none";
                    while (popup.firstChild) {
                        popup.removeChild(popup.firstChild);
                    }
                };
                popup.style.display = "block";
            });
        }, 2500);
        this.onmouseout = function() {
            window.clearTimeout(timeoutID);
        };
    };

    (function () {
        var style = document.createElement("style");
        document.head.appendChild(style);
        style.sheet.insertRule(
            '#' + idName + ' {' +
                'position: absolute;' +
                'z-index: 32767;' +
                'width: 50vw;' +
                'height: 50vh;' +
                'overflow: scroll;' +
                'background: #FFFFFF;' +
                '}'
        );
    })();

    (function() {
        var list = document.getElementById('list');
        if (list) {
            var div = document.createElement("div");
            div.id = idName;
            div.style.display = "none";
            document.body.appendChild(div);

            var tmb = list.getElementsByClassName('tmb');
            for (var i = 0; i < tmb.length; i++) {
                tmb[i].onmouseover = onmouseover;
            }
        }
    })();
})();
