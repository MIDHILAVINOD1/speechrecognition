import React from 'react'
import {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Header from './header';
class Home extends Component {
    render() {
        return (
            <Container fluid>
            <div class="movie-bank-home">
            <Header/>
            <h1 class="heading">About</h1>
            <div class="description">
            Hire a crew – actors, actress, models, technicians etc. who belongs to the elite movie industries in India and across the globe.
            Create cinematic style videos by easily accessing the rental equipment and tools from Moviebank platform.
            Reach out to your favorite Influencers/actors for a campaign or request a shout out - wish video on your special occasions.
            Quick and easy access to a varieties of casting calls from different ad agencies, production companies, casting agencies etc.
            </div>
        </div>
            </Container>
           
        )
    }
}
export default Home