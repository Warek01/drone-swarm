import os
import random
import time
import base64
import json
import paho.mqtt.client as mqtt

MQTT_BROKER = "localhost"
MQTT_PORT = 1883
MQTT_TOPIC = "droneswarm/image"
MISSION_ID = input("Mission ID: ")
IMAGE_DIRECTORY = "./images"


def connect_mqtt():
    client = mqtt.Client()
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    return client


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


def send_image_message(client, image_path):
    image_data = encode_image(image_path)
    coordinates = (random.uniform(-180, 180), random.uniform(-90, 90))
    message = {
        "missionId": MISSION_ID,
        "data": image_data,
        "coordinates": coordinates
    }
    client.publish(MQTT_TOPIC, json.dumps(message))
    print(f"Sent image: {image_path} with coordinates: {coordinates}")


def main():
    client = connect_mqtt()

    num_requests = random.randint(5, 10)

    for _ in range(num_requests):
        interval = random.randint(1, 5)
        time.sleep(interval)

        image_files = [os.path.join(IMAGE_DIRECTORY, f) for f in os.listdir(IMAGE_DIRECTORY) if
                       f.lower().endswith(('png', 'jpg', 'jpeg'))]

        if image_files:
            image_path = random.choice(image_files)
            send_image_message(client, image_path)
        else:
            print("No images found in the directory.")


if __name__ == "__main__":
    main()
