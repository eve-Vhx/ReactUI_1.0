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




function DeleteDroneModal(props) {

    // State functions for form data
    const [newDrone_type, SetnewDrone_type] = React.useState("QROW");
    const [newDrone_vin, SetnewDrone_vin] = React.useState("");

    const typeChangeHandler = (event) => {
        SetnewDrone_type(event.target.value);
    };

    const vinChangeHandler = (event) => {
        SetnewDrone_vin(event.target.value);
      };
    
    function deployDrone() {
        props.deploy_drone_nest(newDrone_vin);
    }

    var drone_options = [<option></option>];

    for (let i=0; i<props.drone_obj_array.length; i++) {
        if(props.drone_obj_array[i].initialized) {
            drone_options.push(
                <option value={props.drone_obj_array[i].id}>{props.drone_obj_array[i].id}</option>
            )
        }
    }
    
  return(
    <>

        {/* Start Modal */}
        <Modal show={ props.show_deploy_nest_modal } onHide={ props.toggle_deploy_nest_modal_ }>
            <Modal.Header closeButton>
                <Modal.Title>
                    Deploy Drone to Nest
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Col>
                        <Row className="pb-3 px-1">
                            <Form.Text className="text-muted">
                                Please select a drone to deploy to the nest.
                            </Form.Text>
                        </Row>
                        <FloatingLabel
                            controlId='floatingSelect' 
                            label='Vehicle Type' 
                            style={{ color:'red', fontSize:'1rem' }}
                            className="mb-3">
                            <Form.Select aria-label='Select Vehicle Type' value={newDrone_type} onChange={typeChangeHandler}>
                                <option value="QROW">QROW</option>

                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel 
                            controlId='floatingSelect' 
                            label='VIN' 
                            style={{ color:'red', fontSize:'1rem' }}
                            className="mb-3">
                            <Form.Select aria-label='Select VIN' value={newDrone_vin} onChange={vinChangeHandler}>
                                {drone_options}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Button variant="success" onClick={deployDrone}>
                        Deploy Drone
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>

    </>
  );
}

export default DeleteDroneModal;