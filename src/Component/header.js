import React from 'react'
import {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MovieBank from 'C:/Users/admin/content/src/images/imgpsh_fullsize_anim.png';
import { NavLink } from "react-router-dom";
class Header extends Component {
    render() {
        return (
            <Navbar  bg="light" expand="lg">
              <Navbar.Brand href="/"><img src={MovieBank}alt="MovieBank"></img></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink className="mb-nav-link" to="/">Home</NavLink>
                  <NavLink className="mb-nav-link" to="/crew">Crew</NavLink>
                  <NavLink className="mb-nav-link" to="/castingcall">Casting Call</NavLink>
                </Nav>
              </Navbar.Collapse>
          </Navbar> 
        )
    }
}
export default Header