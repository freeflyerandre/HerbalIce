var P = {
    siteUrl: null,
    auth: null,
    isFB: null,
    $: function (id) {
        return document.getElementById(id);
    },
    preLoadImages: function () {
        var d = document;

        if (d.images) {
            if (!d.MM_p) {
                d.MM_p = new Array();
            }

            var i, j = d.MM_p.length, a = P.preLoadImages.arguments;
            for (i = 0; i < a.length; i++) {
                if (a[i].indexOf("#") != 0) {
                    d.MM_p[j] = new Image;
                    d.MM_p[j++].src = a[i];
                }
            }
        }
    },
    getXmlHttpObject: function () {
        var xmlHttp = false;
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlHttp = false;
            }
        }
        if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
            try {
                xmlHttp = new XMLHttpRequest();
            } catch (e) {
                xmlHttp = false;
            }
        }
        if (!xmlHttp && window.createRequest) {
            try {
                xmlHttp = window.createRequest();
            } catch (e) {
                xmlHttp = false;
            }
        }
        return xmlHttp;
    },
    xmlHttpObjectGet: function (url) {
        var xmlHttp = P.getXmlHttpObject();
        xmlHttp.open("GET", url, true);

        xmlHttp.setRequestHeader("If-Modified-Since", "Thu, 1 Jan 1970 00:00:00 GMT");
        xmlHttp.setRequestHeader("Pragma", "no-cache");
        xmlHttp.setRequestHeader("Cache-Control", "no-cache");

        return xmlHttp;
    },
    get: function (url, pnl) {
        //Check if this is a string or anchor.
        if (typeof (url) == "object") {
            url = url.getAttribute("href");
        }

        //Remove ajax if present in url.
        var re = /[?&]ajax=1/g;
        url = url.replace(re, "");
        url += (url.indexOf("?") > -1 ? "&" : "?") + "ajax=1";

        //Track the page view with Google Analytics.
        try {
            var page = url.replace(P.siteUrl, "");
            pageTracker._trackPageview(page);
            //_gaq.push(['_trackPageview', page]);
        } catch (e) { }

        if (P.isFB) {
            url += "&isfb=1";
        }

        if (Facebook.cookie) {
            url += "&" + Facebook.cookie;
        }

        if (P.auth) {
            url += "&" + P.auth;
        }

        PAjax.$(url, function (xmlHttp) {
            var panel = P.$(pnl);

            if (panel != null) {
                //Set the panel html.
                P.setHtml(pnl, xmlHttp);

                //Process scripts...
                P.processScripts(xmlHttp);
            }
        });

        return false;
    },
    post: function (frm, pnl) {
        //Remove ajax if present in url.
        var form = P.getForm(frm);
        form += (form != "" ? "&" : "") + "ajax=1";

        //Track the page view with Google Analytics.
        try {
            var page = frm.action.replace(P.siteUrl, "");
            //_gaq.push(['_trackPageview', page]);
            pageTracker._trackPageview(page);
        } catch (e) { }

        if (P.isFB) {
            form += "&isfb=1";
        }

        if (Facebook.cookie) {
            form += "&" + Facebook.cookie;
        }

        if (P.auth) {
            form += "&" + P.auth;
        }

        PAjax.$p(frm.action, form, function (xmlHttp) {
            P.setHtml(pnl, xmlHttp);

            //Process scripts...
            P.processScripts(xmlHttp);
        });

        return false;
    },
    popup: function (url) {
        //Check if this is a string or anchor.
        if (typeof (url) == "object") {
            url = url.getAttribute("href");
        }

        //Remove ajax if present in url.
        var re = /[?&]ajax=1/g;
        url = url.replace(re, "");
        url += (url.indexOf("?") > -1 ? "&" : "?") + "ajax=1&popup=1";

        //Track the page view with Google Analytics.
        try {
            var page = url.replace(P.siteUrl, "");
            //_gaq.push(['_trackPageview', page]);
            pageTracker._trackPageview(page);
        } catch (e) { }

        if (P.isFB) {
            url += "&isfb=1";
        }

        if (Facebook.cookie) {
            url += "&" + Facebook.cookie;
        }

        if (P.auth) {
            url += "&" + P.auth;
        }

        PAjax.$(url, function (xmlHttp) {
            try {
                Modal.show(xmlHttp.responseText);
            } catch (e) { alert(e.Message); }

            //Process scripts...
            P.processScripts(xmlHttp);
        });

        return false;
    },
    frameGet: function (url, pnl) {
        window.setTimeout("P.get('" + url + "', '" + pnl + "');", 100);
        return false;
    },
    getForm: function (frm) {
        //Parse the form.
        var form = $(frm).serialize();
        return form;
    },
    processScripts: function (xmlHttp) {
        //Process scripts...
        var html = xmlHttp.responseText;
        var scr = /<script[^>]+?>(.*?)<\/script>/gim;
        var scripts = html.replace(/[\n\r]/g, '').match(scr);

        if (scripts != null) {
            var i;
            for (i = 0; i < scripts.length; i++) {
                if (scripts[i].toLowerCase().indexOf(" src=") == -1) {
                    var scrStart = /<script.+?>/gi;
                    var scrEnd = /<\/script>/gi;
                    var script = scripts[i].replace(scrStart, "").replace(scrEnd, "");
                    eval(script);
                }
            }
        }
    },
    progress: function (pnl) {
        P.setHtml(pnl, "<center><div style=\"padding:20px 0px 20px 0px;\"><img src=\"" + P.siteUrl + "/images/ajax-loader.gif\" width=\"54\" height=\"55\" border=\"0\" /></div></center>");
    },
    progress2: function (pnl) {
        P.setHtml(pnl, "<center><div style=\"padding:20px 0px 20px 0px;\"><img src=\"" + P.siteUrl + "/images/ajax-loader2.gif\" width=\"54\" height=\"55\" border=\"0\" /></div></center>");
    },
    setHtml: function (pnl, content) {
        var html = typeof (content) == "object" ? content.responseText : content;

        if (html.toLowerCase().indexOf("<body") > -1) {
            var html2 = html.substring(html.indexOf("<body") + 5);
            html2 = html2.substring(html2.indexOf(">") + 1);
            html2 = html2.substring(0, html2.indexOf("</body>"));
            P.$(pnl).innerHTML = html2;
        }
        else {
            P.$(pnl).innerHTML = html;
        }
    },
    scrollToTop: function () {
        P.$("top").scrollIntoView();
    }
};

