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



function DroneNestManagement(props) {

    

    return(
        <>
        <Row className='mt-3'>
            <h4>
                Drone and Nest Management
            </h4>
            <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
        </Row>
        <Row>
            <Col>
                <ButtonGroup>
                    <Button variant="outline-success" onClick={props.toggle_modal_}>+ Drone</Button>
                    <Button variant="outline-danger">- Drone</Button>
                </ButtonGroup>
            </Col>
            <Col>
                <ButtonGroup>
                    <Button variant="outline-success">+ Nest</Button>
                    <Button variant="outline-danger">- Nest</Button>
                </ButtonGroup>
            </Col>
        </Row>
        <Row className='mt-4'>
            <Container style={{border: "solid white 0px", borderRadius: "8px"}}>
                <Table striped bordered responsive variant="dark">
                    <thead>
                    <tr>
                        <th><h4>Drone/Nest</h4></th>
                        <th><h4>Status</h4></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><h4>QROW 001</h4></td>
                            <td><h4>ONLINE</h4></td>
                        </tr>
                        <tr>
                            <td><h4>NEST 001</h4></td>
                            <td><h4>ONLINE</h4></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Row>
        </>
    )
}

export default DroneNestManagement;