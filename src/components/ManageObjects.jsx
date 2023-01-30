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
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";


function ManageObjects() {

    const [showSystemStatus, setShowSystemStatus] = useState('');

    const ConnectSystemStatus = () =>setShowSystemStatus('success');
    const DisconnectSystemStatus = () =>setShowSystemStatus('danger');


    return (
        <>
            <Row className="m-4" style={{ width: "50%"}}>
                <Col>
                    <Button variant="outline-success" onClick={ConnectSystemStatus}>eve Connect</Button>
                </Col>
                <Col>
                    <Badge bg={showSystemStatus}>
                        System Status
                    </Badge>
                </Col>
                <Col>
                    <Button variant="outline-danger" onClick={DisconnectSystemStatus}>eve Disconnect</Button>
                </Col>
            </Row>
            <Row>
                <MapVis/>
            </Row>
        </>
    );
}


export default ManageObjects;