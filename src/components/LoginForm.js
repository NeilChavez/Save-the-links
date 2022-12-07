import "./LoginForm.css";

export default function LoginForm() {
  return (
    <section className="section-login">
      <h3>Login with email and password</h3>
      <form className="form-login">
        <input type="email" placeholder="insert you email..." />
        <input type="password" placeholder="insert you password..." />
        <input type="submit" className="link" value="login" />
      </form>
    </section>
  );
}
