import React from "react";
import {connect} from "react-redux";
import Main from "./Main";

import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {updateUriStructure} from "../../redux/app-reducer";


const mapStateToProps = (state) => {

  return {
    navPages: state.app.navPages,
  }
};

let MainContainer = compose(
  connect(mapStateToProps, {updateUriStructure}),
  withRouter
)(Main);


export default MainContainer;