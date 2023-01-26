import {React, useState} from "react";
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
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";

function MapVis(props) {

    const [showLeftPanel, setShowLeftPanel] = useState(false);
    const [showRightPanel, setShowRightPanel] = useState(false);

    const toggleLeftPanel = () =>setShowLeftPanel(!showLeftPanel);
    const toggleRightPanel = () =>setShowRightPanel(!showRightPanel);


    return (
        <>
        <Container>
            <Row className="md">
                <ButtonGroup>
                    <Button onClick={toggleLeftPanel} variant="outline-primary">Toggle Left</Button>
                    <Button onClick={toggleRightPanel} variant="outline-primary">Toggle Right</Button>
                </ButtonGroup>
            </Row>
            <Row>
            <Col style={{display: showLeftPanel ? 'block': 'none', transition: 'opacity 300ms ease-in'}}>
                <Row>
                    Right Data
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
            <Col style={{display: showRightPanel ? 'block': 'none', transition: 'opacity 300ms ease-in'}}>
                <DroneVis/>
            </Col>
            </Row>
        </Container>
        </>
    )

}
  
export default MapVis;