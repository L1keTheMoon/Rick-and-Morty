import { useParams } from 'react-router-dom'
import RandomChar from '../components/randomChar/RandomChar'
import CharListContainer from '../components/charListContainer/CharListContainer'
import CharInfo from '../components/charInfo/CharInfo'

function MainPage() {
  const { id } = useParams();

  return (
    <>
      <RandomChar />
      <div className='char__content'>
        <CharListContainer activeCharId={id || ''} />
        <CharInfo activeCharId={id || ''} />
      </div>
    </>
  )
}

export default MainPage
