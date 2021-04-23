import { createContext, useContext, useState } from 'react';
import { PlayerContextData, Episode, PlayerContextContainerProps } from '../interfaces';

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextContainer(props: PlayerContextContainerProps) {
   const [episodeList, setEpisodeList] = useState<Episode[]>([]);
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);
   const [isPlaying, setIsPlaying] = useState<boolean>(false);

   function play(episode: Episode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
   }

   function togglePlay() {
      setIsPlaying(!isPlaying);
   }

   function setPlayingState(state: boolean) {
      setIsPlaying(state);
   }

   return(
      <PlayerContext.Provider value={{ 
         currentEpisodeIndex, 
         episodeList,
         isPlaying,
         play,
         togglePlay,
         setPlayingState
      }}>
         {props.children}
      </PlayerContext.Provider>
   );
}

export function usePlayer() {
   return useContext(PlayerContext);
}