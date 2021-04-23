import { ReactNode } from "react"

export type HomeProps = {
   episodes: Episode[];
   allEpisodes: Episode[];
   latestEpisodes: Episode[];
 }
 
export type Episode = {
   id: string;
   title: string;
   members: string;
   publishedAt: string;
   thumbnail: string;
   description: string;
   file: {
     url: string;
     type: string;
     duration: number;
   }
   duration: number;
   durationAsString: string;
   url: string;
}

export type EpisodeProps = {
   episode: Episode;
}

export interface PlayerContextContainerProps {
   children: ReactNode;
}

export type PlayerContextData = {
   episodeList: Episode[];
   currentEpisodeIndex: number; 
   play: (episode: Episode) => void;
   isPlaying: boolean;
   isLooping: boolean;
   isShuffling: boolean;
   togglePlay: () => void;
   toggleLoop: () => void;
   toggleShuffle: () => void;
   setPlayingState: (state: boolean) => void;
   playList: (list: Episode[], index: number) => void;
   playNext: () => void;
   playPrevious: () => void;
   clearPlayerDisplay: () => void;
   hasPrevious: boolean;
   hasNext: boolean;
}