import './charListContainer.scss'
import useAPIServices from '../../services/APIService'
import { useState, useEffect } from 'react'
import CharList from '../charList/CharList'
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'
import ErrorMassage from '../errorMassage/ErrorMassage'
import { Character } from '../../types/types'

interface CharListContainerProps {
  activeCharId: string,
}

function CharListContainer({ activeCharId }: CharListContainerProps) {
  const [charList, setCharlist] = useState<Character[]>([]);
  const [charsOver, setCharsOver] = useState(false);
  const { loading, error, getAllCharacters } = useAPIServices(true);

  useEffect(() => {
    loadCharList();
  }, [])

  function loadCharList() {
    if (charsOver) {
      return
    }
    getAllCharacters(charList.length)
      .then((res) => {
        if (res) {
          setCharlist((charList) => [...charList, ...res]);
          setCharsOver(res!.length < 20);
        }
      })
  }

  return (
    <div className='char__container'>
      <CharList activeCharId={activeCharId} charList={charList} />
      {error ? <ErrorMassage style={{ width: '70%' }} /> : loading ? <Spinner size={'250px'} /> :
        <Button onClick={loadCharList} style={{
          display: charsOver ? 'none' : 'block',
          margin: '30px auto 0 auto'
        }}>load more</Button>}
    </div>
  )
}

export default CharListContainer
