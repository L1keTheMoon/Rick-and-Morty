import './charList.scss'
import { Link } from "react-router-dom";
import { Character } from "../../types/types"

interface CharListProps {
  activeCharId?: string,
  charList: Character[]
}

function CharList({ activeCharId, charList }: CharListProps) {
  return (
    <ul className='char__list'>
      {charList.map((e, i) => {
        const activeClass = activeCharId === String(e.id) ? 'char__item_selected' : '';
        return (
          <li className={'char__item ' + activeClass}
            tabIndex={0}
            key={i}>
            <Link to={'/character/' + e.id} >
              <img src={e.image} alt={e.name} />
              <div className='char__name'>{e.name}</div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default CharList