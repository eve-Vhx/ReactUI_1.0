import { ROSLIB } from "../components/ManageObjects";
import { ros } from "../components/ManageObjects";

export class GPS_incoming {
    constructor() {
        this.gps_listener1 = new ROSLIB.Topic({
            ros: ros,
            name: '/mavros/gpsstatus/gps1/raw',
            messageType: 'mavros_msgs/GPSRAW'
        })
        this.gps_listener2 = new ROSLIB.Topic({
            ros: ros,
            name: '/drone1_gps',
            messageType: 'sensor_msgs/NavSatFix'
        })
    }
}

export class Connection_checks_incoming {
    constructor() {
        this.checkups_listener1 = new ROSLIB.Topic({
            ros: ros,
            name: '/connection_checkups',
            messageType: 'msg_pkg/ui_checkups_msg'
        })
    }
}

export class Mission_request_outgoing {
    constructor() {
        this.service_client = new ROSLIB.Service({
            ros : ros,
            name : '/ui_mission_req',
            serviceType : 'msg_pkg/UiReq'
        });
    }
}

export class Arm_request_outgoing {
    constructor() {
        this.service_client = new ROSLIB.Service({
            ros : ros,
            name : '/ui_arm_req',
            serviceType : 'msg_pkg/armDrone'
        });
    }
}

export class Nest_charge_request_outgoing {
    constructor() {
        this.service_client = new ROSLIB.Service({
            ros : ros,
            name : '/nest_charge_req',
            serviceType : 'msg_pkg/NestChrg'
        });
    }
}

export class Nest_gps_request_outgoing {
    constructor() {
        this.service_client = new ROSLIB.Service({
            ros : ros,
            name : '/nest1_gps',
            serviceType : 'msg_pkg/NestGPSMessage'
        });
    }
}

export class State_incoming {
    constructor() {
        this.state_listener = new ROSLIB.Topic({
            ros: ros,
            name: '/mavros/state',
            messageType: 'mavros_msgs/State'
          })
    }
}

export class Distance_incoming {
    constructor() {
        this.distance_listener = new ROSLIB.Topic({
            ros: ros,
            name: '/mavros/distance_sensor/hrlv_ez4_pub',
            messageType: 'sensor_msgs/Range'
          })
    }
}

export class Velocity_incoming {
    constructor() {
        this.velocity_listener = new ROSLIB.Topic({
            ros: ros,
            name: '/mavros/setpoint_velocity/cmd_vel',
            messageType: 'geometry_msgs/TwistStamped'
          })
    }
}

export class Battery_incoming {
    constructor() {
        this.battery_listener = new ROSLIB.Topic({
            ros: ros,
            name: '/mavros/battery',
            messageType: 'sensor_msgs/BatteryState'
        })
    }
}

export class ConnectionsDrone_incoming {
    constructor() {
        this.connections_listener = new ROSLIB.Topic({
            ros: ros,
            name: '/d1_connection_checks',
            messageType: 'msg_pkg/connections_drone'
        })
    }
}

export class Gimbal_outgoing {
    constructor() {
        this.gimbal_publisher = new ROSLIB.Topic({
            ros : ros,
            name : "/mavros/mount_control/command",
            messageType : 'mavros_msgs/MountControl'
          });
    }
}