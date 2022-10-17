import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {default as BootstrapNavbar} from 'react-bootstrap/Navbar';
import CartWidget from './CartWidget'

function Navbar() {
  return (
    <>
      <BootstrapNavbar bg="light" variant="light">
        <Container>
          <BootstrapNavbar.Brand href="#home">
             Home</BootstrapNavbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Marca</Nav.Link>
            <Nav.Link href="#features">Productos</Nav.Link>
            <Nav.Link href="#pricing">Contacto</Nav.Link>
          </Nav>
          <CartWidget/>
        </Container>
      </BootstrapNavbar>
    </>
  );
}

export default Navbar;

