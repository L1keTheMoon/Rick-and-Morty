import { Link } from 'react-router-dom';
import ErrorMassage from '../components/errorMassage/ErrorMassage'

function Page404() {
  return (
    <>
      <ErrorMassage style={{ width: '50%', marginTop: '20px' }} />
      <h2 style={{ textAlign: 'center', fontSize: '40px' }}>PAGE NOT FOUND</h2>
      <Link to='/' style={{ fontSize: '30px', lineHeight: '32px', fontWeight: 'bold', textAlign: 'center', display: 'block', marginTop: '30px' }}>
        BACK TO MAIN PAGE
      </Link>
    </>
  )
}

export default Page404;