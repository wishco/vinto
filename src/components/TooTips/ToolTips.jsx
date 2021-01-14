import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useToolTips} from './ToolTipsContext';
import {getVarCssValue_MIC} from '../../template/libs/libMIC';



function getNewStyleToolTips(obj) {
  // obj параметры:
  // ToolTipX     длина ToolTips с бордюром
  // ToolTipY     высота ToolTips с бордюром
  // parentX      длина родителя
  // parentY      высота родителя
  // arrowX       длина стрелки
  // arrowY       высота стрелки (высота стрелки 50% от длины)
  // borderWidth  толщина бордюра

  const px = 'px';
  const deg = 'deg';
  const DEFAULT_ARROW_WIDTH = 22; // значение длины стрелки, если не задано
  let _arrowX = obj._arrowX || DEFAULT_ARROW_WIDTH;
  let _arrowY = _arrowX / 2;
  const maxArrowSide = _arrowX;
  const DEFAULT_SIDE_STICKY = 'top'; // значение прилипания ToolTips, если не задано
  const SIDE_STICKY = obj._sideSticky || DEFAULT_SIDE_STICKY;
  let offsetX = 0;
  let offsetY = 0;
  let rotate = 0;
  let arrowOffsetTop = 0;
  let arrowOffsetLeft = 0;
  const {_ToolTipX, _ToolTipY, _parentX, _parentY, _borderWidth} = obj;
  const _ToolTipX_trim = _ToolTipX - _borderWidth*2; // ширина tooltips без размера бордюра
  const _ToolTipY_trim = _ToolTipY - _borderWidth*2; // высота tooltips без размера бордюра

  // если рисуем стрелку с боков, то меняем ширину и высоту стрелки
  if  (SIDE_STICKY.includes('left') || SIDE_STICKY.includes('right')) [_arrowX, _arrowY] = [_arrowY, _arrowX];

  switch (SIDE_STICKY) {
    case 'top': // располагаем ToolTips сверху от родителя
      offsetX = 0 ;
      offsetY = -(_ToolTipY + _arrowY) + _borderWidth;
      rotate = 0;
      arrowOffsetTop = _ToolTipY - _borderWidth*2;
      arrowOffsetLeft = - _borderWidth + _ToolTipX/2 - _arrowX/2;
      break;

    case 'bottom': // располагаем ToolTips снизу от родителя
      offsetX = 0;
      offsetY = _parentY +_arrowY -_borderWidth;
      rotate = 180;
      arrowOffsetTop = 0;
      arrowOffsetLeft = -_borderWidth + _ToolTipX/2 + _arrowX/2;
      break;

    case 'right': // располагаем ToolTips справа от родителя
      offsetX = -_ToolTipX/2 - _parentX/2 -_arrowX + _borderWidth;
      offsetY = -_ToolTipY/2 + _parentY/2;
      rotate = 270;
      arrowOffsetTop = _ToolTipY_trim/2 + _arrowY/2;
      arrowOffsetLeft = _ToolTipX_trim;
      break;

    case 'left': // располагаем ToolTips слева от родителя
      offsetX = _ToolTipX/2 + _parentX/2 +_arrowX - _borderWidth;
      offsetY = -_ToolTipY/2 + _parentY/2;
      rotate = 90;
      arrowOffsetTop = (_ToolTipY_trim - _arrowY)/2;
      arrowOffsetLeft = 0;
      break;

  }

  // для отладки
  // console.log('------------')
  // console.log('ToolTipX: ' + _ToolTipX)
  // console.log('ToolTipY: ' + _ToolTipY)
  // console.log('parentX: ' + _parentX)
  // console.log('parentY:' + _parentY)
  // console.log('arrowX:' + _arrowX)
  // console.log('arrowY:' + _arrowY)
  // console.log('------------')
  // console.log('SIDE_STICKY:' + SIDE_STICKY)
  // console.log('------------')
  // console.log('offsetX:' + offsetX)
  // console.log('offsetY:' + offsetY)
  // console.log('rotate:' + rotate)
  // console.log('arrowOffsetTop:' + arrowOffsetTop)
  // console.log('arrowOffsetLeft:' + arrowOffsetLeft)
  // console.log('maxArrowSide:' + maxArrowSide)
  // console.log('_borderWidth:' + _borderWidth)


  return {
    'visibility': 'visible',
    'top' : offsetY + px,
    'left' : offsetX + px,
    '--mic-tooltips-rotate': rotate + deg,
    '--mic-tooltips-arrow-top': arrowOffsetTop + px,
    '--mic-tooltips-arrow-left': arrowOffsetLeft + px,
    '--mic-tooltips-width': _ToolTipX - _borderWidth*2 + 2 + px,
    '--mic-tooltips-height': _ToolTipY - _borderWidth*2 + 2 + px
  }
}


export default function ToolTips(props) {

  const refToolTips = useRef(null);
  const refParent = useRef(null);
  const [refToolTipsInit, setRefToolTipsInit] = useState(null);
  const [styleToolTips, setStyleToolTips] = useState({})
  const toolTips = useToolTips()


  useEffect(() => {
    if (toolTips.visible === true) {
      const arrowCssWidth = getVarCssValue_MIC('--mic-tooltips-arrow-width'); // получаем ширину из css переменной
      const borderWidth = getVarCssValue_MIC('--mic-tooltips-arrow-border'); // получаем размер border

      // Объект влияющий на новый стиль ToolTips
      const objStyleToolTips = {
        _ToolTipX: refToolTips.current.offsetWidth,
        _ToolTipY: refToolTips.current.offsetHeight,
        _parentX: refParent.current.offsetParent.offsetWidth,
        _parentY: refParent.current.offsetParent.offsetHeight,
        _arrowX: arrowCssWidth,
        _arrowY: arrowCssWidth/2,
        _borderWidth: borderWidth,
        _sideSticky: props.pos
      }

      setStyleToolTips(getNewStyleToolTips(objStyleToolTips));
    }
  }, [toolTips.visible]);

  if (!toolTips.visible) return null


  // получаем массив строк текста из ToolTipsProvider, для вывода его в toolTips
  const textToolTips = () => {
    if (props.textToolTips instanceof Array === true) { // если текст ToolTips массив
      return (
        <>
          {
            props.textToolTips.map((textItem, index) => (
                <p key={index} className={`tooltips__text`}> {textItem} </p>
              )
            )
          }
        </>
      )

    } else if (props.textToolTips !== void 0) // если текст ToolTips НЕ массив и НЕ undefined
      return (
        <>
          <p className={`tooltips__text`}> {props.textToolTips} </p>
        </>
      )

    else
      return ( // если текст ToolTips undefined
        <>
          <p className={`tooltips__text`}> {'Вы не задали текст в props "text" в ToolTipsProvider'} </p>
        </>
      )
  }



  return (
    <div className={'tooltips'}
         onClick={toolTips.toggle}
         ref={refParent}
    >
      <div className={`tooltips__wrap `} style={styleToolTips} ref={refToolTips}>
        <div className={'tooltips__box'}>
          <div className={'tooltips__simbol'}></div>
        </div>
        {textToolTips()}
      </div>
    </div>
  )

}


