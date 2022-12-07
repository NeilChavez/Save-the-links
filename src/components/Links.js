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

export default function Links() {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [data, setData] = useState({});

  const addOrEditLink = async (linkObject) => {
    console.log(linkObject);
    try {
      const data = await addDoc(collection(db, "try1"), linkObject);
      console.log(data);
      setData(data);
      toast("New Link agregado", {
        type: "success",
      });
    } catch (err) {
      console.warn(err);
    }
  };
  const deleteLink = async (id) => {
    try {
      const docRef = doc(db, "try1", id);
      await deleteDoc(docRef);
      const newLinks = links.filter((link) => link.id !== id);
      setLinks(newLinks);
      toast("Enlace removido exitosamente", {
        type: "error",
      });
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
  }, [data]);
  return (
    <section className="card">
      <LinkForm
        addOrEditLink={addOrEditLink}
        message={currentId}
        currentId={currentId}
        links={links}
      />
      {links.length > 0 ? (
        links.map((link) => (
          <CardLink
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
