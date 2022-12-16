import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../hooks/useUser";
import "./LoginForm.css";
import SignInGoogleButton from "./SIgnInGoogleButton";


const initialForm = {
  email: "",
  password: "",
};
export default function LoginForm() {
  const { login, isLogged, signInWithGoogle, msgError, error, setError } = useUser();
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate("/dashboard");
  }, [isLogged, navigate]);

  useEffect(() => {
    setError(false);
  }, [setError])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return toast("You need to fill the form", {
        type: "error",
        autoClose: 1500,
      })
    }
    login(form.email, form.password);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section className="section-login">
        <h3>Login with email and password</h3>
        {error && <p className="error">{msgError}</p>}
        <form className="form-login" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            value={form.email}
            placeholder="insert you email..."
          />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            value={form.password}
            placeholder="insert you password..."
          />
          <input type="submit" className="link" value="Login" />
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
