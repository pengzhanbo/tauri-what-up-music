/**
 * 弹层 三角角标
 */
import type { CSSProperties } from 'react'
import { memo } from 'react'

type Position = 'top' | 'right' | 'bottom' | 'left'

const borderProperties: Record<Position, string> = {
  top: 'borderBottom',
  right: 'borderLeft',
  bottom: 'borderTop',
  left: 'borderRight',
}

export default memo(function PopoverBeacon({
  position = 'top',
  offset,
  size = 7,
  color = '#fff',
}: PopoverBeaconProps) {
  offset = offset ?? size
  const dir = position === 'bottom' || position === 'top' ? 'x' : 'h'
  const borderProperty = borderProperties[position]
  const offsetProperty =
    dir === 'x'
      ? offset >= 0
        ? 'left'
        : 'right'
      : offset >= 0
      ? 'top'
      : 'bottom'

  offset = Math.abs(offset)

  const outStyle: CSSProperties = {
    border: `${size}px solid transparent`,
    [borderProperty]: `${size}px solid rgb(240,241,243)`,
    [position]: `-${size * 2 + 1}px`,
    [offsetProperty]: `${offset}px`,
  }
  const innerStyle: CSSProperties = {
    border: `${size}px solid transparent`,
    [borderProperty]: `${size}px solid ${color}`,
    [position]: `-${size * 2}px`,
    [offsetProperty]: `${offset}px`,
  }
  return (
    <>
      <span className="absolute z-1 inline-block" style={outStyle}></span>
      <span className="absolute z-1 inline-block" style={innerStyle}></span>
    </>
  )
})

export interface PopoverBeaconProps {
  className?: string
  position?: Position
  offset?: number
  size?: number
  color?: string
}
