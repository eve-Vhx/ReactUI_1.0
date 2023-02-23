//////////////////////////////////////////////////////////////////////////////
// General model for drone object
// 
//////////////////////////////////////////////////////////////////////////////
export class Drone {
    constructor(vin, dtype, latitude, longitude, altitude) {
        this.id = vin;
        this.dtype = dtype;
        this.gps_position = [latitude, longitude, altitude];
        this.battery = '72 %';
        this.state = 'POSCTL';
        this.armed = 'ARMED';
        this.distance_z = '15 m';
        this.vel_x = '5 m/s';
        this.vel_z = '0 m/s';       

        this.docked = 'no';
        this.perched = 'no';
        this.ipAddr = '11.0.2.1';
        this.mavrosID = 'mav01';

        this.px4_connect = 'online';
        this.mavros_connect = 'online';
        this.wifi_connect = 'online';
        this.lte_connect = 'online';

        this.initialized = false;

        this.on_mission = false;
        this.mission_status = "PENDING";
        this.mission_destination_gps = [];
    }
}
// export class Drone {
//     constructor(vin, dtype, latitude, longitude, altitude) {
//         this.id = vin;
//         this.dtype = dtype;
//         this.gps_position = [latitude, longitude, altitude];
//         this.battery = null;
//         this.state = null;
//         this.armed = null;
//         this.distance_z = null;
//         this.vel_x = null;
//         this.vel_z = null;       

//         this.docked = null;
//         this.perched = null;
//         this.ipAddr = null;
//         this.mavrosID = null;

//         this.px4_connect = null;
//         this.mavros_connect = null;
//         this.wifi_connect = null;
//         this.lte_connect = null;

//         this.initialized = false;

//         this.on_mission = false;
//         this.mission_status = "PENDING";
//         this.mission_destination_gps = [];
//     }
// }
