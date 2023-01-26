import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import DroneVis from '../components/DroneVis';

//Image imports
import Logo from '../logos/Logo-01.png';

//Import components
import ManageObjects from '../components/ManageObjects';

function Single() {
    
    return (
    <>
        <Container fluid className='justify-content-center'>
            <Row className='justify-content-center'>
                <img src={ Logo } alt="" style={{ width: "500px", margin: "1rem" }}/>
            </Row>
            <Row className='justify-content-center'>
                <ManageObjects/>
            </Row>
            {/* <DroneVis/> */}
            
        </Container>
    </>
    );
}

export default Single;