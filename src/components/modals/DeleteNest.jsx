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




function DeleteNestModal(props) {


    // State functions for form data
    const [nest_id, SetNestID] = React.useState("");


    const vinChangeHandler = (event) => {
        SetNestID(event.target.value);
      };
    
    function deleteNest() {
        props.delete_nest(nest_id);
    }

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
        <Modal show={ props.show_delete_nest_modal } onHide={ props.toggle_delete_nest_modal_ }>
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete Nest
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Col>
                        <Row className="pb-3 px-1">
                            <Form.Text className="text-muted">
                                Please select a Nest to delete on the map. This Nest will no longer send information to the UI.
                            </Form.Text>
                        </Row>
                        <FloatingLabel 
                            controlId='floatingSelect' 
                            label='ID' 
                            style={{ color:'red', fontSize:'1rem' }}
                            className="mb-3">
                            <Form.Select aria-label='Select ID' value={nest_id} onChange={vinChangeHandler}>
                                {nest_options}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Button variant="danger" onClick={deleteNest}>
                        Delete Nest
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>

    </>
  );
}

export default DeleteNestModal;