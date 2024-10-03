import './randomChar.scss'
import picture from '../../resources/img/rick_morty_fu.png'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAPIServices from '../../services/APIService'
import Spinner from '../spinner/Spinner'
import ErrorMassage from '../errorMassage/ErrorMassage'
import Button from '../button/Button'
import { FullCharacter } from '../../types/types'

interface ViewCharProps {
  char: FullCharacter,
  updateChar: () => void
}

function RandomChar() {
  const [char, setChar] = useState<FullCharacter | null>(null)

  const { loading, error, getRandomCharacter } = useAPIServices(true)

  useEffect(() => {
    updateChar()
  }, [])

  function updateChar() {
    getRandomCharacter().then((res) => {
      if (!res) {
        return
      }
      setChar(res)
    })
  }

  return (
    <div className='randomchar'>
      {error ? <ErrorMassage style={{ height: '90%', margin: 'auto' }} /> :
        loading ? <Spinner size={matchMedia('(max-width: 500px)').matches ? '200px' : '250px'} /> :
          char ? <ViewChar char={char} updateChar={updateChar} /> : null}
      <div className='randomchar__static'>
        <p className='randomchar__title'>
          Random character for today!
          <br />
          You can know him better?
        </p>
        <p className='randomchar__title'>Or choose another one</p>
        <Button onClick={updateChar}>try it</Button>
        <img src={picture} alt='rick and morty portal' className='randomchar__decoration' />
      </div>
    </div>
  )
}

const ViewChar = ({ char: { id, name, image, species, status }, updateChar }: ViewCharProps) => {
  return (
    <div className='randomchar__block'>
      <img src={image} alt={name} className='randomchar__img' />
      <div className='randomchar__container'>
        <div className='randomchar__info'>
          <p className='randomchar__name'>{name}</p>
          <p className='randomchar__descr'>{species} — {status}</p>
        </div>
        <div className='randomchar__buttons' >
          <Link to={'/character/' + id} >
            <Button>
              More info
            </Button>
          </Link>
          <Button className='try' onClick={updateChar}>
            try it
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RandomChar