//--------------------------
//--- START OF AJAX CODE ---
//--------------------------

var PAjax = {
    $: function (url, callback) {
        var xmlHttp = P.xmlHttpObjectGet(url);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                callback(xmlHttp);

                //Cleanup
                try {
                    xmlHttp.onreadystatechange = null;
                    xmlHttp.abort = null;
                }
                catch (e) { }

                xmlHttp = null;
            }
        };
        xmlHttp.send(null);
    },
    $p: function (url, form, callback) {
        var xmlHttp = P.getXmlHttpObject();
        xmlHttp.open("POST", url, true);

        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlHttp.setRequestHeader("Content-Length", form.length);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                callback(xmlHttp);

                //Cleanup
                try {
                    xmlHttp.onreadystatechange = null;
                    xmlHttp.abort = null;
                }
                catch (e) { }

                xmlHttp = null;
            }
        };
        xmlHttp.send(form);
    },
    get: function (url, pnl) {
        //Check if this is a string or anchor.
        if (typeof (url) == "object") {
            url = url.getAttribute("href");
        }

        //Remove ajax if present in url.
        var re = /[?&]ajax=1/g;
        url = url.replace(re, "");
        url += (url.indexOf("?") > -1 ? "&" : "?") + "ajax=1";

        //Track the page view with Google Analytics.
        try {
            var page = url.replace(P.siteUrl, "");
            //_gaq.push(['_trackPageview', page]);
            pageTracker._trackPageview(page);
        } catch (e) { }

        if (Facebook.cookie) {
            url += "&" + Facebook.cookie;
        }

        //Show Progress
        if (PAjax.get.arguments.length == 2) {
            P.progress(pnl);
        }
        else {
            P.progress2(pnl);
        }

        //Get the new page.
        PAjax.$(url, function (xmlHttp) {
            //Set the panel html.
            P.setHtml(pnl, xmlHttp);

            //Process scripts...
            P.processScripts(xmlHttp);
        });

        return false;
    },
    post: function (frm, pnl) {
        //Parse the form.
        var form = P.getForm(frm);
        form += (form != "" ? "&" : "") + "ajax=1";

        //Track the page view with Google Analytics.
        try {
            var page = frm.action.replace(P.siteUrl, "");
            //_gaq.push(['_trackPageview', page]);
            pageTracker._trackPageview(page);
        } catch (e) { }

        //Show Progress
        if (PAjax.post.arguments.length == 2) {
            P.progress(pnl);
        }
        else {
            P.progress2(pnl);
        }

        //Get the new page.
        PAjax.$p(frm.action, form, function (xmlHttp) {
            //Set the panel html.
            P.setHtml(pnl, xmlHttp);

            //Process scripts...
            P.processScripts(xmlHttp);
        });

        return false;
    }
};

