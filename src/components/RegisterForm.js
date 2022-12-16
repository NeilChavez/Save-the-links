import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import "./RegisterForm.css";
import SignInGoogleButton from "./SIgnInGoogleButton";
import {ToastContainer, toast} from "react-toastify"

const initialForm = {
  email: "",
  password: "",
};
export default function RegisterForm() {
  const [form, setForm] = useState(initialForm);
  const { register, signInWithGoogle, error, msgError, setError } = useUser();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (email, password) => {
    if (!form.password && !form.email){
      return toast("You need to fill the form", {
        type: "error",
        autoClose: 1500,
      })
    }
    register(email, password);
  };

  useEffect(() => {
    setError(false);
  }, [setError])

  return (
    <>
      <section className="section-register">
        <h3>Register with email and password</h3>
        {error && <p className="error">{msgError}</p>}
        <form
          className="form-register"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form.email, form.password);
          }}
        >
          <input
            onChange={handleChange}
            value={form.email}
            name="email"
            type="email"
            placeholder="insert you email..."
          />
          <input
            onChange={handleChange}
            value={form.password}
            name="password"
            type="password"
            placeholder="insert you password..."
          />
          <input type="submit" className="link btn" value="Register" />
        </form>
        <SignInGoogleButton signInWithGoogle={signInWithGoogle} />
      </section>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
      />
      <ToastContainer />
    </>
  );
}
