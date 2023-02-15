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
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
//Import components
import MapVis from './MapVis';
import CreateDrone from './modals/CreateDrone';
import CreateNest from './modals/CreateNest';
import DeleteDrone from './modals/DeleteDrone';
import DeleteNest from './modals/DeleteNest';
import CreateMission from './modals/CreateMission';
import NestCharge from './modals/NestCharge';
import DeployMissionNest from './modals/DeployMissionNest';
import ArmDrone from './modals/ArmDrone';

//Import Ros topics
import { ConnectionsDrone_incoming, GPS_incoming, Nest_charge_request_outgoing } from "../ROSTopics/rosTopics";
import { Connection_checks_incoming } from "../ROSTopics/rosTopics";
import { State_incoming } from "../ROSTopics/rosTopics";
import { Distance_incoming } from "../ROSTopics/rosTopics";
import { Velocity_incoming } from "../ROSTopics/rosTopics";
import { Battery_incoming } from "../ROSTopics/rosTopics";
import { Gimbal_outgoing } from "../ROSTopics/rosTopics";
import { Nest_gps_request_outgoing } from "../ROSTopics/rosTopics";
import { Mission_request_outgoing } from "../ROSTopics/rosTopics";

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
var drone1_obj = new Drone('001','QROW',30.391,-97.727,240);
drone_obj_array.push(drone1_obj);
var drone2_obj = new Drone('002','QROW',30.392,-97.728,240);
drone_obj_array.push(drone2_obj);


//Initialize all nests
var nest1_obj = new Nest('001',30.390,-97.723,240);
nest_obj_array.push(nest1_obj);


