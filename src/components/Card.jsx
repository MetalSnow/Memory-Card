export default function Card({ name, url }) {
  return (
    <>
      <img src={url} alt={name} />
      <h2>{name}</h2>
    </>
  );
}
