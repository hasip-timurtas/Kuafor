export const buildInvitationToJoin = ({
  firstName,
  invitedByFirst,
  supportEmail,
  actionUrl,
  appUrl,
  invitedByName,
  businessName,
}) => {

  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml><![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE">
    <title>kuafor Email Reminder</title>
</head>
<body style="width: 100% !important;min-width: 100%;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100% !important;margin: 0;padding: 0;background-color: #FFFFFF">

<style id="media-query">
    /* Client-specific Styles & Reset */
    #outlook a {
        padding: 0;
    }

    /* .ExternalClass applies to Outlook.com (the artist formerly known as Hotmail) */
    .ExternalClass {
        width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height: 100%;
    }

    #backgroundTable {
        margin: 0;
        padding: 0;
        width: 100% !important;
        line-height: 100% !important;
    }

    /* Buttons */
    .button a {
        display: inline-block;
        text-decoration: none;
        -webkit-text-size-adjust: none;
        text-align: center;
    }

    .button a div {
        text-align: center !important;
    }

    /* Outlook First */
    body.outlook p {
        display: inline !important;
    }

    /*  Media Queries */
    @media only screen and (max-width: 500px) {
        table[class="body"] img {
            height: auto !important;
            width: 100% !important;
        }

        table[class="body"] img.fullwidth {
            max-width: 100% !important;
        }

        table[class="body"] center {
            min-width: 0 !important;
        }

        table[class="body"] .container {
            width: 95% !important;
        }

        table[class="body"] .row {
            width: 100% !important;
            display: block !important;
        }

        table[class="body"] .wrapper {
            display: block !important;
            padding-right: 0 !important;
        }

        table[class="body"] .columns, table[class="body"] .column {
            table-layout: fixed !important;
            float: none !important;
            width: 100% !important;
            padding-right: 0px !important;
            padding-left: 0px !important;
            display: block !important;
        }

        table[class="body"] .wrapper.first .columns, table[class="body"] .wrapper.first .column {
            display: table !important;
        }

        table[class="body"] table.columns td, table[class="body"] table.column td, .col {
            width: 100% !important;
        }

        table[class="body"] table.columns td.expander {
            width: 1px !important;
        }

        table[class="body"] .right-text-pad, table[class="body"] .text-pad-right {
            padding-left: 10px !important;
        }

        table[class="body"] .left-text-pad, table[class="body"] .text-pad-left {
            padding-right: 10px !important;
        }

        table[class="body"] .hide-for-small, table[class="body"] .show-for-desktop {
            display: none !important;
        }

        table[class="body"] .show-for-small, table[class="body"] .hide-for-desktop {
            display: inherit !important;
        }

        .mixed-two-up .col {
            width: 100% !important;
        }
    }

    @media screen and (max-width: 500px) {
        div[class="col"] {
            width: 100% !important;
        }
    }

    @media screen and (min-width: 501px) {
        table[class="container"] {
            width: 500px !important;
        }
    }
