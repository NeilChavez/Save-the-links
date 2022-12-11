import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import "./LoginForm.css";
const initialForm = {
  email: "",
  password: "",
};
export default function LoginForm() {
  const { login, isLogged } = useUser();
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

  useEffect(() => {
    if(isLogged) navigate("/dashboard");
  }, [isLogged, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password)
      return alert("You have to fill in the email and password fields ;)");
    login(form.email, form.password);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="section-login">
      <h3>Login with email and password</h3>
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
        <input type="submit" className="link" value="login" />
      </form>
    </section>
  );
}
