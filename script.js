console.log(mqtt)
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
    const host = 'ws://broker.emqx.io:8083/mqtt'
    const options = {
      keepalive: 60,
      clientId: clientId,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
    }
    console.log('Connecting mqtt client')
    const client = mqtt.connect(host, options)
    client.on('error', (err) => {
      console.log('Connection error: ', err)
      client.end()
    })
    client.on('reconnect', () => {
      console.log('Reconnecting...')
    })



    client.on('connect', () => {
        console.log(`Client connected: ${clientId}`)
        // Subscribe
        client.subscribe('kbG4/test01', { qos: 0 })
      })
      // Unsubscribe
    //   client.unubscribe('testtopic', () => {
    //     console.log('Unsubscribed');
    //   })
      
      // Publish
// client.publish('testtopic', 'ws connection demo...!', { qos: 0, retain: false })
// Receive
client.on('message', (topic, message, packet) => {
    var mqttD = message.toString();
    var dID = topic.split("/")[1];

  console.log(`Received Message: ${mqttD} On topic: ${dID}`)
  $.ajax({
    type: "POST",
    url: "API/create-data.php",
    data: {
        val : mqttD,
        mID : dID
    },dataType: "json",
    success: function (response) {
        console.log(response);
    }
    
  });
})
