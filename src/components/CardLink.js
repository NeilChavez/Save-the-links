import "./CardLink.css"
import { ExternalLink } from 'react-external-link';

export default function CardLink({ link, deleteLink, setCurrentId }) {

  const handleUpdate = () => setCurrentId(link.id);
  const handleDelete = () => deleteLink(link.id);

  return (
    <div key={link.name} className="card-link">
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
        <div>
          <div className="card-description-title">Your link:</div>
          <div className="card-link-wrapper">
            🔗
            <ExternalLink href={`${link.url}`} className="card-description-content">
              {link.url}
            </ExternalLink>
          </div>
        </div>
        <div>
          <div className="card-description-title">Site Name:</div>
          <div className="card-description-content">{link.name}</div>
        </div>
        <div>
          <div className="card-description-title">Description:</div>
          <div className="card-description-content">{link.description}</div>
        </div>
      </div>
    </div>
  );
}
