// Evohome Control node
const evohome = require('./evohome.js');
module.exports = function(RED) {
    'use strict';

    function Node(n) {
      
        RED.nodes.createNode(this,n);
        var confignode = RED.nodes.getNode(n.confignode);
        var node = this;
        
        this.on('input', function (msg) {
            if (msg.payload.id) {
                node.warn('id ok');
                evohome.login(confignode.userid, confignode.passwd, confignode.applid).then(function(session) {
                    if (msg.payload.temperature && msg.payload.minutes) {
                        node.warn('temporary');
                        session.modifyHeatSetpoint(msg.payload.id, "Temporary", msg.payload.temperature, parseInt(msg.payload.minutes));
                    } else if (msg.payload.temperature) {
                        node.warn('hold');
                        session.modifyHeatSetpoint(msg.payload.id, "Hold", msg.payload.temperature);
                    } else {
                        session.modifyHeatSetpoint(msg.payload.id, "Scheduled");
                    }
                }).fail(function(err) {
                    node.warn(err);
                });
                                            
            }
        });
    }

    RED.nodes.registerType('evohome-control', Node);
};