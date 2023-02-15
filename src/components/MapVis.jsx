import {React, useState, useRef} from "react";
import Map, { Layer, Marker, Popup, useMap } from "react-map-gl";
import maplibregl from "maplibre-gl";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "maplibre-gl/dist/maplibre-gl.css";
import"../css/MV.css"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Overlay from "react-bootstrap/Overlay";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

//Import components
import DroneNestManagement from './DroneNestManagement';
import MissionControl from "./MissionControl";
import NestCharging from "./NestCharging";
import DroneVis from "./DroneVis";
import NestVis from "./NestVis";

//Import images
import drone_image from "../images/QROW_UI.png";
import nest_image from "../images/eve_nest.png";

function MapVis(props) {

    const [showLeftPanel, setShowLeftPanel] = useState(false);
    const [showRightPanel, setShowRightPanel] = useState(false);
    const [showDronePopup, setShowDronePopup] = useState(false);
    const [showNestPopup, setShowNestPopup] = useState(false);

    const toggleLeftPanel = () =>setShowLeftPanel(!showLeftPanel);
    const toggleRightPanel = () =>setShowRightPanel(!showRightPanel);

    var drone_markers = [];

    for (let i=0; i<props.drone_obj_array.length; i++) {
        if(props.drone_obj_array[i].initialized) {
            drone_markers.push(
                <>
                
                <Marker 
                latitude={ props.drone_obj_array[i].gps_position[0] }
                longitude={ props.drone_obj_array[i].gps_position[1] }
                anchor="center"
                color="blue"
                style={{ cursor: "pointer" }}
                rotation="0"
                onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setShowDronePopup(!showDronePopup);
                  }}
                >
                    <img src={ drone_image } alt="" width="108px" height="98px" label="QROW"/>
                </Marker>
                { showDronePopup && (<Popup show={false} style={{ color: "black" }} latitude={ props.drone_obj_array[i].gps_position[0] } longitude={ props.drone_obj_array[i].gps_position[1] } closeButton={0} anchor="bottom">
                    <Card className="bg-light text-black">
                        <Card.Header as="h5">QROW {props.drone_obj_array[i].id}</Card.Header>
                        <Card.Body className="bg-light">
                            <Container className="p-0 m-0" style={{fontSize: "1.25em"}}>
                            <ListGroup className="list-group-flush bg-light">
                                <ListGroup.Item>Latitude: {props.drone_obj_array[i].gps_position[0]}</ListGroup.Item>
                                <ListGroup.Item>Longitude: {props.drone_obj_array[i].gps_position[1]}</ListGroup.Item>
                                <ListGroup.Item>Altitude: {props.drone_obj_array[i].gps_position[2]}</ListGroup.Item>
                                <ListGroup.Item>State: {props.drone_obj_array[i].state}</ListGroup.Item>
                                <ListGroup.Item>Mission Status: {props.drone_obj_array[i].mission_status}</ListGroup.Item>
                            </ListGroup>
                            </Container>
                        </Card.Body>
                        <Card.Footer>
                            <Row className="pb-2">
                                <Button variant="success" onClick={props.toggle_mission_modal}>Deploy Drone</Button>
                            </Row>
                            <Row>
                                <Button variant="warning" onClick={props.toggle_arming_modal}>Arm Drone</Button>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Popup>) }
                </>
                
            )
        }
    }

    var nest_markers = [];

    for (let i=0; i<props.nest_obj_array.length; i++) {
        if(props.nest_obj_array[i].initialized) {
            nest_markers.push(
                <>
                
                <Marker 
                latitude={ props.nest_obj_array[i].position[0] }
                longitude={ props.nest_obj_array[i].position[1] }
                anchor="center"
                color="blue"
                style={{ cursor: "pointer" }}
                rotation="0"
                onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setShowNestPopup(!showNestPopup);
                  }}
                >
                    <img src={ nest_image } alt="" width="88px" height="78px"/>
                </Marker>
                { showNestPopup && (<Popup style={{ color: "black" }} latitude={ props.nest_obj_array[i].position[0] } longitude={ props.nest_obj_array[i].position[1] } closeButton={0}>
                    <Card className="bg-light text-black">
                        <Card.Header as="h5">Nest {props.nest_obj_array[i].id}</Card.Header>
                        <Card.Body className="bg-light">
                            <Container className="p-0 m-0" style={{fontSize: "1.25em"}}>
                            <ListGroup className="list-group-flush bg-light">
                                <ListGroup.Item>Latitude: {props.nest_obj_array[i].position[0]}</ListGroup.Item>
                                <ListGroup.Item>Longitude: {props.nest_obj_array[i].position[1]}</ListGroup.Item>
                                <ListGroup.Item>Altitude: {props.nest_obj_array[i].position[2]}</ListGroup.Item>
                                <ListGroup.Item>Charge Status: {props.nest_obj_array[i].charge_status}</ListGroup.Item>
                            </ListGroup>
                            </Container>
                        </Card.Body>
                        <Card.Footer>
                            <Row className="pb-2">
                            <Button variant="info" onClick={props.toggle_nest_charge_modal_}>Initiate Charging</Button>
                            </Row>
                            <Row>
                            <Button variant="warning" onClick={props.update_nest_pos_}>Update Position</Button>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Popup>) }
                </>
                
            )
        }
    }

    function DeployCallback(nest_pos) {
        props.toggle_deploy_nest_modal_();
    }

    return (
        <>
        <Container>
            <Row style={{ width: '10vw' }}className="justify-content-center">
                <ButtonGroup>
                    <Button variant="secondary" onClick={toggleLeftPanel}>Toggle Control</Button>
                    <Button variant="secondary" onClick={toggleRightPanel}>Toggle Telemetry</Button>
                </ButtonGroup>
            </Row>
            <Row>
            <Col xs={3} style={{display: showLeftPanel ? 'block': 'none', transition: 'opacity 300ms ease-in'}}>
                <Row>
                    <DroneNestManagement 
                    toggle_delete_modal_={props.toggle_delete_modal_} 
                    toggle_modal_={props.toggle_modal_} 
                    drone_obj_array={props.drone_obj_array}
                    toggle_nest_delete_modal_={props.toggle_nest_delete_modal_} 
                    toggle_nest_modal_={props.toggle_nest_modal_} 
                    nest_obj_array={props.nest_obj_array}/>
                </Row>
                <Row>
                    <MissionControl
                    toggle_mission_modal={props.toggle_mission_modal}
                    drone_obj_array={props.drone_obj_array}/>
                </Row>
                <Row>
                    <NestCharging
                    toggle_nest_charge_modal_={props.toggle_nest_charge_modal_}
                    nest_obj_array={props.nest_obj_array}/>
                </Row>
            </Col>
            <Col fluid>
                <Map
                    mapLib={maplibregl}
                    initialViewState={{
                        latitude: 30.391,
                        longitude: -97.727,
                        zoom: 14,
                    }}  
                    style={{
                        border: "2.5% solid #0d6efd",
                        borderRadius: "0%",
                        width: "100%",
                        height: "85vh",
                    }}
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                >
                    {drone_markers}
                    {nest_markers}
                </Map>
            </Col>
            <Col xs={3} style={{display: showRightPanel ? 'block': 'none', transition: 'opacity 300ms ease-in'}}>
                <DroneVis drone_obj_array={props.drone_obj_array}/>
                <NestVis nest_obj_array={props.nest_obj_array}/>
            </Col>
            </Row>
        </Container>
        </>
    )

}
  
export default MapVis;