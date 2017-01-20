// Evohome Status node
const evohome = require('./evohome.js');
module.exports = function(RED) {
    'use strict';

    function Node(n) {
      
        RED.nodes.createNode(this,n);
        var confignode = RED.nodes.getNode(n.confignode); 
        var node = this;
        this.interval = parseInt(n.interval);

        function publishEvohomeStatus() {
            evohome.login(confignode.userid, confignode.passwd, confignode.applid).then(function(session) {
	        session.getLocations().then(function(locations) {
                    locations[0].devices.forEach(function(device) {
                        if (device.thermostat) {
                            var msgout = {
                            payload : {
                                id : device.deviceID,
                                name : device.name.toLowerCase(),
                                temperature : device.thermostat.indoorTemperature,
                                setpoint : device.thermostat.changeableValues.heatSetpoint.value} 
                                }
                            node.send(msgout);
                        }
                    });
                }).fail(function(err) {
                    node.warn(err);
                });
            }).fail(function(err) {
                node.warn(err);
            });
        }

        var tick = setInterval(function() {
            publishEvohomeStatus();
        }, this.interval*60000); // trigger every 30 secs
        
        node.on("close", function() {
            if (tick) {
                clearInterval(tick);
            }
        });
    }

    RED.nodes.registerType('evohome-status', Node);
};
