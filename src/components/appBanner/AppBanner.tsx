import './appBanner.scss'
import watch from '../../resources/img/rick-and-morty-watch.png'
import inPortal from '../../resources/img/rick-and-morty-in-portal.png'

const AppBanner = () => {
	return (
		<div className='app__banner'>
			<img src={watch} alt='Watch' className='app__banner-watch' />
			<div className='app__banner-text'>
				Wath new series of Rick and Morty <a className='big' href="https://rick-i-morty.online/" target="_blank" >HERE</a>!
			</div>
			<img src={inPortal} alt='In portal' className='app__banner-inPortal' />
		</div>
	)
}

export default AppBanner
