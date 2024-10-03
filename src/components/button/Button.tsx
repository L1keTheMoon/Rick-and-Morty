import './button.scss'
import { CSSProperties, ReactEventHandler, ReactNode } from "react";

interface ButtonProps {
  className?: string,
  style?: CSSProperties,
  children?: ReactNode | string,
  onClick?: ReactEventHandler<HTMLButtonElement>
}

function Button({ className, style, children, onClick }: ButtonProps) {
  return (
    <button className={"button " + (className || '')} onClick={onClick} style={style}>
      {children}
    </button>
  )
}

export default Button;