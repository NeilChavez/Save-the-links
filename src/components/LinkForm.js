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
        <label>
          Write a URL
          <input
            type="text"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="hhtps://www.someUrl.com"
          />
        </label>
        <label>
          Insert Link
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placerholder="Insert link"
          />
        </label>
        <label>
          Write a description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="2"
            placholder="write a description"
          ></textarea>
        </label>
        <button>{message ? "Update" : "Send"}</button>
      </form>
    </div>
  );
}
