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

    const [currentTab, setCurrentTab] = useState('1');

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    const nestOnlineID = []
    for (let i=0; i<props.nest_obj_array.length; i++) {
        if(props.nest_obj_array[i].initialized) {
            nestOnlineID.push(props.nest_obj_array[i].id)
        }
    }

    return (
        <Container fluid className='dNBox justify-content-center'>

            <div className='tabs justify-content-center'>
                {nestOnlineID.map((tab, i) =>
                    <>
                        <Button variant="secondary" 
                        key={i} id={tab} disabled={currentTab === `${tab}`} 
                        onClick={(handleTabClick)}>{ 'Nest ' + tab}</Button>
                    </>
                    )}
            </div>
            
            <div className='content'> 
                {props.nest_obj_array.map((tab, i) =>
                    <div key={i}>
                        {currentTab === `${tab.id}` && tab.initialized === true &&
                        <Col>
                        <Row className='dNTitle justify-content-center'>Mission Status</Row>
                            <Row className='content justify-content-center'>Position { tab.position }</Row>
                            <Row className='content justify-content-center'>Charge Status { tab.charge_status }</Row>
                            <Row className='content justify-content-center'>State Data { tab.state_data }</Row>
                            <Row className='content justify-content-center'>Battery Data { tab.battery_data }</Row>
                        <Row className='dNTitle justify-content-center'>Connection Status</Row>
                            <Row className='content justify-content-center'>WiFi { tab.wifi_connect_data }</Row>
                            <Row className='content justify-content-center'>LTE { tab.lte_connect_data }</Row>
                        </Col>
                        }
                    </div>
                )}
            </div>
        </Container>
    );
}

export default NestVis;