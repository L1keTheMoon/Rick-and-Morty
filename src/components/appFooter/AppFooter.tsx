import './appFooter.scss'

const AppFooter = () => {
	return (
		<footer className='app__footer'>
			<div className='app__content'>
				<div className='app__footer-links'>
					<a className='link' href="https://github.com/RomanBurlakov/Rick-and-Morty">GitHub Page</a>
					<a className='link' href="https://rickandmortyapi.com/">Used API</a>
				</div>
			</div>
		</footer>
	)
}

export default AppFooter
