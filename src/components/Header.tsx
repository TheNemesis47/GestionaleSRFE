import {Navbar, Nav, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaHome, FaBox, FaExchangeAlt, FaUsers, FaTruck, FaChartBar} from "react-icons/fa";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow vw-100">
            <Container>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    Gestionale
                </Navbar.Brand>

                {/* Toggle Button per dispositivi mobili */}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* Home */}
                        <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
                            <FaHome className="me-2"/> Home
                        </Nav.Link>

                        {/* Prodotti */}
                        <Nav.Link as={Link} to="/products" className="d-flex align-items-center">
                            <FaBox className="me-2"/> Prodotti
                        </Nav.Link>

                        {/* Flusso */}
                        <Nav.Link as={Link} to="/flusso" className="d-flex align-items-center">
                            <FaExchangeAlt className="me-2"/> Flusso
                        </Nav.Link>

                        {/* Clienti */}
                        <Nav.Link as={Link} to="/clienti" className="d-flex align-items-center">
                            <FaUsers className="me-2"/> Clienti
                        </Nav.Link>

                        {/* Fornitori */}
                        <Nav.Link as={Link} to="/suppliers" className="d-flex align-items-center">
                            <FaTruck className="me-2"/> Fornitori
                        </Nav.Link>

                        {/* Statistiche */}
                        <Nav.Link as={Link} to="/statistiche" className="d-flex align-items-center">
                            <FaChartBar className="me-2"/> Statistiche
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;