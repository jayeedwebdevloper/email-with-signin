/* eslint-disable no-unused-vars */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Navbar expand="lg" className="bg-dark">
                <Container>
                    <Navbar.Brand className='text-white' href="/">AuthByEmail</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link><Link className='text-white fw-semibold text-decoration-none' to='/register'>Sign Up</Link></Nav.Link>
                            <Nav.Link><Link className='text-white fw-semibold text-decoration-none' to='/login'>Sign In</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;