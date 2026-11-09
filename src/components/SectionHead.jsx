/* Intestazione di sezione centrata: occhiello + titolo (+ sottotitolo) */
export default function SectionHead({ occhiello, title, sottotitolo }) {
  return (
    <div className="sec-head center">
      <p className="occhiello">{occhiello}</p>
      <h2 className="titolo-sezione">{title}</h2>
      {sottotitolo && <p className="sottotitolo">{sottotitolo}</p>}
    </div>
  );
}
