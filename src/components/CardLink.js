export default function CardLink({ link, deleteLink, setCurrentId }) {
  return (
    <ul key={link.name} className="card-link">
      <div className="close-btn" onClick={() => deleteLink(link.id)}>
        X
      </div>
      <div
        className="edit-btn"
        onClick={() => {
          setCurrentId(link.id);
        }}
      >
        ✎
      </div>
      <li>{link.description}</li>
      <li>{link.name}</li>
      <li>{link.url}</li>
    </ul>
  );
}
