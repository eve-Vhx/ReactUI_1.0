import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import DroneVis from '../components/DroneVis';
import NestVis from '../components/NestVis';

function Single() {
    
    return (
    <>
        
        <DroneVis/>
        <NestVis/>
    </>
    );
}

export default Single;