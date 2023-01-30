// package imports
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
//Import components
import MapVis from './MapVis';
import CreateDrone from './modals/CreateDrone';
import CreateNest from './modals/CreateNest';
import DeleteDrone from './modals/DeleteDrone';
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";

//Import Ros topics
import { ConnectionsDrone_incoming, GPS_incoming } from "../ROSTopics/rosTopics";
import { Connection_checks_incoming } from "../ROSTopics/rosTopics";
import { State_incoming } from "../ROSTopics/rosTopics";
import { Distance_incoming } from "../ROSTopics/rosTopics";
import { Velocity_incoming } from "../ROSTopics/rosTopics";
import { Battery_incoming } from "../ROSTopics/rosTopics";
import { Gimbal_outgoing } from "../ROSTopics/rosTopics";
import { Nest_gps_request_outgoing } from "../ROSTopics/rosTopics";

//Import models
import { Drone } from "../models/drone";
import { Nest } from "../models/nest";

//Global ROS Variables
export const ROSLIB = require('roslib');
export const ros = new ROSLIB.Ros();

//Global data arrays
var drone_obj_array = [];
var nest_obj_array = [];

//Initialize all drones
var drone1_obj = new Drone('001','QROW',0,0,0);
drone_obj_array.push(drone1_obj);
var drone2_obj = new Drone('002','QROW',0,0,0);
drone_obj_array.push(drone2_obj);
var drone3_obj = new Drone('003','QROW',0,0,0);
drone_obj_array.push(drone3_obj);

//Initialize all nests
var nest1_obj = new Nest('001',0,0,0);
nest_obj_array.push(nest1_obj);


