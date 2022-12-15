import React, { useState, useEffect } from "react";
import { useCrudContext } from "../hooks/useCrudContext";
import {toast} from "react-toastify"
import "./LinkForm.css";
const initialState = {
  url: "",
  name: "",
  description: "",
};
export default function LinkForm() {
  const [form, setForm] = useState(initialState);
  const { state, addOrEditLink, currentId, setCurrentId } = useCrudContext();
  const { links } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.url || !form.name || !form.description)
      return  toast("You need to fill the form", {
        type: "error"
      });
    addOrEditLink(form);
    setForm(initialState);
    setCurrentId("")
  };
  const handleReset = () => {
    setForm(initialState);
    setCurrentId("")
  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form)
  useEffect(() => {
    if (!currentId) return;
    let singleLink = links.find((link) => link.id === currentId);
    setForm(singleLink);
  }, [currentId, links]);

  useEffect(() => {
    if (!currentId) {
      setForm(initialState);
    }
  }, [currentId])

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
        <div className="btn-wrapper">
          {currentId && <button className="btn btn-insertLink" onClick={handleReset}>Reset</button>}
          <button className="btn btn-insertLink">{currentId ? "Update" : "Send"}</button>
        </div>
      </form>
    </div>
  );
}
