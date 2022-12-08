import { createContext, useReducer, useEffect, useState } from "react";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

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
  const [data, setData] = useState({});
  const [currentId, setCurrentId] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const addOrEditLink = async (linkObject) => {
    try {
      const data = await addDoc(collection(db, "try1"), linkObject);
      console.log(data);
      setData(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const deleteLink = async (id) => {
    console.log("delete link, in action");
    try {
      const docRef = doc(db, "try1", id);
      await deleteDoc(docRef);

      dispatch({ type: TYPES.DELETE_SUCCESS, payload: id });

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

        dispatch({ type: TYPES.GET_SUCCESS, payload: newLinkState });
      } catch (err) {
        console.warn(err);
      }
    };
    getLinks();
  }, [data]);

  return (
    <crudContext.Provider
      value={{ state, addOrEditLink, deleteLink, currentId, setCurrentId }}
    >
      {children}
      {console.log("se renderiza crudProvider")}
    </crudContext.Provider>
  );
}

export { crudContext };
export default CrudContextProvider;
