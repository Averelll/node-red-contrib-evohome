# node-red-contrib-evohome
Node-red-control evohome makes it possible to control and monitor your Honeywell Evohome thermostats.
It uses the unofficial API to interact with the evohome servers.
Node-red-control evohome delivers 3 nodes:
##evohome-config
evohome-config is a config node to set the userid, password and applicationID to login to the servers
##evohome-status
evohome status periodically polls the status of the evohome. The interval in minutes can be set. It returns the device-id, the name of the zone, the temperature, and the cuttent setpoint value.
As the session timed out very fast (often within 2 or 3 calls), I decided to login for each poll. It is recommended to not poll too often, to keep the load on the API low.
evohome-status will send a message per thermostat. the msg.pauload looks like:
  { id: 1002458, name: "kitchen", temperature: 20.96, setpoint: 21 }
##evohome-control
Evohome-control makes it possible to set the setpoint per thermostat. It offers 3 ways to do so:
- only provide the devide id will make the thermostat revert back to the schedule.
- device id and temperature will set the temperature permanently.
- device id, temperature and minutes will set a temporary setpoint for the given number of minutes, then revert back to the schedule.
