// package imports
import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";




function CreateMissionModal(props) {

    var [targetNest, setTargetNest] = useState('');
    var [destinationLat, setDestinationLat] = useState(0);
    var [destinationLon, setDestinationLon] = useState(0);
    var [destinationAlt, setDestinationAlt] = useState(0);
    const [droneID, setDroneID] = useState('');

    var drone_options = [<option></option>];

    for (let i=0; i<props.drone_obj_array.length; i++) {
        if(props.drone_obj_array[i].initialized) {
            drone_options.push(
                <option value={props.drone_obj_array[i].id}>{props.drone_obj_array[i].dtype} {props.drone_obj_array[i].id}</option>
            )
        }
    }

    var nest_options = [<option></option>];
    var nest_coordinates = [[0,0]];

    for (let i=0; i<props.nest_obj_array.length; i++) {
        if(props.nest_obj_array[i].initialized) {
            nest_options.push(
                <option value={props.nest_obj_array[i].id}>{props.nest_obj_array[i].id}</option>
            )
            // nest_coordinates.push([props.nest_obj_array[i].position[0]],props.nest_obj_array[i].position[1]]);
        }
    }


    function LaunchNestMission() {
        for(var i=0; i<props.nest_obj_array.length; i++) {
            if(props.nest_obj_array[i].id === targetNest) {
                props.launch_mission_(droneID, props.nest_obj_array[i].position)
            }
        }
    }

    function LaunchNestMission_input() {
        props.launch_mission_(droneID, [destinationLat, destinationLon, destinationAlt]);
    }


  return(
    <>
        <Modal show={ props.show_mission_modal } onHide={ props.toggle_mission_modal_ }>
            <Modal.Header closeButton>
                <Modal.Title>
                    Create New Mission
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Col>
                        <Row className="p-3">
                            <Form.Label>
                                Select a vehicle to deploy
                            </Form.Label>
                            <Form.Select onChange={(e) => {
                                setDroneID(e.target.value);
                            }}>
                                {drone_options}
                            </Form.Select>
                        </Row>
                        <Row className="py-3">
                        <div className='hr mb-3 mx-auto' style={{border: '1px solid grey', maxWidth:'100%'}}/>
                        </Row>
                        <Row>
                            <Tabs
                            defaultActiveKey="profile"
                            id="justify-tab-example"
                            className="mb-3"
                            justify
                            >
                                <Tab eventKey="nest" title="Specify Nest">
                                    <FloatingLabel
                                    controlId='floatingSelect' 
                                    label='Nest ID' 
                                    style={{ color:'blue', fontSize:'1rem' }}
                                    className="mb-3">
                                    <Form.Select aria-label='Select Nest ID' onChange={(e) => {
                                        setTargetNest(e.target.value);
                                    }}>
                                        {nest_options}
                                    </Form.Select>
                                    </FloatingLabel>
                                    <Button variant="success" onClick={LaunchNestMission}>
                                        Launch Mission
                                    </Button>
                                </Tab>
                                <Tab eventKey="latlon" title="Specify GPS Coordinates">
                                    <Row className="p-3">
                                        <Form.Control type="lat" placeholder="Latitude" onChange={(e) => {
                                            setDestinationLat(e.target.value);
                                        }}/>
                                    </Row>
                                    <Row className="p-3">
                                        <Form.Control type="lon" placeholder="Longitude" onChange={(e) => {
                                            setDestinationLon(e.target.value);
                                        }}/>
                                    </Row>
                                    <Row className="p-3">
                                        <Form.Control type="alt" placeholder="Altitude" onChange={(e) => {
                                            setDestinationAlt(e.target.value);
                                        }}/>
                                    </Row>
                                    <Button variant="success" onClick={LaunchNestMission_input}>
                                        Launch Mission
                                    </Button>
                                </Tab>
                            </Tabs>
                        </Row>
                    </Col>
                </Form>
            </Modal.Body>

        </Modal>

    </>
  );
}

export default CreateMissionModal;