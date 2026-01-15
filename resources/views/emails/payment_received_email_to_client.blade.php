<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />

    <!-- CSS Reset : BEGIN -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

        html,
        body {
            font-family: "Roboto", sans-serif;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        .logo-items-main {
            text-align: center;
            margin-bottom: 20px;
        }

        .main-title-box {
            text-align: center;
        }

        .main-title-box h2 {
            margin-bottom: 20px;
        }

        .main-btn {
            text-align: center;
        }

        .main-btn a {
            padding: 12px 20px;
            display: inline-block;
            background-color: #15aba2;
            color: #fff;
            text-decoration: none;
            font-size: 15px;
            border-radius: 5px;
        }

        p {
            line-height: 1.5;
        }

        .simple-text {
            text-align: center;
            margin-top: 30px;
        }

        .cust-table {
            border: 1px solid #80808087;
            border-collapse: collapse;
            width: 100%;
            margin-top: 15px;
        }

        .cust-table tr th,
        .cust-table tr td {
            padding: 8px 10px;
            border: 1px solid #80808047;
            text-align: left;
            font-size: 15px;
        }

        .main-title-box p {
            margin-bottom: 4px;
        }

        .bottom-text {
            text-align: center;
            margin: 20px 0px 13px 0px;
        }
    </style>


</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">
    <center style="width: 100%;">
        <div style="max-width: 400px; margin: 0 auto; border: 1px solid #80808047; padding: 40px 30px; box-sizing: border-box; border-radius: 10px; margin-top: 50px;"
            class="email-container">
            <!-- BEGIN BODY -->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="margin: auto;">
                <tr>
                    <td>
                        <div class="logo-items-main">
                            <img src="{{ $brand && $brand->logo
    ? $brand->logo 
    
    : public_path('image/no-image.webp') }}" alt="Logo">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="main-title-box">
                            <h2>Payment Received – Thank You!</h2>
                            <p>
                                Dear <strong>
                                    {{ $payment->model->first_name ?? $payment->model->full_name }}
                                </strong>,
                            </p>
                            <p>We have successfully received your payment.</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="simple-text">
                            <p>Here are your payment details:</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table class="cust-table">
                            <tbody>
                                <tr>
                                    <th>Transaction ID</th>
                                    <td>{{ $payment->transaction_id }}</td>
                                </tr>
                                <tr>
                                    <th>Amount Paid</th>
                                    <td>{{ $payment->amount }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="bottom-text">
                            <p>Thank you for your trust!</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>