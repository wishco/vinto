import React, {useEffect, useState} from 'react';

import {compose} from 'redux';
import {connect} from 'react-redux';

import TableMic from './TableMic';
import {showModalMessage} from '../../redux/modal-message-reducer';


const mapStateToProps = (state) => {

  return {
    buttonsStyles: state.buttons.styleButtonsDefault,
    buttonsActions: state.buttons.actions,
    modalStatus: state.modalMessages.modalStatus
  }
};

let TableMicContainer = compose(
  connect(mapStateToProps, {showModalMessage})
)(TableMic);

export default TableMicContainer;



