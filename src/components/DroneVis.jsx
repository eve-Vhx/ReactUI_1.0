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

// import { gps_pos_tuple, state, armed, distance, velocity_x, velocity_z } from './RosCon';
// import { nest_coord } from './GimbalVis';
// import { test_drone_obj, test_nest_obj } from './ManageObjects';


function DroneVis(props) {
    
        const [currentTab, setCurrentTab] = useState('1');
        const [droneonline, setDroneOnline]  = useState(' ')

        const handleTabClick = (e) => {
            setCurrentTab(e.target.id);
        }

        const droneOnlineID = [];
        const droneOnlineDType = [];

        for (let i=0; i<props.drone_obj_array.length; i++) {
            if(props.drone_obj_array[i].initialized) {
                droneOnlineID.push(props.drone_obj_array[i].id);
                droneOnlineDType.push(props.drone_obj_array[i].dtype);
            }
        }

        return (
            <Container fluid className='dNBox justify-content-center'>

                <div className='tabs justify-content-center'>
                    
                    {droneOnlineID.map((tab, i) =>
                        <>
                            <Button variant="secondary" 
                            key={i} id={tab} disabled={currentTab === `${tab}`} 
                            onClick={(handleTabClick)}>{droneOnlineDType[i] + ' ' + tab}</Button>
                        </>
                    )}

                </div>
                
                <div className='content justify-content-center'> 
                    {props.drone_obj_array.map((tab, i) =>
                        <div key={tab.id}> 
                            {currentTab === `${tab.id}` && 
                            <Col>
                            <Row className='dNTitle justify-content-center'>Telemetry</Row>
                                <Row className='content justify-content-center'>gps_data  { tab.gps_position }</Row> 
                                <Row className='content justify-content-center'>distz_data  { tab.distance_z }</Row>
                                <Row className='content justify-content-center'>velx_data { tab.vel_x }</Row>
                                <Row className='content justify-content-center'>velz_data { tab.vel_z }</Row>
                            <Row className='dNTitle justify-content-center'>Mission Status</Row>
                                <Row className='content justify-content-center'>state_data  { tab.state }</Row> 
                                <Row className='content justify-content-center'>armed_data  { tab.armed }</Row>
                                <Row className='content justify-content-center'>battery_data {tab.battery }</Row>
                            <Row className='dNTitle justify-content-center'>Connection Status</Row>
                                <Row className='content justify-content-center'>mavros_ID  { tab.mavrosID }</Row> 
                                <Row className='content justify-content-center'>mavros_connect_data  { tab.mavros_connect }</Row> 
                                <Row className='content justify-content-center'>px4_connect_data  { tab.px4_connect }</Row>
                                <Row className='content justify-content-center'>wifi_connect_data { tab.wifi_connect }</Row>
                                <Row className='content justify-content-center'>lte_connect_data { tab.lte_connect }</Row>                   
                            </Col> 
                            }
                        </div>
                    )}
                </div>
            </Container>
        );
    }

export default DroneVis;