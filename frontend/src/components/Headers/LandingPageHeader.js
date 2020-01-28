import React from "react";
import SearchField from "react-search-field";
// reactstrap components

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg8.jpg") + ")"
          }}
          ref={pageHeader}
        />

        <div className="content">
        <center>
          <SearchField
              placeholder="Search..."
              onChange=""
              searchText="This is initial search text"
              classNames="test-class"
          /></center>
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;