//------------------------
//--- END OF AJAX CODE ---
//------------------------

//------------------------------
//--- START OF FACEBOOK CODE ---
//------------------------------

var Facebook = {
    signedRequest: null,
    accessToken: null,
    userId: null,
    registered: false,
    cookie: null,
    login: function (permissions, targetUrl, pnl) {
        FB.login(function (response) {
            try {
                if (response.authResponse) {
                    Facebook.signedRequest = response.authResponse.signedRequest;
                    Facebook.accessToken = response.authResponse.accessToken;
                    Facebook.userId = response.authResponse.userID;

                    //Get the target url
                    if (targetUrl != null && targetUrl != "") {
                        targetUrl += (targetUrl.indexOf("?") > -1 ? "&" : "?") + "signed_request=" + Facebook.signedRequest + "&uat=" + Facebook.accessToken;

                        if (pnl != null && pnl != "") {
                            P.get(targetUrl, pnl);
                        }
                        else {
                            P.get(targetUrl, "content");
                        }
                    }
                } else {
                    // user is not logged in
                    Facebook.signedRequest = null;
                    Facebook.accessToken = null;
                    Facebook.userId = false;
                }
            } catch (e) { alert(e.Message); }
        }, { scope: permissions });

        return false;
    },
    logout: function (targetUrl, pnl) {
        FB.logout(function (response) {
            // user is now logged out
            Facebook.signedRequest = null;
            Facebook.accessToken = null;
            Facebook.userId = null;

            //Get the target url
            if (targetUrl != null && targetUrl != "") {
                targetUrl += (targetUrl.indexOf("?") > -1 ? "&" : "?") + "signed_request=" + Facebook.signedRequest + "&uat=" + Facebook.accessToken;

                if (pnl != null && pnl != "") {
                    P.get(targetUrl, pnl);
                }
                else {
                    P.get(targetUrl, "content");
                }
            }
        });

        return false;
    },
    getLoginStatus: function () {
        FB.getLoginStatus(function (response) {
            if (response.session) {
                // logged in and connected user, someone you know
                Facebook.signedRequest = response.authResponse.signedRequest;
                Facebook.accessToken = response.authResponse.accessToken;
                Facebook.userId = response.authResponse.userID;
                return true;
            } else {
                // no user session available, someone you dont know
                Facebook.signedRequest = null;
                Facebook.accessToken = null;
                Facebook.userId = null;
                return false;
            }
        });
    },
    sendInvite: function (frm) {
        FB.ui(
        {
            method: "apprequests",
            title: frm["title"].value,
            message: frm["description"].value,
            data: frm["fromuid"].value,
            exclude_ids: frm["excludeids"].value,
            max_recipients: frm["max_recipients"].value,
            filters: frm["filters"].value
        },
        function (response) {
            if (response && response.request) {
                var url = P.siteUrl + "/CreateInvite.aspx?requestid=" + response.request + "&uid=" + response.to;

                if (P.isFB) {
                    url += "&isfb=1";
                }

                if (Facebook.cookie) {
                    url += "&" + Facebook.cookie;
                }

                if (P.auth) {
                    url += "&" + P.auth;
                }

                var xmlHttp = P.xmlHttpObjectGet(url);
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4) {
                        P.get(P.siteUrl + "/Welcome.aspx", "content", true);
                    }
                };
                xmlHttp.send(null);
            }
        });

        return false;
    },
    post: function (link, picture, name, caption, description, actions, callback) {
        FB.ui({
            method: "feed",
            link: link,
            picture: picture,
            name: name,
            caption: caption,
            description: description,
            actions: actions
        }, function (response) {
            callback(response);
        });

        return false;
    },
    send: function (frm) {
        FB.ui({
            method: "send",
            to: frm["to"].value,
            link: frm["link"].value,
            picture: frm["picture"].value,
            name: frm["name"].value,
            description: frm["description"].value
        });

        return false;
    }
};

//----------------------------
//--- END OF FACEBOOK CODE ---
//----------------------------

//---------------------------
//--- START OF MODAL CODE ---
//---------------------------

