module.exports = function(RED) {
    function EvohomeNode(config) {
        RED.nodes.createNode(this, config);
        this.userid = config.userid;
        this.passwd = config.passwd;
        this.applid = config.applid;
    }

    RED.nodes.registerType("evohome-config", EvohomeNode);
};