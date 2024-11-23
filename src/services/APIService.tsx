import useHttp from '../components/hooks/useHttp'
import type { Character, Episode, FullCharacter } from '../types/types'

function useAPIServices(startLoading: boolean) {
	const { loading, setLoading, error, setError } = useHttp(startLoading);

	const _apiBase = 'https://rickandmortyapi.com/api/';

	async function getResources<T>(url: string): Promise<T | undefined> {
		setLoading(true);
		setError(false);
		try {
			const res = await fetch(url);
			if (!res.ok) {
				setError(true);
				throw new Error('Could not find ' + url + ', status: ' + res.status);
			} else {
				setError(false);
			}
			const data = await res.json();
			setLoading(false);
			return data
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError(true);
		}
	}

	async function getAllCharacters(offset: number) {
		const page = Math.floor(offset / 20) + 1;
		const res = await getResources<{ results: Character[] }>(_apiBase + 'character/?page=' + page);
		if (res) {
			return res.results.map(({ id, name, image }) => {
				return {
					id,
					name,
					image
				}
			});
		}
	}

	async function getSomeCharacters(array: string[]) {
		const res = await getResources<Character[]>(_apiBase + 'character/' + array);
		if (res) {
			return res.map(({ id, name, image }) => {
				return {
					id,
					name,
					image
				}
			})
		}
	}

	async function getRandomCharacter() {
		const res = await getResources<FullCharacter>(_apiBase + 'character/' + Math.floor(Math.random() * (826 - 1 + 1) + 1));
		return res;
	}

	async function getCharacterById(id: string) {
		const res = await getResources<FullCharacter>(_apiBase + 'character/' + id);
		if (res) {
			return await transformCharacter(res)
		}
	}

	async function getAllEpisodes(offset: number) {
		const page = Math.floor(offset / 20) + 1;
		const res = await getResources<{ results: Episode[] }>(_apiBase + 'episode/?page=' + page);
		if (res) {
			return res.results.map((e) => transformEpisode(e))
		}
	}

	async function getEpisodeById(id: string) {
		const res = await getResources<Episode>(_apiBase + 'episode/' + id);
		if (res && res.characters) {
			const characters = res.characters.map(e => e.replace(/\D/g, ""));
			return { ...transformEpisode(res), characters }
		}
	}

	async function transformCharacter({ id, name, image, status, gender, species, type, episode, location }: FullCharacter) {
		let firstEpisode: Pick<Episode, 'id' | 'name'> = { name: '', id: 0 };
		if (episode.length > 0) {
			const data = await getResources<Episode>(episode[0]);
			if (data) firstEpisode = data
		}
		return {
			id,
			name,
			image,
			props: {
				status,
				gender,
				species,
				type,
				location: location.name,
				firstSeen: {
					name: firstEpisode.name || '',
					url: '/episodes/' + firstEpisode.id || ''
				},
			}
		}
	}

	function transformEpisode({ id, name, air_date, episode }: Episode) {
		return {
			id,
			name,
			air_date,
			episode: episode.replace(/E0*|E(?=\d)/, " Episode ").replace(/S0*|S(?=\d)/, "Season "),
		}
	}

	return { loading, error, getAllCharacters, getSomeCharacters, getRandomCharacter, getCharacterById, getAllEpisodes, getEpisodeById }
}

export default useAPIServices;