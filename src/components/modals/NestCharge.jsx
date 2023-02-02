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




function NestChargeModal(props) {

    // State functions for form data
    const [newNest_id, SetnewNest_id] = React.useState("");


    const vinChangeHandler = (event) => {
        SetnewNest_id(event.target.value);
    };

    var nest_options = [<option></option>];

    for (let i=0; i<props.nest_obj_array.length; i++) {
        if(props.nest_obj_array[i].initialized) {
            nest_options.push(
                <option value={props.nest_obj_array[i].id}>{props.nest_obj_array[i].id}</option>
            )
        }
    }


  return(
    <>

        {/* Start Modal */}

        <Modal show={ props.show_nest_charge_modal } onHide={ props.toggle_nest_charge_modal_ }>
            <Modal.Header closeButton>
                <Modal.Title>
                    Initiate Nest Charging
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Col>
                        <Row className="pb-3 px-1">
                            <Form.Text className="text-muted">
                                Please select a nest to initialize charging. The system will automatically run pre-checks.
                            </Form.Text>
                        </Row>
                        <FloatingLabel 
                            controlId='floatingSelect' 
                            label='ID' 
                            style={{ color:'blue', fontSize:'1rem' }}
                            className="mb-3">
                            <Form.Select aria-label='Select ID' value={newNest_id} onChange={vinChangeHandler}>
                                {nest_options}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Row className="justify-content-between">
                    <Col>
                    <Button variant="info" onClick={props.initiate_charge}>
                        Initiate Nest Charging
                    </Button>
                    </Col>
                    <Col>
                    <Button variant="danger" onClick={props.stop_charge}>
                        Stop Nest Charging
                    </Button>
                    </Col>
                    </Row>
                </Form>
            </Modal.Body>

        </Modal>

    </>
  );
}

export default NestChargeModal;