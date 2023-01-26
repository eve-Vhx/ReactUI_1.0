// Node Dependencies
import React, {useEffect, useState} from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col  from 'react-bootstrap/Col';
import Container  from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row  from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import '../css/DN.css';

//import { gps_pos_tuple, state, armed, distance, velocity_x, velocity_z } from './RosCon';
//import { nest_coord } from './GimbalVis';
//import { test_drone_obj, test_nest_obj } from './ManageObjects';


function DroneVis(props) {
    var [gps_data, updateGPSData] = useState([30.391,-97.727,0]);
    var [state_data, updateStateData] = useState("OFFLINE");
    var [armed_data, updateArmedData] = useState("OFFLINE");
    var [battery_data, updateBatteryData] = useState("OFFLINE");
    var [distz_data, updateDistzData] = useState("OFFLINE");
    var [velx_data, updateVelxData] = useState("OFFLINE");
    var [velz_data, updateVelzData] = useState("OFFLINE");
    var [mavros_connect_data, updateMavrosData] = useState("OFFLINE");
    var [px4_connect_data, updatePx4Data] = useState("OFFLINE");
    var [wifi_connect_data, updateWifiData] = useState("OFFLINE");
    var [lte_connect_data, updateLteData] = useState("OFFLINE");

    /* useEffect(() => {
        const interval = setInterval(() => {
        //   updateData(gps_data = props.drone_obj.gps_position)
        updateGPSData(gps_data = test_drone_obj.gps_position);
        updateStateData(state_data = test_drone_obj.state);
        updateArmedData(armed_data = test_drone_obj.armed);
        updateBatteryData(battery_data = test_drone_obj.battery);
        updateDistzData(distz_data = test_drone_obj.distance_z);
        updateVelxData(velx_data = test_drone_obj.vel_x);
        updateVelzData(velz_data = test_drone_obj.vel_z);

        updateMavrosData(mavros_connect_data = test_drone_obj.mavros_connect);
        updatePx4Data(px4_connect_data = test_drone_obj.px4_connect);
        updateWifiData(wifi_connect_data = test_drone_obj.wifi_connect);
        updateLteData(lte_connect_data = test_drone_obj.lte_connect);
        // updatePx4Data(if(test_drone_obj.px4_connect === true) {
        //     px4_connect_data = "CONNECTED"
        // } else {px4_connect_data = "DISCONNECTED"});
        // updateWifiData(if(test_drone_obj.wifi_connect === true) {
        //     wifi_connect_data = "CONNECTED"
        // } else {wifi_connect_data = "DISCONNECTED"});
        // updateLteData(if(test_drone_obj.lte_connect === true) {
        //     lte_connect_data = "CONNECTED"
        // } else {lte_connect_data = "DISCONNECTED"});
        // console.log(test_drone_obj);
        }, 1000);
        return () => clearInterval(interval);
      }, []); 
      */

    return(
         <Container className='dNBox justify-content-center'>
                    <Row className='dNTitle justify-content-center'>Nest</Row>
                    <Row className='justify-content-center'>Connection Status</Row>
                    <Row className='justify-content-center'>Mission Status</Row>

         </Container>

    )
}

export default DroneVis;