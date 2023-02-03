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



function NestCharging(props) {

    return(
        <>
            <Row className='mt-3'>
            <h4>
                Nest Charging
            </h4>
            <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
            </Row>
            <Row className='py-4'>
            <Button variant="outline-info" onClick={props.toggle_nest_charge_modal_}>Charge Drone</Button>
            </Row>
            <Row className='mb-3'>
                <Table striped bordered responsive variant="dark">
                    <thead>
                    <tr>
                        <th><h4>Nest</h4></th>
                        <th><h4>Status</h4></th>
                        <th><h4>Vehicle</h4></th>
                    </tr>
                    </thead>
                    <tbody className='justify-content-center'>
                        
                    </tbody>
                </Table>
            </Row>
        </>
    )
}

export default NestCharging;