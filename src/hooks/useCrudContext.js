import { useContext } from "react";
import { crudContext } from "../context/crudContext";

export function useCrudContext() {
  const { state, addOrEditLink } = useContext(crudContext);
  return { state, addOrEditLink };
}
