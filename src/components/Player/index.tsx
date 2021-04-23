import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';

import { usePlayer } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils';

import styles from './styles.module.scss';
import 'rc-slider/assets/index.css';

export function Player() {
   const audioRef = useRef<HTMLAudioElement>(null);
   const [progress, setProgress] = useState<number>(0);

   const { 
      episodeList, 
      currentEpisodeIndex, 
      isPlaying,
      isLooping,
      isShuffling,
      togglePlay,
      toggleLoop,
      toggleShuffle,
      setPlayingState,
      playNext,
      playPrevious,
      hasNext,
      hasPrevious,
      clearPlayerDisplay
   } = usePlayer();

   const episode = episodeList[currentEpisodeIndex];

   function setupProgressListener() {
      audioRef.current.currentTime = 0;

      audioRef.current.addEventListener('timeupdate', event => {
         setProgress(Math.floor(audioRef.current.currentTime));
      });
   }

   function handleSeek(number: number) {
      setProgress(number);
      audioRef.current.currentTime = number;
   }

   function handleEpisodeEnded() {
      if(hasNext) {
         playNext();
      } else {
         clearPlayerDisplay();
      }
   }

   useEffect(() => {
      if(!audioRef.current) return;

      if(isPlaying) 
         audioRef.current.play();
      else
         audioRef.current.pause();

   }, [isPlaying]);

   return(
      <div className={styles.playerContainer}>
         <header>
            <img src="./playing.svg" alt="Tocando agora"/>
            <strong>Tocando agora</strong>
         </header>

         {
            episode ? (
               <div className={styles.currentEpisode}>
                  <Image 
                     width={592}
                     height={592}
                     src={episode.thumbnail}
                     objectFit="cover"
                  />

                  <strong>{episode.title}</strong>
                  <span>{episode.members}</span>
               </div>
            ) : (
               <div className={styles.emptyPlayer}>
                  <strong>Selecione um podcast para ouvir</strong>
               </div>
            )
         }

         <footer className={!episode ? styles.empty : ''}>
            <div className={styles.progress}>
               <span>{convertDurationToTimeString(progress)}</span>
               <div className={styles.slider}>
                  {
                     episode ? (
                     <Slider 
                        trackStyle={{ backgroundColor: '#04d361' }}
                        railStyle={{ backgroundColor: '#9f75ff' }}
                        handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                        max={episode.duration}
                        value={progress}
                        onChange={handleSeek}
                     />
                     ) 
                     : 
                     <div className={styles.emptySlider} />
                  }
                  
               </div>
               <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
            </div>
            
            {episode && (
               <audio 
                  src={episode.url}
                  autoPlay
                  ref={audioRef}
                  onPlay={() => setPlayingState(true)}
                  onPause={() => setPlayingState(false)}
                  loop={isLooping}
                  onLoadedMetadata={setupProgressListener}
                  onEnded={handleEpisodeEnded}
               />
            )}

            <div className={styles.buttons}>
               <button 
                  disabled={!episode || episodeList.length === 1}
                  onClick={toggleShuffle}
                  className={isShuffling ? styles.isActive : ''}
               >
                  <img src="/shuffle.svg" alt="Embaralhar"/>
               </button>

               <button disabled={!episode || !hasPrevious} onClick={playPrevious}>
                  <img src="/play-previous.svg" alt="Tocar anterior"/>
               </button>

               <button className={styles.playButton} disabled={!episode} onClick={togglePlay}>
                  {
                     isPlaying ? <img src="/pause.svg" alt="Pausar"/> : <img src="/play.svg" alt="Tocar"/>
                  }
               </button>

               <button disabled={!episode || !hasNext} onClick={playNext}>
                  <img src="/play-next.svg" alt="Tocar próxima"/>
               </button>

               <button 
                  disabled={!episode} 
                  onClick={toggleLoop}
                  className={isLooping ? styles.isActive : ''}
               >
                  <img src="/repeat.svg" alt="Repetir"/>
               </button>
            </div>
         </footer>
      </div>
   );
}