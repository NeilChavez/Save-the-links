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

export default function Links() {
  const [links, setLinks] = useState([]);
  const [localLink, setLocalLinks] = useState([]);
  const addOrEditLink = async (linkObject) => {
    console.log(linkObject);
    try {
      await addDoc(collection(db, "try1"), linkObject);
      setLocalLinks({
        ...localLink,
        linkObject,
      });
    } catch (err) {
      console.warn(err);
    }
  };
  const deleteLink = async (id) => {
    try {
      const docRef = doc(db, "try1", id);
      await deleteDoc(docRef);

      console.log("documento cancellato con successo");
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    const getLinks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "try1"));
        let newLinkState = [];
        querySnapshot.forEach((doc) => {
          newLinkState = [...newLinkState, { ...doc.data(), id: doc.id }];
        });
        setLinks(newLinkState);
      } catch (err) {
        console.warn(err);
      }
    };
    getLinks();
  }, [localLink]);
  return (
    <div>
      {console.log(localLink)}
      <LinkForm addOrEditLink={addOrEditLink} />
      {links.length > 0 ? (
        links.map((link) => (
          <ul key={link.name} className="card">
            <div className="close-btn" onClick={() => deleteLink(link.id)}>
              X
            </div>
            <li>{link.description}</li>
            <li>{link.name}</li>
            <li>{link.url}</li>
          </ul>
        ))
      ) : (
        <p>non ci sono elementi da mostrare</p>
      )}
    </div>
  );
}
