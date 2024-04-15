# import lib
import time
import paho.mqtt.client as mqtt

# ------------------------------------------------------------------------------------

# connection database



# MQTT function ----------------------------------------------------------------------

# MQTT func subscribe
def on_subscribe(client, userdata, mid, reason_code_list, properties):
    # Since we subscribed only for a single channel, reason_code_list contains
    # a single entry
    if reason_code_list[0].is_failure:
        print(f"Broker rejected you subscription: {reason_code_list[0]}")
    else:
        print(f"Broker granted the following QoS: {reason_code_list[0].value}")

# ---------------------------------------------------------------------------------

# MQTT func message

# สร้างตัวแปร global ไว้เก็บค่าที่ส่งมาผ่าน MQTT
mqtt_value = None



# MQTT func connect 
conStatus = None
def on_connect(client, userdata, flags, reason_code, properties):
    global conStatus
    if reason_code.is_failure:
        conStatus = 'not connected'
        print(f"Failed to connect: {reason_code}. loop_forever() will retry connection")
    else:
        # we should always subscribe from on_connect callback to be sure
        # our subscribed is persisted across reconnections.
        conStatus = 'connected'
        client.subscribe("kbG4/#")
    print(conStatus)


def on_publish(client, userdata, mid, reason_code, properties):
    client.publish('kbG4/0002','1')

mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqttc.on_publish = on_publish
mqttc.connect('broker.emqx.io', 1883)
mqttc.loop_start()

