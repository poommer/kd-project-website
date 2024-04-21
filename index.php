<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style.css">
	<title>t</title>
</head>

<body>
	<?php
	/*
// ข้อมูล response จาก API
$response = '{
  "timestamp": "2024-04-21 04:39:20",
  "success": true,
  "response": [
    {
      "timestamp": "2024-04-21 04:21:03",
      "deviceID": "Dv02",
      "timePeriod": "Night",
      "location": "13.828653239514567, 100.51947436927055",
      "address": "Khwaeng Wong Sawang, Khet Bang Sue, Krung Thep Maha Nakhon 10800"
    }
  ]
}';

// แปลงข้อมูล JSON เป็น array associative
$data = json_decode($response, true);

// ตรวจสอบว่ามีข้อมูล response ที่ถูกต้องหรือไม่
if ($data && $data['success']) {
    // ดึงข้อมูลจาก response
    $timestamp = $data['timestamp'];
    $responseData = $data['response'][0];

    // แสดงข้อมูล
    echo "Timestamp: " . $timestamp . "\n";
    echo "Device ID: " . $responseData['deviceID'] . "\n";
    echo "Time Period: " . $responseData['timePeriod'] . "\n";
    echo "Location: " . $responseData['location'] . "\n";
    echo "Address: " . $responseData['address'] . "\n";
} else {
    // ถ้าไม่สามารถดึงข้อมูลได้หรือมีข้อผิดพลาด
    echo "Failed to retrieve data from the response.";
}*/

	?>

	<header>
		<img src="img/logo.png" alt="">
		<div class="h-text">
			<h2>
				Elephant detection dashboard
			</h2>

			<h4>
				from elephant detection device : <span style="color:#F3CF29;">"Hen chang nuu mai"</span>
			</h4>
		</div>

	</header>

	<main>
		<div class="row">
			<section id="mostDetected">
			<h1 style="display:flex; align-items:center; color:red;"><img src="https://cdn-icons-png.flaticon.com/128/9356/9356599.png" alt="" style="width:30px;">Most detected!</h1>
				<div class="row">
					
					<div class="card" style="width:70%;">
						<div class="card-head">
							<h2 style="display:flex; align-items:center;"><img src="https://cdn-icons-png.flaticon.com/128/9195/9195785.png" alt="" style="width:30px;">information & latest detected</h2>
						</div>

						<div class="card-body">
							<div class="row" style="justify-content: space-between;">
								<div class="groupData">
									<p>timestamp</p>
									<h4 id="timestamp">2024-04-18 22:37:03</h4>
								</div>

								<div class="groupData">
									<p>Device ID</p>
									<h4 id="DeviceID">Dv04</h4>
								</div>

								<div class="groupData">
									<p>Time Period</p>
									<h4 id="TimePeriod">Night</h4>
								</div>
							</div>

							<div class="row">
								<div class="groupData">
									<p>address</p>
									<h4 id="address">PP3H+6RX, Tambon Thung Phraya, Sanam Chai Khet District, Chachoengsao 24160</h4>
								</div>
							</div>
						</div>
					</div>

					<div class="col" style="width:30%; padding:0 0.5rem;">
						<h3>Total on device</h3>

						<div class="total-today total-card" style="border-color:#4193CC;">
						<div></div>
						<h3 style="margin-top: 1.5rem;">46</h3>
							<p style="text-align:end;">Today</p>

						</div>

						<div class="total-all total-card" style="border-color:#9D9BEE;">
							<div></div>
							<h3 style="margin-top: 1.5rem;">46</h3>
							<p style="text-align:end;">all</p>

						</div>
					</div>
				</div>



			</section>

			<section id="latestDetected">
				<h1>ตาราง</h1>
			</section>
		</div>
	</main>

	<footer>

	</footer>

</body>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="script.js"></script>

</html>