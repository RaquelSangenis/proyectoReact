import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {default as BootstrapNavbar} from 'react-bootstrap/Navbar';
import CartWidget from './CartWidget'
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <>
      <BootstrapNavbar bg="bolder" variant="bolder">
        <Container>
            <BootstrapNavbar.Brand>
              <Link to="/">Home</Link>
            </BootstrapNavbar.Brand>
            <Nav className="me-auto">
              <Link to="/categories">Categorias</Link>
              <Link to="/products">Productos</Link>
            </Nav>
          <CartWidget />
        </Container>
      </BootstrapNavbar>
    </>
  );
}

export default Navbar;

