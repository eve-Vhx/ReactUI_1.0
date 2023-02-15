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




function ArmDroneModal(props) {

    const [newDrone_vin, SetnewDrone_vin] = React.useState("");

    const vinChangeHandler = (event) => {
        SetnewDrone_vin(event.target.value);
      };

      var drone_options = [<option></option>];

      for (let i=0; i<props.drone_obj_array.length; i++) {
          if(props.drone_obj_array[i].initialized) {
              drone_options.push(
                  <option value={props.drone_obj_array[i].id}>{props.drone_obj_array[i].id}</option>
              )
          }
      }


    function requestArm() {
        props.request_arm_drone(newDrone_vin);
    }
  return(
    <>

        {/* Start Modal */}

        <Modal show={ props.show_arming_modal } onHide={ props.toggle_arming_modal_ }>
            <Modal.Header closeButton>
                <Modal.Title>
                    Arm Drone
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form>
                    <Col>
                        <Row className="pb-3 px-1">
                            <Form.Text className="text-muted">
                                Select a drone to arm. This will allow the drone to receive mission commands.
                            </Form.Text>
                        </Row>
                        <FloatingLabel 
                            controlId='floatingSelect' 
                            label='VIN' 
                            style={{ color:'blue', fontSize:'1rem' }}
                            className="mb-3">
                            <Form.Select aria-label='Select VIN' value={newDrone_vin} onChange={vinChangeHandler}>
                                {drone_options}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={requestArm}>Arm Drone</Button>
            </Modal.Footer>

        </Modal>

    </>
  );
}

export default ArmDroneModal;