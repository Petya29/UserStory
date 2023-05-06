import { CSSProperties, HTMLAttributes, forwardRef } from "react";

type DividerProps = {
  color?: CSSProperties['color'],
  borderWidth?: CSSProperties['borderWidth'],
  borderStyle?: CSSProperties['borderStyle']
} & HTMLAttributes<HTMLDivElement>

export const Divider = forwardRef<HTMLDivElement, DividerProps>(({
  color = '#94a3b8',
  borderWidth = '1px',
  borderStyle = 'solid',
  style,
  ...rest
}: DividerProps, ref) => {
  return (
    <div
      ref={ref}
      style={{
        borderColor: color,
        borderBottomWidth: borderWidth,
        borderStyle: borderStyle,
        ...style
      }}
      {...rest}
    />
  )
})
