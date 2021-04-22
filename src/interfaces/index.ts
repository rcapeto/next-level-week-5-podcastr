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
   duration: string;
   durationAsString: string;
   url: string;
}

export type EpisodeProps = {
   episode: Episode;
}