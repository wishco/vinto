import React from "react";
import {connect} from "react-redux";
import ModalMessage from "./ModalMessage";
import {compose} from "redux";
import {closeModalMessage, updateTable} from '../../redux/modal-message-reducer';
import {setModalPos} from '../../redux/window-reducer';


const mapStateToProps = (state) => {

  return {
    modalTable:  state.modalMessages.table,
    modalStatus: state.modalMessages.modalStatus,
    modalMessageType: state.modalMessages.modalMessageType,
    windowSize: state.windowState.size,
    windowModalDrag: state.windowState.drag,
    windowModalPos: state.windowState.modalPos

  }
};

let ModalMessageContainer = compose(
  connect(mapStateToProps, {closeModalMessage, setModalPos, updateTable})
)(ModalMessage);

export default ModalMessageContainer;