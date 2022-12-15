export default function CardLink({ link, deleteLink, setCurrentId }) {

  const handleUpdate = () => setCurrentId(link.id);
  const handleDelete = () => deleteLink(link.id);

  return (
    <ul key={link.name} className="card-link">
      <div className="close-btn" onClick={handleDelete}>
        X
      </div>
      <div
        className="edit-btn"
        onClick={handleUpdate}
      >
        ✎
      </div>
      <li>{link.description}</li>
      <li>{link.name}</li>
      <li>{link.url}</li>
    </ul>
  );
}
