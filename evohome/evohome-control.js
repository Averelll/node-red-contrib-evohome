// Evohome Control node
const evohome = require('./evohome.js');
module.exports = function(RED) {
    'use strict';

    function Node(n) {
      
        RED.nodes.createNode(this,n);
        var confignode = RED.nodes.getNode(n.confignode);
        var node = this;
        
        this.on('input', function (msg) {
            node.warn(msg);
        });
    }

    RED.nodes.registerType('evohome-control', Node);
};