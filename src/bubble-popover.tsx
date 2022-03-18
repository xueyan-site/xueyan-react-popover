import React, { forwardRef } from 'react'
import styles from './bubble-popover.scss'
import { getArrowStyle } from './bubble-popover-utils'
import { Popover, PopoverRef } from './popover'
import type { PopoverProps } from './popover'

export interface BubblePopoverContentStyle extends Pick<
  React.CSSProperties,
  | 'backgroundColor'
  | 'borderRadius'
  | 'padding'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'maxWidth'
  | 'minHeight'
  | 'maxHeight'
> {}

interface PartPopoverProps extends Omit<
  PopoverProps,
  | 'render'
> {}

export interface BubblePopoverProps extends PartPopoverProps, BubblePopoverContentStyle {
  /** 隐藏箭头 */
  hiddenArrow?: boolean
  /** 箭头相对摆放位置的横向偏移量 */
  arrowOffset?: string | number
}

export const BubblePopover = forwardRef<PopoverRef, BubblePopoverProps>(({
  content,
  placement,
  transform,
  spacing,
  arrowOffset,
  hiddenArrow,
  backgroundColor,
  borderRadius,
  padding,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  ...props
}, ref) => {
  return (
    <Popover 
      {...props}
      ref={ref}
      placement={placement}
      transform={transform || (pm => (
        (hiddenArrow && 'tb'.includes(pm[0]))
          ? 'scaleY(.8)'
          : 'scale(.8)'
      ))}
      spacing={
        spacing !== undefined 
          ? spacing 
          : hiddenArrow 
          ? '4px' 
          : '10px'
      }
      render={props => (
        <div
          className={styles.inner}
          style={{
            width,
            height,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
            backgroundColor,
            borderRadius,
            padding
          }}
        >
          {!hiddenArrow && (
            <div 
              className={styles.arrow}
              style={{ 
                backgroundColor, 
                ...getArrowStyle(
                  props.placement,
                  arrowOffset
                ) 
              }}
            />
          )}
          {content}
        </div>
      )}
    />
  )
})
