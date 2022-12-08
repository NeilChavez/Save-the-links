import { useContext } from "react";
import { crudContext } from "../context/crudContext";

export function useCrudContext() {
  const { state, addOrEditLink, deleteLink, setCurrentId, currentId } =
    useContext(crudContext);
  return { state, addOrEditLink, deleteLink, setCurrentId, currentId };
}
