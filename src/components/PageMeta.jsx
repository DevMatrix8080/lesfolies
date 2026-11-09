/* Titolo e meta della pagina (React 19 li sposta da solo nell'<head>) */
export default function PageMeta({ title, description }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  );
}
