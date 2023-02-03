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



function MissionControl(props) {

    function ShowMissionModal() {
        props.toggle_mission_modal();
    }

    const drone_mission_details = []

    for (let i=0; i<props.drone_obj_array.length; i++) {
        if(props.drone_obj_array[i].on_mission) {
            drone_mission_details.push(
                <tr>
                <td><h4>{props.drone_obj_array[i].dtype} {props.drone_obj_array[i].id}</h4></td>
                <td><h4>{props.drone_obj_array[i].mission_status}</h4></td>
                <td><Col style={{fontSize: "0.5em", color: "white"}} className="px-2"><Row>Lat: {props.drone_obj_array[i].mission_destination_gps[0]}</Row><Row>Lon: {props.drone_obj_array[i].mission_destination_gps[1]}</Row><Row>Alt: {props.drone_obj_array[i].mission_destination_gps[2]}</Row></Col></td>
                </tr>
            )
        }
    }
    

    return(
        <>
        <Row className='mt-3'>
            <h4>
                Mission Control
            </h4>
            <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
        </Row>
        <Row className='py-4'>
            <Button variant="outline-primary" onClick={ShowMissionModal}>Create Mission</Button>
        </Row>
        <Row className='mb-3'>
            <Table striped bordered responsive variant="dark">
                <thead>
                <tr>
                    <th><h4>Vehicle</h4></th>
                    <th><h4>Status</h4></th>
                    <th><h4>Destination</h4></th>
                </tr>
                </thead>
                <tbody className='justify-content-center'>
                    {drone_mission_details}
                </tbody>
            </Table>
        </Row>
        </>
    )
}

export default MissionControl;