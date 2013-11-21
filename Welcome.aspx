<%@ Page Language="C#" AutoEventWireup="true" Inherits="_Welcome" Codebehind="Welcome.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">
<head>
    <title>Herbal Ice</title>
    <link href="<% = utils.SiteUrl %>/css/StyleSheet.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" type="image/x-icon" href="<% = utils.SiteUrl %>/favicon.ico" />
    <script type="text/javascript" src="<% = utils.SiteUrl %>/js/herbalice.js?ts=<% = DateTime.Now.Ticks %>"></script>
    <script type="text/javascript" src="<% = utils.SiteUrl %>/js/jquery-1.3.2.min.js"></script>
    <script type="text/javascript">
        P.siteUrl = "<% = utils.SiteUrl %>";
    </script>
</head>
<body style="width:810px;">
    <div id="fb-root"></div>
    <script type="text/javascript">
        window.fbAsyncInit = function () {
            FB.init({
                appId: '<% = utils.FacebookAppID %>',
                status: true,
                cookie: true,
                xfbml: true,
                oauth: true
            });

            FB.Canvas.setAutoGrow();
        };

        (function () {
            var e = document.createElement('script'); e.async = true;
            e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
            document.getElementById('fb-root').appendChild(e);
        } ());
    </script>
    <div id="page-container" style="position:relative;width:810px;overflow-x:hidden;min-height:500px;">
        <a name="top" id="top"></a>
        <div id="content" style="width:810px;overflow-x:hidden;">
        <%  if (!utils.FacebookSession.PageLiked)
            { %>
            <div style="width:810px;height:531px;background-image:url('<% = utils.SiteUrl %>/images/header_like.jpg');">&nbsp;</div>
        <%  }
            else if (utils.FacebookSession.PageLiked)
            {
                if (utils.FacebookUser.ID.Length != 0)
                {
                    String fbCookie = utils.GetFacebookAppCookieSession(utils.FacebookSession); %>
            <script type="text/javascript">
                Facebook.cookie = "fbs_app_<% = utils.FacebookAppID %>=<% = Server.UrlEncode(fbCookie) %>";
            </script>
            <%  }
                else
                {
                    //Facebook user is not signed in, so clear all cookies.
                    utils.ClearFacebookAppCookieSession();
                }
        
                if (redirectToRegister)
                { %>
            <script type="text/javascript">
                P.get("<% = utils.SiteUrl %>/Register.aspx", "content");
            </script>
            <%  }
                else
                { %>
            <a href="<% = utils.SiteUrl %>/Register.aspx" onclick="return P.get(this, 'content');"><img src="<% = utils.SiteUrl %>/images/enter.jpg" width="810" height="531" border="0" alt="" /></a>
            <%  }
            } %>    
        </div>
    </div>
    <div id="pnlModal" style="position:absolute;top:-2000px;left:0px;width:0px;height:0px;overflow:hidden;z-index:10;visibility:hidden;display:none;">
        <div style="position:absolute;width:100%;height:100%;z-index:11;opacity:0.7;filter:alpha(opacity=70);background-color:#000000;">&nbsp;</div>
        <div id="pnlModalHtml" style="position:absolute;z-index:12;"></div>
    </div>
    <script type="text/javascript">
        P.preLoadImages();
    </script>

    <!-- Start of Google Analytics Code -->
    <script type="text/javascript">
        var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
        document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript">
        try {
            var pageTracker = _gat._getTracker("UA-30422598-1");
            pageTracker._trackPageview();
        } catch (err) { }</script>
    <!-- End of Google Analytics Code -->
</body>
</html>