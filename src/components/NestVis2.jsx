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
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';



function NestVis(props) {

    const telem_tabs = []

    for (var i=0; i<props.nest_obj_array.length; i++) {
        if(props.nest_obj_array[i].initialized) {
        telem_tabs.push(
            <Tab eventKey={props.nest_obj_array[i].id} title={props.nest_obj_array[i].id}>
                <Table striped bordered responsive variant="dark" style={{fontSize: "0.5em"}}>
                    <thead style={{fontSize: "0.5em"}}>
                    <tr>
                        <th><h4>Connection</h4></th>
                        <th><h4>Status</h4></th>
                    </tr>
                    </thead>
                    <tbody className='justify-content-center' style={{fontSize: "0.5em"}}>
                        <tr>
                            <th><h4>Latitude</h4></th>
                            <th><h4>{props.nest_obj_array[i].position[0]}</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Longitude</h4></th>
                            <th><h4>{props.nest_obj_array[i].position[1]}</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Altitude</h4></th>
                            <th><h4>{props.nest_obj_array[i].position[2]}</h4></th>
                        </tr>
                        <tr>
                            <th><h4>Charge Status</h4></th>
                            <th><h4>{props.nest_obj_array[i].charge_status}</h4></th>
                        </tr>
                    </tbody>
                </Table>
            </Tab>
        )
        }
    }

    return(
        <>
            <Row className='mt-3'>
            <h4>
                Nest Telemetry
            </h4>
            <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
            </Row>
            <Row className='mb-3'>
                <Tabs
                    defaultActiveKey="profile"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                    style={{fontSize: "0.5em"}}
                >
                    {telem_tabs}
                </Tabs>
            </Row>
        </>
    )
}

export default NestVis;