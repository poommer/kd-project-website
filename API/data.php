<?php

$url = "https://script.google.com/macros/s/AKfycbyBqzBSYjM5gC_npg0-z_eRYh_7PQHkpQfNcHL7nkdMTh9U1Ap5BasTndfEVjeaqV0naA/exec";

$response = file_get_contents($url);

// แปลงข้อมูล JSON เป็นอาเรย์หรือออบเจกต์ PHP
$result = json_decode($response, true);

?>

<html>

<head>
	<title>Example GetData From Google Sheet.</title>
	<style>
		#data {
			font-family: Arial, Helvetica, sans-serif;
			border-collapse: collapse;
			width: 100%;
		}

		#data td,
		#data th {
			border: 1px solid #ddd;
			padding: 8px;
		}

		#data tr:nth-child(even) {
			background-color: #f2f2f2;
		}

		#data tr:hover {
			background-color: #ddd;
		}

		#data th {
			padding-top: 12px;
			padding-bottom: 12px;
			text-align: left;
			background-color: #04AA6D;
			color: white;
		}

		h2 {
			text-align: center;
		}
	</style>
</head>

<body>
	<h2>Example Get Data From Google Sheet.</h2>
	<table id="data">
		<thead>
			<tr>
			<th>timestamp</th>
			<th>deviceID</th>
			<th>date</th>
			<th>time</th>
			<th>msg</th>
			<th>timePeriod</th>
			<th>longGi_laTi</th>
			<th>address</th>

			</tr>
		</thead>
		<tbody>
			<?php if (!empty($result)) : ?>
				<?php foreach ($result as $key => $value) : ?>
					<tr>
						<td><?php echo $value['timestamp']; ?></td>
						<td><?php echo $value['deviceID']; ?></td>
						<td><?php echo $value['date']; ?></td>
						<td><?php echo $value['time']; ?></td>
						<td><?php echo $value['msg']; ?></td>
						<td><?php echo $value['timePeriod']; ?></td>
						<td><?php echo $value['longGi_laTi']; ?></td>
						<td><?php echo $value['address']; ?></td>
					</tr>
				<?php endforeach; ?>
			<?php endif; ?>
		</tbody>
	</table>
</body>

</html>