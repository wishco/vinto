import React from "react";

const Svg = ({svgOptions, styleSvg, itemStyleSvg, updateStyleSvg,...props}) => {
  let _className = props.className || '';
  let _classNamePath;

  if (svgOptions.redirectTab !== void 0)   { // при навигации добавляем стиль навигации
    _classNamePath = `svg__path svg__path_nav ${_className} `;
  }
  else {
    _classNamePath = `svg__path ${_className}`;
  }

  return (
    <>
      <svg  className={`svg`} xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width={itemStyleSvg.width}
           height={itemStyleSvg.height} version="1.1"
           shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality"
           fillRule="evenodd" clipRule="evenodd"
           viewBox={svgOptions.svgType.viewBox}>
        <path className= {_classNamePath} d={svgOptions.svgType.path}/>
      </svg>
    </>

  )
}

export default Svg;

