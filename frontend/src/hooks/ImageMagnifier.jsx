import { useState, useCallback } from 'react'

const ImageMagnifier = ({ imageSrc, imageAlt, zoomFactor = 2.5 }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 })

  const handleMouseEnter = useCallback((e) => {
    const { width, height } = e.currentTarget.getBoundingClientRect()
    setImgSize({ w: width, h: height })
    setIsHovering(true)
  }, [])

  const handleMouseMove = useCallback((e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - left, y: e.clientY - top })
  }, [])

  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  const xPct = imgSize.w ? (mousePos.x / imgSize.w) * 100 : 0
  const yPct = imgSize.h ? (mousePos.y / imgSize.h) * 100 : 0

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
 
        // borderRadius: '8px',

        backgroundImage: `url(${imageSrc})`,

        // yesma xhai mathi calculate gareko image width height ra weight lai zoomfactor sanga multiplely garera chane aajai zoom in garana
    //    aani x and y le move position leyera zoom in herxa
        backgroundSize: isHovering
          ? `${imgSize.w * zoomFactor}px ${imgSize.h * zoomFactor}px`  
          : '100% 100%',                                                
        backgroundPosition: isHovering ? `${xPct}% ${yPct}%` : 'center',
        transition: 'all 0.5s ease',  
          }}
      className='h-[calc(100vh)] w-200'

    />
  )
}

export default ImageMagnifier