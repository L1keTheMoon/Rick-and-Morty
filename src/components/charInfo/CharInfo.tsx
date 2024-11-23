import './charInfo.scss';
import { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import useAPIServices from '../../services/APIService'
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage'
import { Link } from 'react-router-dom';
import { TransformedCharacter } from '../../types/types';

interface CharInfoProps {
	activeCharId: string
}
interface ViewCharInfoProsps {
	charInfo: TransformedCharacter,
	coloseModal: () => void
}
interface TRProps {
	name: string,
	value: string,
	text: ReactNode,
}

function CharInfo({ activeCharId }: CharInfoProps) {
	const [charInfo, setCharInfo] = useState<TransformedCharacter | null>(null);
	const charInfoRef = useRef<HTMLDivElement>(null);
	const { loading, error, getCharacterById } = useAPIServices(false);

	useEffect(() => {
		if (activeCharId) {
			updateChar(activeCharId);
		} else {
			setCharInfo(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeCharId])

	function updateChar(id: string) {
		if (matchMedia('(max-width: 990px)').matches) {
			openModal()
		}
		getCharacterById(id)
			.then((res) => {
				if (res) setCharInfo(res)
			})
	}

	function openModal() {
		if (charInfoRef.current) {
			document.body.style.overflow = 'hidden';
			setTimeout(() => {
				if (charInfoRef.current) {
					charInfoRef.current.style.right = '0%';
				}
			}, 0)
			setTimeout(() => {
				if (charInfoRef.current) {
					charInfoRef.current.style.backdropFilter = 'blur(5px)';
				}
			}, 400)
		}
	}

	function coloseModal() {
		if (charInfoRef.current) {
			charInfoRef.current.style.right = '-100%';
			document.body.style.overflow = '';
			charInfoRef.current.style.backdropFilter = 'none';
		}
	}

	return (
		<div className="char__modal-blur" ref={charInfoRef} style={{ right: '-100%' }} onClick={(e) => {
			if (e.target === charInfoRef.current) {
				coloseModal();
			}
		}}>
			<span className='char__close' onClick={coloseModal}>✖</span>
			<div className="char__info" >
				{error ? <ErrorMassage style={{ width: '95%' }} /> : loading ? <Spinner size={'280px'} /> : charInfo ? <ViewCharInfo charInfo={charInfo} coloseModal={coloseModal} /> : <Skeleton />}
			</div>
		</div>
	)
}

const StatusIcon = ({ style, children }: { style?: CSSProperties, children?: ReactNode }) => {
	return (
		<span className='char__descr-status-icon' style={style}>{children}</span>
	)
}

const TR = ({ name, value, text }: TRProps) => {
	let icon = null;
	if (name === 'status') {
		if (value === 'Dead') {
			icon = <StatusIcon style={{ backgroundColor: '#df2917' }} />
		} else if (value === 'Alive') {
			icon = <StatusIcon style={{ backgroundColor: '#12a012' }} />
		} else {
			icon = <StatusIcon style={{ backgroundColor: 'grey' }} />
		}
	} else if (name === 'gender') {
		if (value === 'Male') {
			icon = <StatusIcon >♂</StatusIcon >
		} else if (value === 'Female') {
			icon = <StatusIcon >♀</StatusIcon >
		} else if (value === 'unknown') {
			icon = <StatusIcon >?</StatusIcon >
		} else {
			icon = <StatusIcon >✖</StatusIcon >
		}
	}
	return (
		<tr>
			<td className="char__descr-prop-name">{name}</td>
			<td className="char__descr-prop-value">{icon}{text}</td>
		</tr>
	)
}

const ViewCharInfo = ({ charInfo: { name, image, props }, coloseModal }: ViewCharInfoProsps) => {
	return (
		<>
			<div className="char__basics" >
				<img src={image} alt={name} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__descr">
						<table >
							<tbody>
								{Object.entries(props).map((e, i) => {
									if (e[1] === '') {
										return
									} else if (typeof e[1] !== 'object') {
										return (
											< TR key={i} name={e[0]} value={e[1]} text={e[1]} />
										)
									} else if (e[0] === 'firstSeen' && typeof e[1] === 'object') {
										return (
											< TR key={i} name={'first seen'} value={''} text={<Link onClick={coloseModal} to={e[1].url}>{e[1].name}</Link>} />
										)
									}
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>

	)
}

export default CharInfo;