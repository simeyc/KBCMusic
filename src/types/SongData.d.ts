export type SongData = {
    key: number;
    number: number;
    title: string;
    altTitle?: string;
};

export type SongsDB = {
    title: string;
    songs: SongData[];
}[];

export interface SongsController {
    loading: boolean;
    songs: SongsDB;
    fetchSongs: () => Promise<void>;
}