function ManageObjects() {

    const [showSystemStatus, setShowSystemStatus] = React.useState('');
    const [rosConnected, setRosConnected] = React.useState(false);
    const [showDroneInitializeModal, setShowDroneInitializeModal] = React.useState(false);
    const [showDroneDeleteModal, setShowDroneDeleteModal] = React.useState(false);
    const [showNestInitializeModal, setShowNestInitializeModal] = React.useState(false);
    const [showNestDeleteModal, setShowNestDeleteModal] = React.useState(false);

    const ConnectSystemStatus = () =>setShowSystemStatus('success');
    const DisconnectSystemStatus = () =>setShowSystemStatus('danger');
    const toggleDroneInitModal = () =>setShowDroneInitializeModal(!showDroneInitializeModal);
    const toggleDroneDeleteModal = () =>setShowDroneDeleteModal(!showDroneDeleteModal);
    const toggleNestInitModal = () =>setShowNestInitializeModal(!showNestInitializeModal);
    const toggleNestDeleteModal = () =>setShowNestDeleteModal(!showNestDeleteModal);

    function CreateNewDroneObject(type,vin) {
        for(var i=0; i<drone_obj_array.length; i++) {
            if(drone_obj_array[i].id === vin) {
                drone_obj_array[i].initialized = true;
            }
        }
        toggleDroneInitModal();
    }

    function DeleteDroneObject(type,vin) {
        for(var i=0; i<drone_obj_array.length; i++) {
            if(drone_obj_array[i].id === vin) {
                drone_obj_array[i].initialized = false;
            }
        }
        toggleDroneDeleteModal();
    }

    function CreateNewNestObject(id) {
        for(var i=0; i<nest_obj_array.length; i++) {
            if(nest_obj_array[i].id === id) {
                nest_obj_array[i].initialized = true;
            }
        }
        toggleNestInitModal();
    }

    function DeleteNestObject(id) {
        for(var i=0; i<nest_obj_array.length; i++) {
            if(nest_obj_array[i].id === id) {
                nest_obj_array[i].initialized = false;
            }
        }
        toggleNestDeleteModal();
    }
    


    //ROS Connection effects
    useEffect(() => {    
        ros.on('connection', () => {
        setShowSystemStatus('success');
        setRosConnected(true);
        console.log('Connected to websocket server.');
        });
        ros.on('error', (error) => {
        setShowSystemStatus('primary');
        setRosConnected(false);
        console.log(
            'Error connecting to network node:\nConnection status 0:')
        });
        ros.on('close', () => {
        setShowSystemStatus('danger');
        setRosConnected(false);
        console.log('Connection to websocket server closed.');
        });
    });

    //Testing objects
    let test_drone_obj = new Drone('001', 'QROW', 30.391, -97.727, 0);


    return (
        <>
            <Row className="m-4" style={{ width: "50%"}}>
                <Col>
                    <Button 
                        variant="outline-success" 
                        onClick={ () => {
                            if(!rosConnected) {
                                ros.connect('ws://10.0.30.232:8080/');
                                //ros.connect('ws://localhost:8080/');
                            }
                                //ROS Topic objects
                                let GPS_incoming_obj = new GPS_incoming()
                                let State_incoming_obj = new State_incoming();
                                let Distance_incoming_obj = new Distance_incoming();
                                let Velocity_incoming_obj = new Velocity_incoming();
                                let battery_incoming_obj = new Battery_incoming();
                                let Gimbal_outgoing_obj = new Gimbal_outgoing();
                                let Connections_drone_obj = new ConnectionsDrone_incoming();

                                //GPS subscriber
                                GPS_incoming_obj.gps_listener1.subscribe( (message) => {
                                    if(message.lat != NaN) {
                                        test_drone_obj.gps_position = [message.lat*(10**-7), message.lon*(10**-7), message.alt*(10**-3)]
                                    }
                                });

                                //Drone connections subscriber
                                Connections_drone_obj.connections_listener.subscribe( (message) => {
                                    if (message.mavros === true){
                                        test_drone_obj.mavros_connect = "CONNECTED";
                                    } else if (message.mavros === false) {
                                        test_drone_obj.mavros_connect = "DISCONNECTED";
                                    }
                                    if (message.px4 === true){
                                        test_drone_obj.px4_connect = "CONNECTED"
                                    } else if (message.px4 === false){test_drone_obj.px4_connect = "DISCONNECTED"}
                                    if (message.wifi === true){
                                        test_drone_obj.wifi_connect = "CONNECTED"
                                    } else if (message.wifi === false) {test_drone_obj.wifi_connect = "DISCONNECTED"}
                                    if (message.lte === true){
                                        test_drone_obj.lte_connect = "CONNECTED"
                                    } else if (message.lte === false){test_drone_obj.lte_connect = "DISCONNECTED"}
    
                                });

                                //State subscriber
                                State_incoming_obj.state_listener.subscribe( (message) => {
                                    test_drone_obj.state = message.mode;

                                    if (message.armed == false) {
                                        test_drone_obj.armed = "DISARMED";
                                      }
                                      else if (message.armed == true) {
                                        test_drone_obj.armed = "ARMED";
                                      }
                                      else {
                                        test_drone_obj.armed = "DISCONNECTED FROM VEHICLE"
                                      }
                                });
                                
                                //Distance sensor subscriber
                                Distance_incoming_obj.distance_listener.subscribe( (message) => {
                                    test_drone_obj.distance_z = message.range.toFixed(1)
                                });

                                //Velocity subscriber
                                Velocity_incoming_obj.velocity_listener.subscribe( (message) => {
                                    test_drone_obj.vel_x = message.twist.linear.x;
                                    test_drone_obj.vel_z = message.twist.linear.z;
                                });

                                //Battery subscriber
                                battery_incoming_obj.battery_listener.subscribe( (message) => {
                                    test_drone_obj.battery = message.percentage;
                                });
                        }}
                    >eve Connect</Button>
                </Col>
                <Col>
                    <Badge bg={showSystemStatus}>
                        System Status
                    </Badge>
                </Col>
                <Col>
                    <Button variant="outline-danger" onClick={ () => { ros.close() }}>eve Disconnect</Button>
                </Col>
            </Row>
            <Row>
                <MapVis 
                toggle_modal_={toggleDroneInitModal} 
                toggle_delete_modal_={toggleDroneDeleteModal} 
                drone_obj_array={drone_obj_array}
                toggle_nest_modal_={toggleNestInitModal} 
                toggle__nest_delete_modal_={toggleNestDeleteModal} 
                nest_obj_array={nest_obj_array}/>
            </Row>
            <Row>
                <CreateDrone drone_obj_array={drone_obj_array} show_modal={showDroneInitializeModal} toggle_modal_={toggleDroneInitModal} create_new_drone_={CreateNewDroneObject}/>
                <CreateNest nest_obj_array={nest_obj_array} show_nest_modal={showNestInitializeModal} toggle_nest_modal_={toggleNestInitModal} create_new_nest_={CreateNewNestObject}/>
                <DeleteDrone drone_obj_array={drone_obj_array} show_delete_modal={showDroneDeleteModal} toggle_delete_modal_={toggleDroneDeleteModal} delete_drone={DeleteDroneObject} />
            </Row>
        </>
    );
}


export default ManageObjects;