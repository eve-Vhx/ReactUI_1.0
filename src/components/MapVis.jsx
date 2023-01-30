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
import DroneVis from "./DroneVis";
import NestVis from "./NestVis";
import"../css/MV.css"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Overlay from "react-bootstrap/Overlay";

//Import components
import DroneNestManagement from './DroneNestManagement';

function MapVis(props) {

    const [showLeftPanel, setShowLeftPanel] = useState(false);
    const [showRightPanel, setShowRightPanel] = useState(false);

    const toggleLeftPanel = () =>setShowLeftPanel(!showLeftPanel);
    const toggleRightPanel = () =>setShowRightPanel(!showRightPanel);

    const target = useRef(null);

    return (
        <>
        <Container>
            <Row className="space-between">
                <Button variant="secondary" onClick={toggleLeftPanel}>Toggle Left</Button>
                <Button variant="secondary" onClick={toggleRightPanel}>Toggle Right</Button>
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