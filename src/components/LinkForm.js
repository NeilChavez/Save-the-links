import React, { useState, useEffect } from "react";
import "./LinkForm.css";

const initialState = {
  url: "",
  name: "",
  description: "",
};
export default function LinkForm({ addOrEditLink, message, links, currentId }) {
  const [form, setForm] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.url || !form.name || !form.description)
      return alert("Devi riempire il formulario");
    addOrEditLink(form);
    setForm(initialState);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (!currentId) return;
    let singlLink = links.find((link) => link.id === currentId);
    setForm(singlLink);
  }, [currentId, links]);

  return (
    <div className="LinkForm">
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
