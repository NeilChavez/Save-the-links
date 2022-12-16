import { useCrudContext } from "../hooks/useCrudContext";
import "./SavedLinks.css"

export default function SavedLinks() {
  const { state } = useCrudContext();
  const { links } = state;
  return (
    <section className="card saved-links">
      <h3>Saved Links:</h3>
      <span>{links.length}</span>
    </section>
  );
}
