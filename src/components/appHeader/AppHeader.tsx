import './appHeader.scss'
import logo from '../../resources/img/Rick_and_Morty_Logo.png'
import { NavLink, Link } from 'react-router-dom'

interface LinkProps {
	isActive: boolean
}

function ActiveLink({ isActive }: LinkProps) {
	return {
		color: isActive ? '#00a1b7' : ''
	}
}
function ActiveLinkChars({ isActive }: LinkProps) {
	if (window.location.href.includes('character')) {
		isActive = true;
	}
	return {
		color: isActive ? '#00a1b7' : ''
	}
}

const AppHeader = () => {
	return (
		<header className='app__header'>
			<Link to='/'>
				<img src={logo} alt="Rick and Morty Logo" style={{}} />
			</Link>
			<nav className='app__menu'>
				<ul>
					<li><NavLink className='big' to='/' title='Characters' style={ActiveLinkChars}>Characters</NavLink></li>
					<li className='app__menu-separator'>/</li>
					<li><NavLink className='big' to='/episodes' title='Episodes' style={ActiveLink}>Episodes</NavLink></li>
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader
