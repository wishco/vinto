import React from "react";
import TableMicContainer from '../../../TableMic/TableMicContainer';


const PageSettingsBasic = ({settingsBasic, ...props}) => {
  return (
    <>
      <TableMicContainer currTable={settingsBasic}/>
      <div>PageSettingsBasic</div>

    </>
  )
}

export default PageSettingsBasic;