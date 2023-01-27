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



function CreateDroneModal(props) {

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // State functions for form data
    const [newDrone_type, SetnewDrone_type] = React.useState("QROW");
    const [newDrone_vin, SetnewDrone_vin] = React.useState("001");

    const typeChangeHandler = (event) => {
        SetnewDrone_type(event.target.value);
    };

    const vinChangeHandler = (event) => {
        SetnewDrone_vin(event.target.value);
      };


  return(
    <>

        {/* Start Modal */}

        <Modal show={ props.show_modal } onHide={ props.toggle_modal_ }>
            <Modal.Header closeButton>
                <Modal.Title>
                    Initialize Drone
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Col>
                        <Row className="pb-3 px-1">
                            <Form.Text className="text-muted">
                                Please select a drone to initialize in the map. By selecting a drone type and VIN number the system will automatically look for and connect to the drone.
                            </Form.Text>
                        </Row>
                        <FloatingLabel
                            controlId='floatingSelect' 
                            label='Vehicle Type' 
                            style={{ color:'blue', fontSize:'1rem' }}
                            className="mb-3">
                            <Form.Select aria-label='Select Vehicle Type' value={newDrone_type} onChange={typeChangeHandler}>
                                <option value="QROW">QROW</option>

                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel 
                            controlId='floatingSelect' 
                            label='VIN' 
                            style={{ color:'blue', fontSize:'1rem' }}
                            className="mb-3">
                            <Form.Select aria-label='Select VIN' value={newDrone_vin} onChange={vinChangeHandler}>
                                <option value="001">001</option>
                                <option value="002">002</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Button variant="primary" onClick={handleClose}>
                        Initialize Drone
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>

    </>
  );
}

export default CreateDroneModal;