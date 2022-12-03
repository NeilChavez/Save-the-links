import React, { useState } from "react";
import "./LinkForm.css";

const initialState = {
  url: "",
  name: "",
  description: "",
};
export default function  LinkForm({addOrEditLink}){
  const [form, setForm] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("prima di mandare form", 1)
    addOrEditLink(form);
    console.log("appena dopo aver mandato form", 2)
    setForm(initialState)
    console.log('dopo aver pulito il formulario con initialState', 3)
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
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
        <button> Save</button>
      </form>
    </div>
  );
};