function ManageObjects() {

    const [showSystemStatus, setShowSystemStatus] = React.useState('');
    const [rosConnected, setRosConnected] = React.useState(false);
    const [showDroneInitializeModal, setShowDroneInitializeModal] = React.useState(false);
    const [showDroneDeleteModal, setShowDroneDeleteModal] = React.useState(false);
    const [showNestInitializeModal, setShowNestInitializeModal] = React.useState(false);
    const [showNestDeleteModal, setShowNestDeleteModal] = React.useState(false);
    const [showMissionModal, setShowMissionModal]= React.useState(false);
    const [showNestChargeModal, setShowNestChargeModal] = React.useState(false);
    const [showDeployNestModal, setShowDeployNestModal] = React.useState(false);
    const [nestDeployPosition, setNestDeployPosition] = React.useState([]);
    const [showArmingModal, setShowArmingModal] = React.useState(false);

    const ConnectSystemStatus = () =>setShowSystemStatus('success');
    const DisconnectSystemStatus = () =>setShowSystemStatus('danger');
    const toggleDroneInitModal = () =>setShowDroneInitializeModal(!showDroneInitializeModal);
    const toggleDroneDeleteModal = () =>setShowDroneDeleteModal(!showDroneDeleteModal);
    const toggleNestInitModal = () =>setShowNestInitializeModal(!showNestInitializeModal);
    const toggleNestDeleteModal = () =>setShowNestDeleteModal(!showNestDeleteModal);
    const toggleMissionModal = () => setShowMissionModal(!showMissionModal);
    const toggleNestChargeModal = () => setShowNestChargeModal(!showNestChargeModal);
    const toggleDeployNestModal = () => setShowDeployNestModal(!showDeployNestModal); 
    const toggleArmingModal = () => setShowArmingModal(!showArmingModal);

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

    function LaunchMission(droneID, destinationGPS) {
        let service_client_obj = new Mission_request_outgoing()
        let service_client = service_client_obj.service_client;

        var request = new ROSLIB.ServiceRequest({
        lat : parseFloat(destinationGPS[0]),
        lon : parseFloat(destinationGPS[1]),
        alt : parseFloat(destinationGPS[2])
        });
        console.log("Whats going to the service!!");
        console.log(request);
        service_client.callService(request, function(result) {
        console.log('Result for service call: ' + result.completion);
        });

        for(var i=0; i<drone_obj_array.length; i++) {
            if(drone_obj_array[i].id === droneID) {
                drone_obj_array[i].on_mission = true;
                drone_obj_array[i].mission_destination_gps = destinationGPS;
            }
        }

        toggleMissionModal();
    }

    function InitiateNestCharge(id) {
       console.log("Initiating nest charge");

        let nest_charge_req_obj = new Nest_charge_request_outgoing();
        let nest_charge_req = nest_charge_req_obj.service_client;

        var request = new ROSLIB.ServiceRequest({
            charge_drone : true
        });
            
        console.log("Sending charge request through to server...");
        nest_charge_req.callService(request, function(result) {
            console.log('Result for service call: ');
        });
        nest_obj_array[0].charge_status = "CHARGING";
        for(var i=0; i<nest_obj_array.length; i++) {
            if(nest_obj_array[i].id === id) {
                nest_obj_array[i].charge_status = true;
            }
        }
        toggleNestChargeModal();
    } 

    function StopNestCharge(id) {
        console.log("Stopping nest charge!");
 
         let nest_charge_req_obj = new Nest_charge_request_outgoing();
         let nest_charge_req = nest_charge_req_obj.service_client;
 
         var request = new ROSLIB.ServiceRequest({
             charge_drone : false
         });
         nest_obj_array[0].charge_status = "NOT CHARGING";
         console.log("Sending charge request through to server...");
         nest_charge_req.callService(request, function(result) {
             console.log('Result for service call: ');
         });
         
         for(var i=0; i<nest_obj_array.length; i++) {
             if(nest_obj_array[i].id === id) {
                 nest_obj_array[i].charge_status = false;
             }
         }
         toggleNestChargeModal();
     } 

    function DeployDroneNest(droneID) {
        console.log("deploying drone to nest...");

        let service_client_obj = new Mission_request_outgoing()
        let service_client = service_client_obj.service_client;

        var request = new ROSLIB.ServiceRequest({
        lat : parseFloat(nestDeployPosition[0]),
        lon : parseFloat(nestDeployPosition[1]),
        alt : parseFloat(nestDeployPosition[2])
        });
        console.log(nestDeployPosition);
        service_client.callService(request, function(result) {
        console.log('Result for service call: ');
        });

        for(var i=0; i<drone_obj_array.length; i++) {
            if(drone_obj_array[i].id === droneID) {
                drone_obj_array[i].on_mission = true;
                drone_obj_array[i].mission_destination_gps = nestDeployPosition;
            }
        }

        toggleDeployNestModal();
    }

    function UpdateNestPos(id) {
        console.log("updating nest position...");

        let service_client_obj = new Nest_gps_request_outgoing();
        let service_client = service_client_obj.service_client;

        var request = new ROSLIB.ServiceRequest({

        });

        service_client.callService(request, function(result) {
        nest_obj_array[0].position = [result.latitude, result.longitude, result.altitude];
        });
    }

    function setDestNestGPS(nest_pos) {
        setNestDeployPosition(nest_pos);
    }

    function requestArmDrone(droneID) {
        console.log("ready to send service");
        toggleArmingModal();
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
                                        drone_obj_array[0].gps_position = [message.lat*(10**-7), message.lon*(10**-7), message.alt*(10**-3)]
                                    }
                                });

                                //Drone connections subscriber
                                Connections_drone_obj.connections_listener.subscribe( (message) => {
                                    if (message.mavros === true){
                                        drone_obj_array[0].mavros_connect = "CONNECTED";
                                    } else if (message.mavros === false) {
                                        drone_obj_array[0].mavros_connect = "DISCONNECTED";
                                    }
                                    if (message.px4 === true){
                                        drone_obj_array[0].px4_connect = "CONNECTED"
                                    } else if (message.px4 === false){drone_obj_array[0].px4_connect = "DISCONNECTED"}
                                    if (message.wifi === true){
                                        drone_obj_array[0].wifi_connect = "CONNECTED"
                                    } else if (message.wifi === false) {drone_obj_array[0].wifi_connect = "DISCONNECTED"}
                                    if (message.lte === true){
                                        drone_obj_array[0].lte_connect = "CONNECTED"
                                    } else if (message.lte === false){drone_obj_array[0].lte_connect = "DISCONNECTED"}
    
                                });

                                //State subscriber
                                State_incoming_obj.state_listener.subscribe( (message) => {
                                    drone_obj_array[0].state = message.mode;

                                    if (message.armed == false) {
                                        drone_obj_array[0].armed = "DISARMED";
                                      }
                                      else if (message.armed == true) {
                                        drone_obj_array[0].armed = "ARMED";
                                      }
                                      else {
                                        drone_obj_array[0].armed = "DISCONNECTED FROM VEHICLE"
                                      }
                                });
                                
                                //Distance sensor subscriber
                                Distance_incoming_obj.distance_listener.subscribe( (message) => {
                                    drone_obj_array[0].distance_z = message.range.toFixed(1)
                                });

                                //Velocity subscriber
                                Velocity_incoming_obj.velocity_listener.subscribe( (message) => {
                                    drone_obj_array[0].vel_x = message.twist.linear.x;
                                    drone_obj_array[0].vel_z = message.twist.linear.z;
                                });

                                //Battery subscriber
                                battery_incoming_obj.battery_listener.subscribe( (message) => {
                                    drone_obj_array[0].battery = message.percentage;
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
                toggle_nest_delete_modal_={toggleNestDeleteModal} 
                nest_obj_array={nest_obj_array}
                toggle_mission_modal={toggleMissionModal}
                toggle_nest_charge_modal_={toggleNestChargeModal}
                toggle_deploy_nest_modal_={toggleDeployNestModal}
                set_dest_nest_gps_={setDestNestGPS}
                update_nest_pos_={UpdateNestPos}
                toggle_arming_modal = {toggleArmingModal}
                />
            </Row>
            <Row>
                <CreateDrone drone_obj_array={drone_obj_array} show_modal={showDroneInitializeModal} toggle_modal_={toggleDroneInitModal} create_new_drone_={CreateNewDroneObject}/>
                <CreateNest nest_obj_array={nest_obj_array} show_nest_modal={showNestInitializeModal} toggle_nest_modal_={toggleNestInitModal} create_new_nest_={CreateNewNestObject}/>
                <DeleteDrone drone_obj_array={drone_obj_array} show_delete_modal={showDroneDeleteModal} toggle_delete_modal_={toggleDroneDeleteModal} delete_drone={DeleteDroneObject} />
                <CreateMission drone_obj_array={drone_obj_array} nest_obj_array={nest_obj_array} show_mission_modal={showMissionModal} toggle_mission_modal_={toggleMissionModal} launch_mission_={LaunchMission}/>
                <DeleteNest nest_obj_array={nest_obj_array} show_delete_nest_modal={showNestDeleteModal} toggle_delete_nest_modal_={toggleNestDeleteModal} delete_nest={DeleteNestObject}/>
                <NestCharge nest_obj_array={nest_obj_array} show_nest_charge_modal={showNestChargeModal} toggle_nest_charge_modal_={toggleNestChargeModal} initiate_charge={InitiateNestCharge} stop_charge={StopNestCharge}/>
                <DeployMissionNest drone_obj_array={drone_obj_array} show_deploy_nest_modal={showDeployNestModal} toggle_deploy_nest_modal_={toggleDeployNestModal} deploy_drone_nest={DeployDroneNest}/>
                <ArmDrone show_arming_modal={showArmingModal} toggle_arming_modal_={toggleArmingModal} drone_obj_array={drone_obj_array} request_arm_drone={requestArmDrone}/>
            </Row>
        </>
    );
}


export default ManageObjects;