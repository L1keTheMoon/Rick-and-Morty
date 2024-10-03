import './SingleEpisode.scss';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAPIServices from '../../services/APIService';
import Button from '../button/Button';
import Spinner from '../spinner/Spinner'
import Page404 from '../../pages/page404'
import Arrow from '../../resources/img/arrow.svg'
import { Character, Episode } from '../../types/types';
import CharList from '../charList/CharList';

const SingleEpisode = () => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const { loading, error, getEpisodeById, getSomeCharacters } = useAPIServices(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEpisodeById(id)
        .then((res) => {
          if (res) {
            setEpisode(res);
            getSomeCharacters(res.characters)
              .then((res2) => {
                if (res2) {
                  setCharacters(res2)
                }
              })
          }
        })
    }
  }, [id])

  return (
    <>
      {error ? <Page404 /> : loading ? <Spinner size={'400px'} /> : episode ? <View episode={episode} characters={characters} /> : null}
    </>
  )
}

const View = ({ episode: { id, name, episode, air_date }, characters }: { episode: Episode, characters: Character[] }) => {

  return (
    <div className="single-episode">
      <h2 className="single-episode__name">{name}</h2>
      <p className="single-episode__descr">{episode}</p>
      <p className="single-episode__descr">Release date: {air_date}</p>
      <p className="single-episode__descr">Characters:</p>
      <div className="single-episode__chars">
        <CharList charList={characters} />
      </div>
      <div className="single-episode__navigation-buttons">
        <Link to={'/episodes/' + (-1 + id)} className="single-episode__back">
          <Button className='button' style={id < 2 ? { visibility: 'hidden' } : {}}>
            <img src={Arrow} alt="Arrow" style={{ left: '10px', transform: 'scale(-1, 1)' }} />PREV
          </Button>
        </Link>
        <Link to="/episodes" className="single-episode__back">
          <Button className='button'>
            Back to all
          </Button>
        </Link>
        <Link to={'/episodes/' + (1 + id)} className="single-episode__back">
          <Button className='button' style={id > 50 ? { visibility: 'hidden' } : {}}>
            NEXT<img src={Arrow} alt="Arrow" style={{ right: '10px' }} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SingleEpisode;