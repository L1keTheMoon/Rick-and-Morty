import './Spinner.scss'
import loadingPic from '../../resources/img/Portal-spinner.png'

const Spinner = ({ size = '200px' }: { size?: string }) => {
  return (
    <img src={loadingPic} alt="Loading" style={{ width: size, height: size }} className='spinner' />
  )
}

export default Spinner;