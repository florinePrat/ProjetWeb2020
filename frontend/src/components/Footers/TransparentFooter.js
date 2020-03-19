/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                  href="./landing-page"
                  target="_blank"
              >
                Home
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}
          . Coded by{" "}
          <a
              href="./landing-page"
              target="_blank"
          >
            Locat'me
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;
