export type SongData = {
  key: number;
  number: number;
  title: string;
  altTitle?: string;
};

export type SongsDB = {
	title: string;
	data: SongData[];
}[];
