import CardProfile from "../components/CardProfile";
import SavedLinks from "../components/SavedLinks";
import LinkForm from "../components/LinkForm";
import Links from "../components/Links";
import CrudContextProvider from "../context/crudContext";

export default function Dashboard() {
  return (
    <section className="dashboard">
      <CrudContextProvider>
        <CardProfile />
        <LinkForm />
        <SavedLinks />
        <Links />
      </CrudContextProvider>
    </section>
  );
}