var Modal = {
    show: function (html) {
        P.scrollToTop();

        var winDim = PEvent.getWindowDimensions();
        document.documentElement.style.overflow = "hidden";

        var pnlModalHtml = P.$("pnlModalHtml");
        pnlModalHtml.innerHTML = html;

        var pnlModal = P.$("pnlModal");
        pnlModal.style.overflow = "visible";
        pnlModal.style.display = "inline-block";

        var tblDim = PEvent.getElementDimensions(pnlModalHtml);
        pnlModal.style.top = "0px";
        pnlModal.style.left = "0px";
        pnlModal.style.width = (winDim[0] + 20) + "px";
        pnlModal.style.height = (winDim[1] + 20) + "px";
        pnlModalHtml.style.marginTop = (Math.floor((winDim[1] - 100 - tblDim[1]) / 2)) + "px";
        pnlModalHtml.style.marginLeft = Math.floor((winDim[0] - tblDim[0]) / 2) + "px";

        pnlModal.style.visibility = "visible";
    },
    hide: function () {
        var pnlModal = P.$("pnlModal");
        pnlModal.style.left = "0px";
        pnlModal.style.top = "-2000px";
        pnlModal.style.width = "1px";
        pnlModal.style.height = "1px";
        pnlModal.style.overflow = "hidden";
        pnlModal.style.visibility = "hidden";
        pnlModal.style.display = "none";
        document.documentElement.style.overflow = "auto";
    },
    get: function (url) {
        var pnlModalHtml = P.$("pnlModalHtml");
        P.get(url, "pnlModalHtml");
        return false;
    }
};

//-------------------------
//--- END OF MODAL CODE ---
//-------------------------

//---------------------------
//--- START OF EVENT CODE ---
//---------------------------

var PEvent = {
    e: function (evt) {
        this.event = PEvent.getEvent(evt);
        this.eventElement = PEvent.getEventElement(evt);
        this.eventElementPosition = PEvent.getEventElementPosition(evt);
        this.eventElementDimensions = PEvent.getEventElementDimensions(evt);
        this.windowDimensions = PEvent.getWindowDimensions();
    },
    getEvent: function (evt) {
        if (window.event) {
            return window.event;
        }
        else {
            return evt;
        }
    },
    getEventElement: function (evt) {
        var e = PEvent.getEvent(evt);

        var elm;
        if (e.srcElement) {
            elm = e.srcElement;
        }
        else {
            elm = e.target;
        }

        return elm;
    },
    getEventElementPosition: function (evt) {
        var obj = PEvent.getEventElement(evt);

        var curleft = 0;
        var curtop = 0;

        if (obj.offsetParent) {
            curleft = obj.offsetLeft;
            curtop = obj.offsetTop;

            while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            }
        }

        return [curleft, curtop];
    },
    getEventElementDimensions: function (evt) {
        var obj = PEvent.getEventElement(evt);

        var innerWidth = 0;
        var innerHeight = 0;

        if (obj.offsetWidth) {
            innerWidth = obj.offsetWidth;
            innerHeight = obj.offsetHeight;
        }
        else {
            innerWidth = obj.clientWidth;
            innerHeight = obj.clientHeight;
        }

        return [innerWidth, innerHeight];
    },
    getElementPosition: function (obj) {
        var curleft = 0;
        var curtop = 0;

        if (obj.offsetParent) {
            curleft = obj.offsetLeft;
            curtop = obj.offsetTop;

            while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            }
        }

        return [curleft, curtop];
    },
    getElementDimensions: function (obj) {
        var innerWidth = 0;
        var innerHeight = 0;

        if (obj.offsetWidth) {
            innerWidth = obj.offsetWidth;
            innerHeight = obj.offsetHeight;
        }
        else {
            innerWidth = obj.clientWidth;
            innerHeight = obj.clientHeight;
        }

        return [innerWidth, innerHeight];
    },
    getWindowDimensions: function () {
        if (window.innerWidth) {
            return [window.innerWidth, window.innerHeight];
        }
        else if (document.documentElement.clientHeight != 0) {
            return [document.documentElement.clientWidth, document.documentElement.clientHeight];
        }
        else if (document.body.clientWidth != 0) {
            return [document.body.clientWidth, document.body.clientHeight];
        }
        else {
            return [0, 0];
        }
    },
    getDocumentDimensions: function () {
        var D = document;
        var width = Math.max(
            Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
            Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
            Math.max(D.body.clientWidth, D.documentElement.clientWidth)
        );

        var height = Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );

        return [width, height];
    },
    getIFrameWindowDimensions: function (iframe) {
        if (iframe.contentWindow.document.body.clientWidth) {
            return [iframe.contentWindow.document.body.clientWidth, iframe.contentWindow.document.body.clientHeight];
        }

        if (iframe.contentDocument.width) {
            return [iframe.contentDocument.width, iframe.contentDocument.height];
        }

        return [0, 0];
    },
    getScrollXY: function () {
        var scrOfX = 0, scrOfY = 0;

        if (typeof (window.pageYOffset) == "number") {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        }
        else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        }
        else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }

        return [scrOfX, scrOfY];
    }
};

//-------------------------
//--- END OF EVENT CODE ---
//-------------------------