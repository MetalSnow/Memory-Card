export default function Card({ name, url }) {
  return (
    <>
      <img src={url} alt={name} />
      <span>{name}</span>
    </>
  );
}
