import React from "react";
import {connect} from "react-redux";
import Svg from "./Svg";
import {updateStyleSvg} from "../../redux/svg-reducer";

const mapStateToProps = (state) => {

  return {
    styleSvg: state.svg.stylesSvg,
  }
};

let SvgContainer =
  connect(mapStateToProps, {updateStyleSvg})
  (Svg);

export default SvgContainer;

