import { h } from 'jsx-dom'

const Button = ({ children, ...props }) => {
  const isActive = (item) => {
  }

  return (
    <button className={props.class} active={props.active}>{props.value}</button>
  )
}

export default Button
