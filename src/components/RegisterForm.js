import "./RegisterForm.css"

export default function RegisterForm() {
  return (
    <section className="section-register">
      <h3>Register with email and password</h3>
      <form className="form-register">
        <input type="email"  placeholder="insert you mail..."/>
        <input type="password" placeholder="insert you password..."/>
        <input type="submit" className="link" value="register" />
      </form>
    </section>
  );
}
