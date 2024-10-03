import './episodesList.scss'
import useAPIServices from '../../services/APIService'
import { useState, useEffect } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMassage from '../errorMassage/ErrorMassage'
import { Link } from 'react-router-dom'
import { Episode } from '../../types/types'

function EpisodesList() {
  const [episodesList, setEpisodesList] = useState<Episode[]>([]);
  const [episodesOver, setEpisodesOver] = useState(false);
  const { loading, error, getAllEpisodes } = useAPIServices(true);

  useEffect(() => {
    loadEpisodes();
  }, [])

  function loadEpisodes() {
    if (episodesOver) {
      return
    }
    getAllEpisodes(episodesList.length).then((res) => {
      if (res) {
        setEpisodesList(eps => [...eps, ...res]);
        setEpisodesOver(res.length < 20);
      }
    })
  }

  return (
    <div className='episodes__list'>
      <ul className='episodes__grid'>{
        episodesList.map((e) => {
          return (
            <li key={e.id}>
              <Link to={'/episodes/' + e.id} className="episodes__item" >
                <h2>{e.name}</h2>
                <p>{e.episode}</p>
                <p>Premiere: {e.air_date}</p>
              </Link>
            </li>
          )
        })
      }</ul>
      {error ? <ErrorMassage /> : loading ? <Spinner /> : null}
      <button className='button button__main button__long' onClick={loadEpisodes} style={episodesOver ? { display: 'none' } : {}}>
        load more
      </button>
    </div>
  )
}

export default EpisodesList
