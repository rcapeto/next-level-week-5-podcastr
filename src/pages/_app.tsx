import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { PlayerContextContainer } from '../contexts/PlayerContext';

import styles from '../styles/app.module.scss';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  
  return(
    <PlayerContextContainer>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextContainer>
  );
}

export default MyApp
