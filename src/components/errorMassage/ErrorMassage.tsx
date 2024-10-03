import { CSSProperties } from 'react';
import errorPic from '../../resources/img/404.png'

const ErrorMassage = ({ style }: { style?: CSSProperties }) => {

  return (
    <img src={errorPic} alt="Error" style={{ margin: '0 auto', display: 'block', ...style }} />
  )
}

export default ErrorMassage;