import React from "react";
import {connect} from "react-redux";
import Pages from "./Pages";

const PagesContainer = ({routeText, ...props}) => {
  console.log(routeText)
  return (
    <>
      <Pages
        routeText = {routeText}
      />
    </>
  )
}

const mapStateToProps = (state) => {

  return {
    // navPages: state.app.navPages
    // headerOptions: state.header.headerOptions,
    // currentNav: state.header.currentNav
  }
};

export default connect(mapStateToProps, {})(PagesContainer);
