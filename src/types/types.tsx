export interface Character {
	id: number,
	name: string,
	image: string,
}
export interface FullCharacter extends Pick<Character, 'id' | 'name' | 'image'> {
	status: string,
	species: string,
	type: string,
	gender: string,
	location: Location,
	origin: Origin,
	episode: string[]
}
export interface TransformedCharacter extends Pick<Character, 'id' | 'name' | 'image'> {
	props: {
		status: string,
		gender: string,
		species: string,
		type: string,
		location: string,
		firstSeen: {
			name: string,
			url: string,
		}
	}
}
//export interface ShortCharacter extends Pick<Character, 'id' | 'name' | 'image'> { }
interface Origin {
	name: string,
	url: string
}
interface Location {
	name: string,
	url: string
}
export interface Episode {
	id: number,
	name: string,
	air_date: string,
	episode: string,
	characters?: string[],
}