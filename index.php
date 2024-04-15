<?php 
/*
require('vendor/autoload.php');

use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;

$server   = 'mqtt-dashboard.com';
$port     = 1883;
/*$clientId = 'client_' . rand(5, 15); // ต้องระบุ client id เป็นสตริง
$username = 'emqx_user';
$password = 'public';*/
/*
$clean_session = false;
$mqtt_version = MqttClient::MQTT_3_1_1;

$mqtt = new MqttClient($server, $port); // สร้างอ็อบเจกต์ MqttClient

$connectionSettings = (new ConnectionSettings)
  //->setUsername($username)
  //->setPassword($password)
  ->setKeepAliveInterval(60)
  ->setLastWillTopic('emqx/test/last-will')
  ->setLastWillMessage('client disconnect')
  ->setLastWillQualityOfService(1);

$mqtt->connect($connectionSettings); // เชื่อมต่อ MQTT broker

$mqtt->subscribe('kbG4/#', function ($topic, $message) {
  printf("Received message on topic [%s]: %s\n", $topic, $message);
}, 0);

// เสร็จสิ้นการใช้งาน
*/ ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
<script src="script.js"></script>
</html>