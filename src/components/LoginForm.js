import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "./LoginForm.css";
const initialForm = {
  email: "",
  password: "",
};
export default function LoginForm() {
  const { login, setUser } = useAuthContext();
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password)
      return alert("You have to fill in the email and password fields ;)");
    try {
      const data = await login(form.email, form.password);
      setUser(data);
      navigate("/dashboard");
    } catch (err) {
      console.warn(err);
    }
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
