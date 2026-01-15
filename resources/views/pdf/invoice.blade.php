<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Invoice</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

        body {
            font-family: DejaVu Sans, Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
            color: #000;
        }

        /* ... (rest of your existing styles) ... */

        .header {
            text-align: end;
            margin-bottom: 10px;
        }

        .header img {
            max-height: 50px;
        }

        .invoice-title {
            font-size: 28px;
            font-weight: bold;
            color: #122746;
            margin: 10px 0;
        }

        .invoice-details {
            width: 100%;
            border-collapse: collapse;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0px 40px 0px;
        }

        .info-table th {
            background: #122746;
            color: #fff;
            padding: 8px;
            text-align: left;
            font-size: 14px;
        }

        .info-table td {
            border: 1px solid #122746;
            padding: 8px;
            font-weight: 400;
            font-size: 14px;
            color: #000;
        }

        .invoice-details tr td h3 {
            margin-bottom: 10px;
            margin-top: 0px;
        }

        .invoice-details tr td p {
            margin-bottom: 5px;
            margin-top: 0px;
        }

        .terms {
            margin-bottom: 0px;
            font-size: 12px;
            width: 50%;
            float: left;
        }

        .terms strong {
            font-size: 16px;
            color: #0c1446;
            margin-bottom: 5px;
            display: block;
        }

        .summary {
            margin-top: 50px;
            width: 40%;
            float: right;
            border-collapse: collapse;
        }

        .summary td {
            border: 1px solid #122746;
            padding: 6px 10px;
            font-size: 14px;
        }

        .summary tr.bg-darkblue td {
            background: #122746;
            color: #fff;
        }

        @page {
            margin: 0px 0px 0px 0px;
        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            width: 100%;
            background: #c81d5a;
        }

        .pdf-header {
            position: relative;
            width: 100%;
            height: 100px;
        }

        .pdf-header img {
            position: absolute;
            top: 0;
        }

        .corner-img {
            left: 0;
        }

        .corner-img-two {
            right: 0;
        }

        .center-logo-img {
            left: 50%;
            transform: translateX(-50%);
        }

        .header-logo {
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            margin: 150px 60px 0px 0px;
        }

        .pdf-cont-main {
            padding: 130px 30px 0px 30px;
        }

        .cash-batch {
            display: inline-block;
            padding: 6px 15px;
            font-size: 14px;
            color: white;
            border-radius: 4px;
            transform: translateY(8px);
            text-transform: capitalize;
        }

        .cash-batch.green {
            background-color: #3ed53e;
        }

        .cash-batch.red {
            background-color: #f05252;
        }

        .info-table tr td:empty {
            padding: 16px 0px;
        }

        .footer ul {
            display: table;
            margin: 13px auto 0 auto;
            padding: 0px !important;
        }

        .footer ul li {
            display: table-cell;
            border: 1px solid white;
            padding: 6px 15px;
            border-radius: 50px;
        }

        .footer ul li a {
            text-decoration: none;
            color: white;
        }

        .footer ul li img {
            width: 15px;
            margin-right: 8px;
        }

        .footer ul li span {
            transform: translateY(-2px);
            font-size: 14px;
        }

        .final-btn a {
            background-color: #3ed53e;
            padding: 10px 20px;
            text-decoration: none;
            color: white;
            border-radius: 4px;
            display: inline-block;
        }

        .final-btn {
            text-align: right;
            margin: 20px 0px 0px 85px;
            width: 100%;
        }
    </style>
</head>

<body>
    <div class="pdf-header">
        <img class="corner-img" src="{{ public_path('image/corner-img.png') }}" alt="Corner">
        <img class="corner-img-two" src="{{ public_path('image/corner-img-two.png') }}" alt="Corner">
        <img class="center-logo-img" src="{{ public_path('image/ioXXCw.png') }}" alt="Center Logo">
        <img class="header-logo" src="{{ $data->brand->logo }}"
            alt="Brand Logo">
    </div>

    <div class="pdf-cont-main">

        <div class="invoice-title">
            INVOICE :
            <span class="cash-batch {{ $data->status === 'unpaid' ? 'red' : 'green' }}">
                {{ $data->status }}
            </span>
        </div>


        <table class="invoice-details">
            <tr>
                <td>
                    <h3>Invoice to:</h3>
                    <p><strong>Name:</strong> {{ $data->bill_to ?? '-' }}</p>
                    <p><strong>Email:</strong> {{ $data->model->email ?? '-' }}</p>
                </td>
                <td align="right">
                    <p><strong>Invoice #:</strong> {{ $data->id ?? '-' }}</p>
                    <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($data->date ?? now())->format('d/M/Y') }}</p>
                </td>
            </tr>
        </table>

        <table class="info-table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Service Description</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                @php $grandTotal = 0; @endphp
                @foreach ($data->order->items ?? [] as $key => $item)
                @php $grandTotal += $item->price; @endphp
                <tr>
                    <td>{{ $key + 1 }}</td>
                    <td>{{ $item->service->name ?? '-' }}</td>
                    <td>${{ number_format($item->price, 2) }}</td>
                </tr>
                @endforeach
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>

        <div class="terms">
            <strong>Terms and Conditions</strong>
            <p>
                Thank you for your cooperation in ensuring prompt payment to maintain smooth and consistent service delivery.
            </p>
            <p><strong>Questions?</strong></p>
            <p>
                Email:
                {{ $data && $data->brand
                ? $data->brand->email
                : ($setting->email ?? '') }}
            </p>

            <p>
                Call:
                {{ $data && $data->brand && $data->brand->phone_1
                ? $data->brand->phone_1
                : ($setting->phone_primary ?? '') }}
            </p>

        </div>

        <table class="summary">
            <tr>
                <td>Total</td>
                <td align="right">${{ number_format($grandTotal, 2) }}</td>
            </tr>
            @php
            $received = $data->order->payments->where('status', 'Paid')->sum('amount') ?? 0;
            @endphp
            <tr>
                <td>Received</td>
                <td align="right">${{ number_format($received, 2) }}</td>
            </tr>
            <tr class="bg-darkblue">
                <td>Balance</td>
                <td align="right">${{ number_format($grandTotal - $received, 2) }}</td>
            </tr>

            @if(!empty($payUrl))
            <div class="final-btn">
                <a href="{{ $payUrl }}" target="_blank">
                    <b>Pay Now</b>
                </a>
            </div>
            @endif
        </table>

    </div>

    <div class="footer">
        <ul>
            @if(!empty($setting->facebook))
            <li><a href="{{ $setting->facebook }}" target="_blank"><img
                        src="{{ public_path('image/facebook.png') }}"><span>Facebook</span></a></li>
            @endif
            &nbsp;
            &nbsp;
            @if(!empty($setting->instagram))
            <li><a href="{{ $setting->instagram }}" target="_blank"><img src="{{ public_path('image/instagram.png') }}"
                        alt="Facebook"><span>Instagram</span></a></li>
            @endif
            &nbsp;
            &nbsp;
            @if(!empty($setting->linkedin))
            <li><a href="{{ $setting->linkedin }}" target="_blank"><img src="{{ public_path('image/linkedin.png') }}"
                        alt="Facebook"><span>Linkedin</span></a></li>
            @endif
        </ul>
    </div>

</body>

</html>