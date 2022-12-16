import React, { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Links.css";
import CardLink from "./CardLink";
import { useCrudContext } from "../hooks/useCrudContext";

export default function Links() {
  const { deleteLink, state, setCurrentId } = useCrudContext();
  const { links } = state;


  return (
    <section className="card list-links">
      {links.length > 0 ? (
        links.map((link) => (
          <CardLink
            key={link.id}
            link={link}
            deleteLink={deleteLink}
            setCurrentId={setCurrentId}
          />
        ))
      ) : (
        <p className="no-elements-msg">You have not added any Links to the list yet... ⬆️ </p>
      )}
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
      />
      <ToastContainer />
    </section>
  );
}
