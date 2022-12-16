import "./CardLink.css"
import { ExternalLink } from 'react-external-link';

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
      <div className="card-info">
        <li>

          <ExternalLink href={`${link.url}`}>
            <span>
              {link.url}
            </span>
          </ExternalLink>
        </li>
        <li>{link.name}</li>
        <li>{link.description}</li>
      </div>
    </ul>
  );
}
