//////////////////////////////////////////////////////////////////////////////
// General model for drone object
// 
//////////////////////////////////////////////////////////////////////////////
export class Drone {
    constructor(vin, dtype, latitude, longitude, altitude) {
        this.id = vin;
        this.dtype = dtype;
        this.gps_position = [latitude, longitude, altitude];
        this.battery = null;
        this.state = null;
        this.armed = null;
        this.distance_z = null;
        this.vel_x = null;
        this.vel_z = null;       

        this.docked = null;
        this.perched = null;
        this.ipAddr = null;
        this.mavrosID = null;

        this.px4_connect = null;
        this.mavros_connect = null;
        this.wifi_connect = null;
        this.lte_connect = null;

    }
}
