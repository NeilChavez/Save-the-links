import React, { useState, useEffect } from "react";
import { useCrudContext } from "../hooks/useCrudContext";
import "./LinkForm.css";
const initialState = {
  url: "",
  name: "",
  description: "",
};
export default function LinkForm({ message }) {
  const [form, setForm] = useState(initialState);
  const { state, addOrEditLink, currentId } = useCrudContext();
  const { links } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.url || !form.name || !form.description)
      return alert("Devi riempire il formulario");
    addOrEditLink(form);
    setForm({
      ...initialState,
    });
    console.log("fin de submitform, dovrebbe svuotare il form");
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (!currentId) return;
    let singleLink = links.find((link) => link.id === currentId);
    setForm(singleLink);
  }, [currentId, links]);

  return (
    <div className="LinkForm card">
      <form className="Form" onSubmit={handleSubmit}>
        <label htmlFor="url">
          Write a URL
        </label>
        <input
          type="text"
          name="url"
          id="url"
          value={form.url}
          onChange={handleChange}
          placeholder="hhtps://www.someUrl.com"
          autoComplete="off"
        />
        <label htmlFor="link-name">
          Insert Link
        </label>
        <input
          type="text"
          name="name"
          id="link-name"
          value={form.name}
          onChange={handleChange}
          placeholder="Insert the link name..." autoComplete="off"
        />
        <label htmlFor="link-description">
          Write a description:
        </label>
        <textarea
          name="description"
          value={form.description}
          id="link-description"
          onChange={handleChange}
          rows="2"
          placeholder="Write a description..." autoComplete="off"
        ></textarea>
        <button className="btn btn-insertLink">{message ? "Update" : "Send"}</button>
      </form>
    </div>
  );
}
