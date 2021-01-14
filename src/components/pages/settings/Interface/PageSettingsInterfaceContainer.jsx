import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PageSettingsInterface from './PageSettingsInterface';
import {showModalMessage} from '../../../../redux/modal-message-reducer';



const mapStateToProps = (state) => {
  return {
    modalStatus: state.modalMessages.modalStatus,
    modalMessageType: state.modalMessages.modalMessageType,
    modalTable: state.modalMessages.table
  }
};

let PageSettingsInterfaceContainer = compose(
  connect(mapStateToProps, {showModalMessage})
)(PageSettingsInterface);

export default PageSettingsInterfaceContainer;