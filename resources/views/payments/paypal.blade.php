<!DOCTYPE html>
<html>

<head>
    <title>Pay with PayPal</title>
    @php
    $merchant = $payment->merchant ?? null;

    if ($merchant && isset($merchant->mode) && (isset($merchant->sandbox_client_id) ||
    isset($merchant->live_client_id))) {
    $clientId = $merchant->mode === 'live' ? $merchant->live_client_id : $merchant->sandbox_client_id;
    } else {
    $clientId = config('paypal.client_id');
    }

    // ✅ Currency code set
    $currencyCode = $payment->currency->code ?? 'USD';
    @endphp

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://www.paypal.com/sdk/js?client-id={{ $clientId }}&currency={{ $currencyCode }}&intent=capture">
    </script>


</head>

<body>
    <h2>Pay Invoice #{{ $payment->invoice_id }}</h2>
    <p>Amount: {{ number_format($payment->amount, 2) }} {{ $currencyCode }}</p>

    <div id="paypal-button-container"></div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return axios.post('{{ route("paypal.createOrder") }}', {
                payment_id: {{ $payment->id }}
            }, {
                headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'}
            })
            .then(res => {
                if(!res.data.id) {
                    throw new Error("Order ID missing");
                }
                return res.data.id;
            })
            .catch(err => {
            });
        },
       onApprove: function(data, actions) {
    return axios.post('{{ route("paypal.captureOrder") }}', {
        payment_id: {{ $payment->id }},
        orderID: data.orderID
    }, {
        headers: {'X-CSRF-TOKEN': '{{ csrf_token() }}'}
    })
    .then(res => {
        window.location.href = "{{ route('paypal.success') }}?invoice_id={{ $payment->invoice_id }}&paymentId=" + data.orderID;
    })
    .catch(err => {
        console.error(err);
    });
},


        onCancel: function(data) {
                window.location.href = "{{ rtrim($payment->brand->portal_url ?? url('/'), '/') . '/payment/cancel' }}";
        }
    }).render('#paypal-button-container');
});
    </script>
</body>

</html>