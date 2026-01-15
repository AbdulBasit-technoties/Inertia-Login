<!DOCTYPE html>
<html>

<head>
    <title>Payment Success</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="3;url={{ $portalUrl }}">
</head>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');

*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
body{
    font-family: "Nunito Sans", sans-serif;
}
.thank-you {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}
.thank-you-box {
    color: #fff;
    max-width: 500px;
    padding: 30px 30px;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.1px);
    -webkit-backdrop-filter: blur(8.1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    text-align: center;
    background-color: #ffffff40;
}
.thank-you-box h2 {
    font-size: 24px;
    margin-bottom: 15px;
    font-weight: 800;
}
.thank-icon {
    width: 100px;
    height: 100px;
    background-color: #BB2124;
    border-radius: 50%;
    padding: 30px;
    box-shadow: 0px 0px 20px -10px;
    margin: -80px auto 20px auto;
}
.thank-icon img {
    width: 100%;
    filter: invert(1);
}
.thank-you::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000082;
}
.thank-you-box p {
    margin-top: 10px;
    line-height: 1.4;
    font-size: 18px;
}

@media only screen and (min-width: 100px) and (max-width: 767px){
    .thank-icon {
        width: 80px;
        height: 80px;
        padding: 20px;
    }
    .thank-you-box {
        margin: 0px 20px;
        padding: 30px 20px;
    }
    .thank-you-box p {
        font-size: 16px;
    }
}

</style>

<body>
    

<section class="thank-you" style="background-image: url({{ asset('image/error-bg.jpeg') }});">
    <div class="thank-you-box">
        <div class="thank-icon">
            <img src="{{ asset('image/close.png') }}" alt="Icon">
        </div>
        <h2>Payment Cancelled!</h2>
        <p>Your payment process has been cancelled.</p>
        <p>If you face any issues, please contact our support team.</p>
    </div>
</section>


</body>

</html>