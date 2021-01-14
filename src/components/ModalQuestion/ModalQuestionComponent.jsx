import React from "react";
import {connect} from "react-redux";

import {updateStyleSvg} from "../../redux/svg-reducer";
import ModalQuestion from './ModalQuestion';

const mapStateToProps = (state) => {

  return {
    // styleSvg: state.svg.stylesSvg,
  }
};

let ModalQuestionComponent =
  connect(mapStateToProps, {updateStyleSvg})
  (ModalQuestion);

export default ModalQuestionComponent;

