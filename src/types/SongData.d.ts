export type SongData = {
    key: number;
    number: number;
    title: string;
    altTitle?: string;
};

export type SongsCollection = {
    title: string;
    titleAbbr: string;
    data: SongData[];
};

export type SongsDB = SongsCollection[];

export interface SongsController {
    loading: boolean;
    songs: SongsDB;
    fetchSongs: () => Promise<void>;
    loadSongs: () => Promise<boolean>;
}
