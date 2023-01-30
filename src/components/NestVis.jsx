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


function NestVis(props) {
    var [gps_data, updateGPSData] = useState([30.391,-97.727,0]); // Mission Status
    var [state_data, updateStateData] = useState("OFFLINE");
    var [armed_data, updateArmedData] = useState("OFFLINE");
    var [battery_data, updateBatteryData] = useState("OFFLINE");
    var [wifi_connect_data, updateWifiData] = useState("OFFLINE"); //Connection Status
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

    const [currentTab, setCurrentTab] = useState('1');
    const tabs = [
        {
            id: 1,
            state_data: 'OFFLINE', // Mission Status
            battery_data: 'OFFLINE',

            wifi_connect_data: 'OFFLINE', // Connection Status
            lte_connect_data: 'OFFLINE'
        },
        {
            id: 2,
            state_data: 'OFFLINE', // Mission Status
            battery_data: 'OFFLINE',

            wifi_connect_data: 'OFFLINE', // Connection Status
            lte_connect_data: 'OFFLINE'
        },
        {
            id: 3,
            state_data: 'OFFLINE', // Mission Status
            battery_data: 'OFFLINE',

            wifi_connect_data: 'OFFLINE', // Connection Status
            lte_connect_data: 'OFFLINE'
        },
        {
            id: 4,
            state_data: 'OFFLINE', // Mission Status
            battery_data: 'OFFLINE',

            wifi_connect_data: 'OFFLINE', // Connection Status
            lte_connect_data: 'OFFLINE'
        }
    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (
        <Container fluid className='dNBox justify-content-center'>
            <div className='tabs justify-content-center'>
                {tabs.map((tab, i) =>
                    <>
                    <Button variant="secondary" 
                    key={i} id={tab.id} disabled={currentTab === `${tab.id}`} 
                    onClick={(handleTabClick)}>{'Nest ' + tab.id}</Button>{' '}
                    </>
                )}
            </div>
            
            <div className='content'> 
                {tabs.map((tab, i) =>
                    <div key={i}>
                        {currentTab === `${tab.id}` && 
                        <Col>
                        <Row className='dNTitle justify-content-center'>Mission Status</Row>
                            <Row className='content justify-content-center'>state_data { tab.state_data }</Row>
                            <Row className='content justify-content-center'>battery_data { tab.battery_data }</Row>
                        <Row className='content dNTitle justify-content-center'>Connection Status</Row>
                            <Row className='content justify-content-center'>wifi_connect_data { tab.wifi_connect_data }</Row>
                            <Row className='content justify-content-center'>lte_connect_data { tab.lte_connect_data }</Row>
                        </Col>
                        }
                    </div>
                )}
            </div>
        </Container>
    );
}

export default NestVis;