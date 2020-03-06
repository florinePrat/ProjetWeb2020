import React, {useEffect} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";
import auth from "../../utils/auth";
import user from "../../utils/users";



function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [userId] = React.useState(localStorage.getItem('userId'));
  const [imageUrl, setImageUrl] = React.useState(localStorage.getItem('userId'));

  useEffect(() => {
    user.getUser(userId)
        .then(res =>{
          const user = res.data;
          console.log("my user ; ",user);
          setImageUrl(user.imageUrl);
          console.log('my user image :', imageUrl);
        }, function (data) {
          console.log('je suis dans data erreur', data);
        });
  },[]);

  const logout = event => {
    console.log("logout called");
    auth.logout();
    window.location= '/';
  };

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
              href="https://demos.creative-tim.com/now-ui-kit-react/index?ref=nukr-examples-navbar"
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
                <NavLink to="/landing-page" tag={Link}>
                  Accueil
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile-page" tag={Link}>
                  <img
                      id="photo"
                      alt="..."
                      src={imageUrl}
                      height={20}
                  />
                  {" \u00a0"}Profil
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                    onClick={logout}
                    target="_blank"
                    id="logout"
                >
                  <i className="fas fa-power-off"/>
                  <p className="d-lg-none d-xl-none"> {" \u00a0"} Déconnexion</p>
                </NavLink>
                <UncontrolledTooltip target="#logout">
                  Me déconnecter
                </UncontrolledTooltip>
              </NavItem>


            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar;
