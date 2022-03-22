import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import '../stylesheets/searchBar.css'

const searchBar = ({handleChange, handleClick, onClick}:{handleChange:any, handleClick:any, onClick:any} ) => {
    
    return (
        <Navbar className = " pl-3 justify-content-center top-nav-bar navbar-dark lead myNavBar" expand="lg">
            <Container fluid>
                
                <Navbar.Brand href="#" className='pl-2 title'>Trading View</Navbar.Brand>
                <button onClick = {onClick} className = "print">Click me</button>
                <Form className="d-flex searchBox">
                    <FormControl
                        type="text"
                        onChange = {(e) => handleChange(e.target.value)}
                        placeholder="Search"
                        className="me-2 bg-gradient searchBar"
                        aria-label="Search"
                    />
                    <Button 
                        onClick = {() => handleClick()}
                        className = "btn btn-secondary">Search
                    </Button>
                </Form>
            </Container>
        </Navbar>
    )
}

export default searchBar