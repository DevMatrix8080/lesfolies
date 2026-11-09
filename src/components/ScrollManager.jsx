import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Come nel sito originale ogni pagina si apre dall'inizio
   (oppure sull'ancora #… se presente nell'indirizzo). */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}
