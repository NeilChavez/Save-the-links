import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

import "./Links.css";
import { toast } from "react-toastify";
import CardLink from "./CardLink";
import { useCrudContext } from "../hooks/useCrudContext";

export default function Links() {
  const { deleteLink, state, setCurrentId } = useCrudContext();
  const { links } = state;


  return (
    <section className="card">
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
        <p>non ci sono elementi da mostrare</p>
      )}
    </section>
  );
}
