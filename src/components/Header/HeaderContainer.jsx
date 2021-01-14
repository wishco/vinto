import React, {useEffect} from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {saveActiveTabToHeaderNav} from "../../redux/header-reducer";

const mapStateToProps = (state) => {

  return {
    stylesSvg: state.svg.stylesSvg,
    headersNav: state.header.headersNav,
    navPagesUriState: state.app.navPagesUriState
  }
};

export default compose(
  connect(mapStateToProps, {saveActiveTabToHeaderNav}),
  withRouter
)(Header);
