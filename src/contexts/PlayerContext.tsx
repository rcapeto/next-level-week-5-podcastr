import { createContext, useContext, useState } from 'react';
import { PlayerContextData, Episode, PlayerContextContainerProps } from '../interfaces';

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextContainer(props: PlayerContextContainerProps) {
   const [episodeList, setEpisodeList] = useState<Episode[]>([]);
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);
   const [isPlaying, setIsPlaying] = useState<boolean>(false);
   const [isLooping, setIsLooping] = useState<boolean>(false);
   const [isShuffling, setIsShuffling] = useState<boolean>(false);

   function play(episode: Episode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
   }

   function playList(list: Episode[], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
   }

   function togglePlay() {
      setIsPlaying(!isPlaying);
   }

   function toggleLoop() {
      setIsLooping(!isLooping);
   }

   function toggleShuffle() {
      setIsShuffling(!isShuffling);
   }


   function setPlayingState(state: boolean) {
      setIsPlaying(state);
   }

   const hasPrevious = (currentEpisodeIndex - 1) >= 0;
   const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

   function playNext() {
      if(isShuffling) {
         const nextRandomEpisodeIntex = Math.floor(Math.random() * episodeList.length);
         setCurrentEpisodeIndex(nextRandomEpisodeIntex);
      } else if(hasNext) {
         setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
   }

   function playPrevious() {
      if(hasPrevious) {
         setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      }
   }

   function clearPlayerDisplay() {
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
   }

   return(
      <PlayerContext.Provider value={{ 
         currentEpisodeIndex, 
         episodeList,
         isPlaying,
         isLooping,
         isShuffling,
         play,
         togglePlay,
         toggleLoop,
         toggleShuffle,
         setPlayingState,
         playList,
         playNext,
         playPrevious,
         clearPlayerDisplay,
         hasNext,
         hasPrevious
      }}>
         {props.children}
      </PlayerContext.Provider>
   );
}

export function usePlayer() {
   return useContext(PlayerContext);
}