</style>
<table class="body"
       style="border-spacing: 0;border-collapse: collapse;vertical-align: top;height: 100%;width: 100%;table-layout: fixed"
       cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
    <tr style="vertical-align: top">
        <td class="center"
            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;text-align: center;background-color: #FFFFFF" align="center" valign="top">

            <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top;background-color: transparent" cellpadding="0" cellspacing="0" align="center" width="100%" border="0">
                <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"
                        width="100%">
                        <!--[if gte mso 9]>
                      <table id="outlookholder" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                          <td>
                        <![endif]-->
                        <!--[if (IE)]>
                      <table width="500" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                        <![endif]-->
                        <table class="container"
                               style="border-spacing: 0;border-collapse: collapse;vertical-align: top;max-width: 500px;margin: 0 auto;text-align: inherit"
                               cellpadding="0" cellspacing="0" align="center" width="100%" border="0">
                            <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"
                                    width="100%">
                                    <table class="block-grid"
                                           style="border-spacing: 0;border-collapse: collapse;vertical-align: top;width: 100%;max-width: 500px;color: #000000;background-color: transparent"
                                           cellpadding="0" cellspacing="0" width="100%" bgcolor="transparent">
                                        <tbody>
                                        <tr style="vertical-align: top">
                                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;text-align: center;font-size: 0">
                                                <!--[if (gte mso 9)|(IE)]>
                                              <table width="100%" align="center" bgcolor="transparent" cellpadding="0"
                                                     cellspacing="0" border="0">
                                                <tr><![endif]--><!--[if (gte mso 9)|(IE)]>
                                              <td valign="top" width="500"><![endif]-->
                                                <div class="col num12"
                                                     style="display: inline-block;vertical-align: top;width: 100%">
                                                    <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top"
                                                           cellpadding="0" cellspacing="0" align="center" width="100%"
                                                           border="0">
                                                        <tbody>
                                                        <tr style="vertical-align: top">
                                                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;background-color: transparent;padding-top: 30px;padding-right: 0px;padding-bottom: 30px;padding-left: 0px;border-top: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-left: 0px solid transparent">
                                                                <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top"
                                                                       cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-top: 10px;padding-right: 10px;padding-bottom: 30px;padding-left: 10px">
                                                                            <div style="color:#4E596B;line-height:150%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;">
                                                                                <div style="font-size:12px;line-height:18px;color:#4E596B;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;">

                                                                                    <p style="margin: 0;font-size: 12px;line-height: 18px;text-align: left">
                                                                                    <span style="font-size: 16px; line-height: 24px;">Hey ${firstName},</span>
                                                                                    </p>
                                                                                    <p style="margin: 0;font-size: 12px;line-height: 18px;text-align: left">&nbsp;<br></p>
                                                                                    <p style="margin: 0;font-size: 12px;line-height: 18px;text-align: left">
                                                                                    <strong><span style="font-size: 16px; line-height: 24px;">We will be using kuafor to collaborate on your project.</span></strong>
                                                                                    </p>
                                                                                    <p style="margin: 0;font-size: 12px;line-height: 18px;text-align: left">&nbsp;<br></p>
                                                                                    <p style="margin: 0;font-size: 12px;line-height: 18px;text-align: left">
                                                                                    <span style="font-size: 16px; line-height: 24px;">You will be able to view progress, upload files, create tasks and chat with me directly from within kuafor.</span><br>
                                                                                    </p>

																																								</div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top"
                                                                       width="100%" border="0" cellspacing="0"
                                                                       cellpadding="0">
                                                                    <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td class="button-container"
                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-top: 0px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px"
                                                                            align="left">
                                                                            <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top"
                                                                                   width="100%" border="0"
                                                                                   cellspacing="0" cellpadding="0"
                                                                                   align="left">
                                                                                <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td class="button"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"
                                                                                        width="100%" align="left"
                                                                                        valign="middle">
                                                                                        <!--[if mso]>
                                                                                      <v:roundrect
                                                                                        xmlns:v="urn:schemas-microsoft-com:vml"
                                                                                        xmlns:w="urn:schemas-microsoft-com:office:word"
                                                                                        href="${actionUrl}"
                                                                                        style="
                    height:52px;
                    v-text-anchor:middle;
                    width:253px;"
                                                                                        arcsize="10%"
                                                                                        strokecolor="#88b1bf"
                                                                                        fillcolor="#88b1bf">
                                                                                        <w:anchorlock/>
                                                                                        <center
                                                                                          style="color:#ffffff;
                      font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;
                      font-size:16px;">
                                                                                        <![endif]-->
                                                                                        <!--[if !mso]><!- - -->
                                                                                        <div style="display: inline-block;
              border-radius: 5px;
              -webkit-border-radius: 5px;
              -moz-border-radius: 5px;
              max-width: 100%;
              width: auto;
              border-top: 0px solid transparent;
              border-right: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-left: 0px solid transparent;" align="left">

                                                                                            <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top;height: 52"
                                                                                                   width="100%"
                                                                                                   border="0"
                                                                                                   cellspacing="0"
                                                                                                   cellpadding="0">
                                                                                                <tbody>
                                                                                                <tr style="vertical-align: top">
                                                                                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;border-radius: 5px;                   -webkit-border-radius: 5px;                   -moz-border-radius: 5px;                  color: #ffffff;                  background-color: #88b1bf;                  padding-top: 10px;                   padding-right: 25px;                  padding-bottom: 10px;                  padding-left: 25px;                  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align: center"
                                                                                                        valign="middle">
                                                                                                        <!--<![endif]-->
                                                                                                        <a style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;background-color: #88b1bf;color: #ffffff"
                                                                                                           href="${actionUrl}"
                                                                                                           target="_blank">
                                                                                                            <span style="font-size:16px;line-height:32px;"><span
                                                                                                                    style="font-size: 16px; line-height: 32px;"
                                                                                                                    data-mce-style="font-size: 16px;">Accept ${ invitedByFirst }'s invitation</span></span>
                                                                                                        </a>
                                                                                                        <!--[if !mso]><!- - -->
                                                                                                    </td>
                                                                                                </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div><!--<![endif]-->
                                                                                        <!--[if mso]>
                                                                                      </center>
                                                                                      </v:roundrect>
                                                                                        <![endif]-->
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--[if (gte mso 9)|(IE)]></td><![endif]-->
                                                <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <!--[if mso]>
                      </td></tr></table>
                        <![endif]-->
                        <!--[if (IE)]>
                      </td></tr></table>
                        <![endif]-->
                    </td>
                </tr>
                </tbody>
            </table>
            <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top;background-color: #F0F4F7"
                   cellpadding="0" cellspacing="0" align="center" width="100%" border="0">
                <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"
                        width="100%">
                        <!--[if gte mso 9]>
                      <table id="outlookholder" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                          <td>
                        <![endif]-->
                        <!--[if (IE)]>
                      <table width="500" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                        <![endif]-->
                        <table class="container"
                               style="border-spacing: 0;border-collapse: collapse;vertical-align: top;max-width: 500px;margin: 0 auto;text-align: inherit"
                               cellpadding="0" cellspacing="0" align="center" width="100%" border="0">
                            <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"
                                    width="100%">
                                    <table class="block-grid"
                                           style="border-spacing: 0;border-collapse: collapse;vertical-align: top;width: 100%;max-width: 500px;color: #000000;background-color: transparent"
                                           cellpadding="0" cellspacing="0" width="100%" bgcolor="transparent">
                                        <tbody>
                                        <tr style="vertical-align: top">
                                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;text-align: center;font-size: 0">
                                                <!--[if (gte mso 9)|(IE)]>
                                              <table width="100%" align="center" bgcolor="transparent" cellpadding="0"
                                                     cellspacing="0" border="0">
                                                <tr><![endif]--><!--[if (gte mso 9)|(IE)]>
                                              <td valign="top" width="500"><![endif]-->
                                                <div class="col num12"
                                                     style="display: inline-block;vertical-align: top;width: 100%">
                                                    <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top"
                                                           cellpadding="0" cellspacing="0" align="center" width="100%"
                                                           border="0">
                                                        <tbody>
                                                        <tr style="vertical-align: top">
                                                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;background-color: transparent;padding-top: 20px;padding-right: 10px;padding-bottom: 20px;padding-left: 10px;border-top: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-left: 0px solid transparent">
                                                                <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top"
                                                                       cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px">
                                                                            <div style="color:#959EAE;line-height:150%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;">
                                                                                <div style="font-size:12px;line-height:18px;color:#959EAE;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;">
                                                                                    <p style="margin: 0;font-size: 12px;line-height: 18px;text-align: left">
                                                                                        <span style="font-size: 12px; line-height: 18px;">This email was sent by <a
                                                                                                style="color:#959EAE;text-decoration: underline;"
                                                                                                href="https://kuafor.com"
                                                                                                target="_blank">kuafor</a>.&nbsp;</span>
                                                                                    </p>
																																									</div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--[if (gte mso 9)|(IE)]></td><![endif]-->
                                                <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <!--[if mso]>
                      </td></tr></table>
                        <![endif]-->
                        <!--[if (IE)]>
                      </td></tr></table>
                        <![endif]-->
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody>
</table>


</body>
</html>
`;

};
