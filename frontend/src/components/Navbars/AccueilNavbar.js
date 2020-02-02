import React from "react";
// reactstrap components
import {
    NavbarBrand,
    Navbar,
    Container, Nav, NavItem, NavLink, Collapse,
} from "reactstrap";
import {Link} from "react-router-dom";



function AccueilNavbar() {
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 399 ||
                document.body.scrollTop > 399
            ) {
                setNavbarColor("");
            } else if (
                document.documentElement.scrollTop < 400 ||
                document.body.scrollTop < 400
            ) {
                setNavbarColor("navbar-transparent");
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });
    return (
        <>
            {collapseOpen ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setCollapseOpen(false);
                    }}
                />
            ) : null}

            <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
                <Container>

                    <div className="navbar-translate">
                        <NavbarBrand
                            href="#"
                            target="_blank"
                            id="navbar-brand"
                        >
                            Locat'Me
                        </NavbarBrand>
                        <button
                            className="navbar-toggler navbar-toggler"
                            onClick={() => {
                                document.documentElement.classList.toggle("nav-open");
                                setCollapseOpen(!collapseOpen);
                            }}
                            aria-expanded={collapseOpen}
                            type="button"
                        >
                            <span className="navbar-toggler-bar top-bar"/>
                            <span className="navbar-toggler-bar middle-bar"/>
                            <span className="navbar-toggler-bar bottom-bar"/>
                        </button>
                    </div>
                    <Collapse
                        className="justify-content-end"
                        isOpen={collapseOpen}
                        navbar
                    >
                        <Nav navbar>
                            <NavItem>
                                <NavLink to="/" tag={Link}>
                                    Accueil
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login-page">
                                    Se connecter
                                </NavLink>
                            </NavItem>

                        </Nav>
                    </Collapse>

                </Container>
            </Navbar>
        </>
    );
}

export default AccueilNavbar;
