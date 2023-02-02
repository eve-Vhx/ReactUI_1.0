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
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';



function DroneVis(props) {

    const telem_tabs = []

    for (var i=0; i<drone_obj_array.length; i++) {
        telem_tabs.push(
            <Tab eventKey={props.drone_obj_array[i].id} title="QROW"{props.drone_obj_array[i].id}>
                <Table striped bordered responsive variant="dark" style={{fontSize: "0.5em"}}>
                    <thead style={{fontSize: "0.5em"}}>
                    <tr>
                        <th><h4>Telemetry</h4></th>
                        <th><h4>Status</h4></th>
                    </tr>
                    </thead>
                    <tbody className='justify-content-center'>
                        <tr>
                            <th><h4>Latitude</h4></th>
                            <th><h4>{props.drone_obj_array[i].gps_position[0]}</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Longitude</h4></th>
                            <th><h4>{props.drone_obj_array[i].gps_position[1]}</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Altitude</h4></th>
                            <th><h4>{props.drone_obj_array[i].gps_position[2]}m</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Ground Distance</h4></th>
                            <th><h4>{props.drone_obj_array[i].distance_z}m</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Forward Velocity</h4></th>
                            <th><h4>{props.drone_obj_array[i].vel_x}m/s</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Vertical Velocity</h4></th>
                            <th><h4>{props.drone_obj_array[i].vel_z}m/s</h4></th>
                        </tr>
                    </tbody>
                </Table>
                <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
                <Table striped bordered responsive variant="dark">
                    <thead>
                    <tr>
                        <th><h4>Connection</h4></th>
                        <th><h4>Status</h4></th>
                    </tr>
                    </thead>
                    <tbody className='justify-content-center'>
                        <tr>
                            <th><h4>Px4</h4></th>
                            <th><h4>{props.drone_obj_array[i].px4_connect}</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Mavros</h4></th>
                            <th><h4>{props.drone_obj_array[i].mavros_connect}</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Wifi</h4></th>
                            <th><h4>{props.drone_obj_array[i].wifi_connect}</h4></th>
                        </tr>
                        <tr>
                            <th><h4>4G LTE</h4></th>
                            <th><h4>{props.drone_obj_array[i].lte_connect}</h4></th>
                        </tr>
                    </tbody>
                </Table>
                <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
                <Table striped bordered responsive variant="dark">
                    <thead>
                    <tr>
                        <th><h4>Mission Data</h4></th>
                        <th><h4>Status</h4></th>
                    </tr>
                    </thead>
                    <tbody className='justify-content-center'>
                        <tr>
                            <th><h4>Mission Active</h4></th>
                            <th><h4>{props.drone_obj_array[i].on_mission}</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Mission Status</h4></th>
                            <th><h4>{props.drone_obj_array[i].mission_status}</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Destination GPS</h4></th>
                            <th><Col style={{fontSize: "0.5em", color: "white"}} className="px-2"><Row>Lat: {props.drone_obj_array[i].mission_destination_gps[0]}</Row><Row>Lon: {props.drone_obj_array[i].mission_destination_gps[1]}</Row><Row>Alt: {props.drone_obj_array[i].mission_destination_gps[2]}</Row></Col></th>
                        </tr>
                    </tbody>
                </Table>
            </Tab>
        )
    }

    return(
        <>
            <Row className='mt-3'>
            <h4>
                QROW Telemetry
            </h4>
            <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
            </Row>
            <Row className='mb-3'>
                <Tabs
                    defaultActiveKey="profile"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                    style={{fontSize: "0.5em"}}
                >
                    <Tab eventKey="001" title="QROW1">
                        <Table striped bordered responsive variant="dark" style={{fontSize: "0.5em"}}>
                            <thead style={{fontSize: "0.5em"}}>
                            <tr>
                                <th><h4>Telemetry</h4></th>
                                <th><h4>Status</h4></th>
                            </tr>
                            </thead>
                            <tbody className='justify-content-center'>
                                <tr>
                                    <th><h4>Latitude</h4></th>
                                    <th><h4>{props.drone_obj_array[0].gps_position[0]}</h4></th>
                                </tr>
                                <tr>
                                    <th><h4>Longitude</h4></th>
                                    <th><h4>{props.drone_obj_array[0].gps_position[1]}</h4></th>
                                </tr>
                                <tr>
                                    <th><h4>Altitude</h4></th>
                                    <th><h4>{props.drone_obj_array[0].gps_position[2]}m</h4></th>
                                </tr>
                                <tr>
                                    <th><h4>Ground Distance</h4></th>
                                    <th><h4>{props.drone_obj_array[0].distance_z}m</h4></th>
                                </tr>
                                <tr>
                                    <th><h4>Forward Velocity</h4></th>
                                    <th><h4>{props.drone_obj_array[0].vel_x}m/s</h4></th>
                                </tr>
                                <tr>
                                    <th><h4>Vertical Velocity</h4></th>
                                    <th><h4>{props.drone_obj_array[0].vel_z}m/s</h4></th>
                                </tr>
                            </tbody>
                        </Table>
                        <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
                        <Table striped bordered responsive variant="dark">
                            <thead>
                            <tr>
                                <th><h4>Connection</h4></th>
                                <th><h4>Status</h4></th>
                            </tr>
                            </thead>
                            <tbody className='justify-content-center'>
                                <tr>
                                    <th><h4>Px4</h4></th>
                                    <th><h4>{props.drone_obj_array[0].px4_connect}</h4></th>
                                </tr>
                                <tr>
                                    <th><h4>Mavros</h4></th>
                                    <th><h4>{props.drone_obj_array[0].mavros_connect}</h4></th>
                                </tr>
                                <tr>
                                    <th><h4>Wifi</h4></th>
                                    <th><h4>{props.drone_obj_array[0].wifi_connect}</h4></th>
                                </tr>
                                <tr>
                                    <th><h4>4G LTE</h4></th>
                                    <th><h4>{props.drone_obj_array[0].lte_connect}</h4></th>
                                </tr>
                            </tbody>
                        </Table>
                        <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
                        <Table striped bordered responsive variant="dark">
                            <thead>
                            <tr>
                                <th><h4>Mission Data</h4></th>
                                <th><h4>Status</h4></th>
                            </tr>
                            </thead>
                            <tbody className='justify-content-center'>
                                <tr>
                                    <th><h4>Mission Active</h4></th>
                                    <th><h4>{props.drone_obj_array[0].on_mission}</h4></th>
                                </tr>
                                <tr>
                                    <th><h4>Mission Status</h4></th>
                                    <th><h4>{props.drone_obj_array[0].mission_status}</h4></th>
                                </tr>
                                <tr>
                                    <th><h4>Destination GPS</h4></th>
                                    <th><Col style={{fontSize: "0.5em", color: "white"}} className="px-2"><Row>Lat: {props.drone_obj_array[0].mission_destination_gps[0]}</Row><Row>Lon: {props.drone_obj_array[0].mission_destination_gps[1]}</Row><Row>Alt: {props.drone_obj_array[0].mission_destination_gps[2]}</Row></Col></th>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </Row>
        </>
    )
}

export default DroneVis;