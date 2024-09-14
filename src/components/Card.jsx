export default function Card({ name, url }) {
  return (
    <>
      <figure>
        <img src={url} alt={name} />
        <figcaption>{name}</figcaption>
      </figure>
    </>
  );
}
