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
        {/*TODO  delete <br>s after use of Grid-css*/}
        <br />
        <SavedLinks />
        {/*TODO delete <br>s after use of Grid-css*/}
        <br />
        <LinkForm />
        {/*TODO delete <br>s after use of Grid-css*/}
        <br />
        <Links />
      </CrudContextProvider>
    </section>
  );
}
