export interface AppEnv {
  PORT: string

  DB_HOST: string
  DB_PORT: string
  DB_SCHEMA: string
  DB_NAME: string
  DB_USER: string
  DB_PASSWORD: string

  MQTT_HOST: string
  MQTT_PORT: string
  MQTT_USER: string
  MQTT_PASSWORD: string
  MQTT_CERT_PATH: string
  MQTT_CLIENT_ID: string
  MQTT_PROTOCOL: string
}
