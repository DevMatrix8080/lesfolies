/* <img> che, se il file locale manca, passa a un'immagine di riserva
   (equivalente degli onerror="this.src=…" del sito originale) */
export default function FallbackImg({ fallback, ...props }) {
  return (
    <img
      loading="lazy"
      decoding="async"
      {...props}
      onError={
        fallback
          ? (e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallback;
            }
          : undefined
      }
    />
  );
}
