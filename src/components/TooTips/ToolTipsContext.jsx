import React, {useContext, useState} from 'react';
import ToolTips from './ToolTips';


const ToolTipsContext = React.createContext()

export const useToolTips = () => {
  return useContext(ToolTipsContext)
}

export const ToolTipsProvider = ({children, text, pos}) => {
  // text - текст toolTips
  // pos - позиция относительно родителя, где располагать toolTips
  const [toolTips, setToolTips] = useState(false)
  const toggle = () => setToolTips(prev => !prev)

  return (
    <>
      <ToolTipsContext.Provider
        value={{
          visible: toolTips, // состояние отображения toolTips
          toggle, // фнкция изменения состояния отображения toolTips,
          pos: pos,
          textToolTips: text
        }}
      >
        <div className={'tooltips-parent'}>
          <ToolTips pos={pos} textToolTips={text}/>
          {children}
        </div>
      </ToolTipsContext.Provider>

    </>
  )
}
