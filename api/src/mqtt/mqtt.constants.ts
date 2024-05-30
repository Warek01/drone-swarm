const PREFIX = 'droneswarm/'

export enum MqttTopic {
  IMAGE = PREFIX + 'image',
  COMMAND = PREFIX + 'command',
}

export enum DroneCommand {
  START_MISSION = 'start_mission',
  STOP_MISSION = 'stop_mission',
}
