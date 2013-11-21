<%@ Page Language="C#" AutoEventWireup="true" EnableViewState="false" Inherits="_Register" Codebehind="Register.aspx.cs" %>

<div style="width:810px;height:664px;overflow:hidden;padding:100px 10px 0px 10px;background-image:url('<% = utils.SiteUrl %>/images/bg_register.jpg');">
    <table cellpadding="0" cellspacing="0" border="0" width="790">
        <tr>
		    <td style="text-align:center;">
                <strong>Upload a picture of yourself with Herbal Ice or enter the on pack barcode for an entry into the grand prize of R20,000. Like, Comment and Share the posts on our news feed to stand a chance of winning more prizes.</strong>
            </td>
	    </tr>
        <tr>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td style="padding-left:40px;">
                <form id="form1" clientidmode="Static" method="post" target="uploader" runat="server">
                    <asp:HiddenField ID="FacebookID" runat="server" />
                    <asp:HiddenField ID="FacebookAccessToken" runat="server" />
                    <asp:HiddenField ID="Process" Value="1" runat="server" />
                    <input type="hidden" name="fbs_app_<% = utils.FacebookAppID %>" value="<% = fbCookie %>" />
                    <table cellpadding="0" cellspacing="0" border="0" width="730">
                        <tr>
                            <td colspan="2"><h1>Confirm your details below</h1></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr height="36" valign="middle">
                            <td width="150" class="formlabel"><asp:Label ID="lblName" runat="server" Text="Name:"></asp:Label></td>
                            <td width="580"><asp:TextBox ID="FirstName" Width="280" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr height="36" valign="middle">
                            <td class="formlabel"><asp:Label ID="lblSurname" runat="server" Text="Surname:"></asp:Label></td>
                            <td><asp:TextBox ID="LastName" Width="280" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr height="36" valign="middle">
                            <td class="formlabel"><asp:Label ID="lblEmail" runat="server" Text="Email Address:"></asp:Label></td>
                            <td><asp:TextBox ID="Email" Width="280" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr height="36" valign="middle">
                            <td class="formlabel"><asp:Label ID="lblArea" runat="server" Text="Area:"></asp:Label></td>
                            <td><asp:TextBox ID="Area" Width="280" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr height="36" valign="middle">
                            <td class="formlabel"><asp:Label ID="lblMobile" runat="server" Text="Cell:"></asp:Label></td>
                            <td><asp:TextBox ID="Cell" Width="150" MaxLength="10" runat="server"></asp:TextBox>&nbsp;<strong>Example: 0831234567</strong></td>
                        </tr>
                        <tr height="36" valign="middle">
                            <td class="formlabel"><asp:Label ID="lblGender" runat="server" Text="Gender:"></asp:Label></td>
                            <td>
                                <asp:DropDownList ID="Gender" runat="server" style="width:150px;font-size:18px;color:#9292a9;">
                                    <asp:ListItem Text="MALE" Value="Male"></asp:ListItem>
                                    <asp:ListItem Text="FEMALE" Value="Female"></asp:ListItem>
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr height="36" valign="middle">
                            <td class="formlabel"><asp:Label ID="lblAge" runat="server" Text="Age:"></asp:Label></td>
                            <td><asp:TextBox ID="Age" Width="150" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <table cellpadding="0" cellspacing="0" border="0" width="730">
                                    <tr valign="top">
                                        <td style="width:249px;height:69px;padding:48px 0px 0px 90px;overflow:hidden;background-image:url('<% = utils.SiteUrl %>/images/upload.jpg');">
                                            <asp:FileUpload ID="Upload" Width="230" MaxLength="10" runat="server"></asp:FileUpload>
                                        </td>
                                        <td style="width:52px;">&nbsp;</td>
                                        <td style="width:249px;height:69px;padding:48px 0px 0px 90px;overflow:hidden;background-image:url('<% = utils.SiteUrl %>/images/barcode.jpg');">
                                            <asp:TextBox ID="Barcode" Width="230" MaxLength="10" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr height="36" valign="middle">
                            <td><input type="image" src="<% = utils.SiteUrl %>/images/submit.png" width="218" height="55" border="0" /></td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>
                    <!--
                    <div style="position:absolute;left:300px;top:466px;">
                        <input type="image" src="<% = utils.SiteUrl %>/images/submit.png" width="114" height="35" border="0" onclick="return PSubmit.register(this.form);" />
                    </div>
                    -->
                </form>
                <iframe id="uploader" name="uploader" src="" style="display:none;"></iframe>
            </td>
        </tr>
        <tr>
            <td>&nbsp;</td>
        </tr>
        <tr>
		    <td style="text-align:center;">
                <strong>Terms and Conditions</strong><br /><br />
                <div style="font-size:12px;color:#7c8089;">
                    This promotion is in no way sponsored, endorsed or administered by, or associated with, Facebook. <br />
                    You are providing your information to Herbal Ice and not to Facebook. The information you provide will only be used for Promotion.
                </div>
            </td>
	    </tr>
    </table>
    <%  if (message.Length > 0)
        { %>
    <script type="text/javascript">
        alert("<% = message.Replace("\r", "\\r").Replace("\n", "\\n") %>");
    </script>
    <%  } %>
</div>