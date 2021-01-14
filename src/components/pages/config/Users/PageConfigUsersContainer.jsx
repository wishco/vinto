import React, {useEffect, useState} from 'react';

import PageConfigUsers from './PageConfigUsers';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {showModalMessage} from '../../../../redux/modal-message-reducer';


const mapStateToProps = (state) => {

  return {
    buttonsStyles: state.buttons.styleButtonsDefault,
    buttonsActions: state.buttons.actions,
    users: state.users.users,
    tableUsers: state.users.tableUsers,
    // modalMessage: state.modalMessage.modalStatus
  }
};

let PageConfigUsersContainer = compose(
  connect(mapStateToProps, {showModalMessage})
)(PageConfigUsers);

export default PageConfigUsersContainer;



