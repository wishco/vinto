import React from 'react';
import PageSettingsBasic from './PageSettingsBasic';
import {compose} from 'redux';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
  return {
    settingsBasic: state.settingsBasic

  }
};



let PageSettingsBasicContainer = compose(
  connect(mapStateToProps, {})
)(PageSettingsBasic);



export default PageSettingsBasicContainer;