import { createContext, useReducer, useEffect, useState } from "react";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useAuthContext } from "../hooks/useAuthContext";

const TYPES = {
  GET_SUCCESS: "GET_SUCCESS",
  DELETE_SUCCESS: "DELETE_SUCCESS",
};
const initialState = {
  links: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.GET_SUCCESS:
      return {
        ...state,
        links: action.payload,
      };
    case TYPES.DELETE_SUCCESS: {
      return {
        ...state,
        links: state.links.filter((link) => link.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

// CRUD
const crudContext = createContext();
function CrudContextProvider({ children }) {
  const [data, setData] = useState(null);
  const [currentId, setCurrentId] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userData } = useAuthContext();
  // const userData = 228072;
  const uid = userData.user.uid;

  const addOrEditLink = async (linkObject) => {
    try {
      // al posto di links deve andare l'id del utente
      // la base dati, la collezion, la id
      const documentRef = collection(db, "links");
      const data = await addDoc(documentRef, { ...linkObject, id: uid });
      setData(data);
      console.log("inserimento dato con successo");
    } catch (err) {
      console.warn(err);
    }
  };

  const deleteLink = async (id) => {
    try {
      const docRef = doc(db, "links", id);
      await deleteDoc(docRef);
      dispatch({ type: TYPES.DELETE_SUCCESS, payload: id });
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const getLinks = async () => {
      try {
        // with this function I ask to retrieve all the links from the DB, 
        // and specifically only those that have the "uid" property of the user, 
        // therefore only those of the logged in user
        const q = query(collection(db, "links"), where("id", "==", uid));
        const querySnapshot = await getDocs(q);

        let newLinkState = [];
        querySnapshot.forEach((doc) => {
          newLinkState = [...newLinkState, { ...doc.data(), id: doc.id }];
        });

        dispatch({ type: TYPES.GET_SUCCESS, payload: newLinkState });
      } catch (err) {
        console.warn(err);
      }
    };
    getLinks();
  }, [data, uid]);

  return (
    <crudContext.Provider
      value={{ state, addOrEditLink, deleteLink, currentId, setCurrentId }}
    >
      {children}
    </crudContext.Provider>
  );
}

export { crudContext };
export default CrudContextProvider;
