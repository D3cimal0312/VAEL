const buildEmailHTML = ({ subject, body, unsubscribeUrl }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${subject}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Cormorant+Garamond:wght@400;500&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:'DM Sans',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:48px 16px;">

        <table width="580" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:580px;width:100%;background:#faf6f0;border-radius:4px;overflow:hidden;border:1px solid #f2ede3;">

          <!-- Top gold bar -->
          <tr>
            <td style="background:#b5713a;height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:36px 40px 28px;background:#faf6f0;border-bottom:1px solid #f2ede3;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;font-family:'DM Sans',Arial,sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#b5713a;">
                      ${process.env.EMAIL_FROM_NAME}
                    </p>
                    <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:500;color:rgb(45,42,42);line-height:1.3;">
                      ${subject}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider rule -->
          <tr>
            <td style="padding:0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="height:1px;background:#f2ede3;font-size:0;line-height:0;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px 36px;color:#2d2a2a;font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.75;">
              ${body}
            </td>
          </tr>

          <!-- Bottom rule -->
          <tr>
            <td style="padding:0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="height:1px;background:#f2ede3;font-size:0;line-height:0;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 28px;background:#f5f0e8;text-align:center;">
              <p style="margin:0 0 10px;font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#99938b;line-height:1.6;">
                You received this because you subscribed to updates from
                <span style="color:rgb(45,42,42);font-weight:500;">${process.env.EMAIL_FROM_NAME}</span>.
              </p>
              <a href="${unsubscribeUrl}"
                 style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#b5713a;text-decoration:none;border-bottom:1px solid #d4905a;padding-bottom:1px;">
                Unsubscribe
              </a>
            </td>
          </tr>

          <!-- Bottom gold bar -->
          <tr>
            <td style="background:#b5713a;height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

        </table>

        <!-- Below-card copyright -->
        <p style="margin:20px 0 0;font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#99938b;text-align:center;">
          &copy; ${new Date().getFullYear()} ${process.env.EMAIL_FROM_NAME}. All rights reserved.
        </p>

      </td>
    </tr>
  </table>

</body>
</html>`;

export default buildEmailHTML;