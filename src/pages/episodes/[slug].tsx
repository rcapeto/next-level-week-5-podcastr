import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../../services/api';
import { convertDurationToTimeString } from '../../utils';
import { EpisodeProps } from '../../interfaces';
import styles from './episode.module.scss';

export default function Episode({ episode }: EpisodeProps) {
   return(
      <div className={styles.episode}>
         <div className={styles.thumbnailContainer}>
            <Link href="/">
               <button>
                  <img src="/arrow-left.svg" alt="Voltar"/>
               </button>
            </Link>
            <Image 
               width={700}
               height={160}
               src={episode.thumbnail}
               objectFit="cover"            
            />

            <button>
               <img src="/play.svg" alt="Tocar episódio"/>
            </button>
         </div>

         <header>
            <h1>{episode.title}</h1>
            <span>{episode.members}</span>
            <span>{episode.publishedAt}</span>
            <span>{episode.durationAsString}</span>
         </header>

         <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }}/>
      </div>
   );
}

//Porque é uma página estática e dinâmica
export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: [],
      fallback: 'blocking'
   }
}

export const getStaticProps: GetStaticProps = async (context) => {
   const { slug } = context.params;
   const { data } = await api.get(`episodes/${slug}`);

   const episode = {
      id: data.id,
      title: data.title,
      members: data.members,
      publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
      thumbnail: data.thumbnail,
      description: data.description,
      file: data.file,
      duration: Number(data.file.duration),
      durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      url: data.file.url, 
    };
   
   return {
      props: {
         episode,
      },
      revalidate: 60 * 60 * 24,
   }
}