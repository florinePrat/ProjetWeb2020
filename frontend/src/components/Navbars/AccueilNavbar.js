import React from "react";
// reactstrap components
import {
    NavbarBrand,
    Navbar,
    Container,
} from "reactstrap";



function AccueilNavbar() {
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
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

                    </div>

                </Container>
            </Navbar>
        </>
    );
}

export default AccueilNavbar;
