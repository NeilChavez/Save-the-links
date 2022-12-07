import "./RegisterForm.css"

export default function RegisterForm() {
  return (
    <div>
      <form>
        <input type="email"  placeholder="insert you mail..."/>
        <input type="password" placeholder="insert you password..."/>
        <input type="submit" value="register" />
      </form>
    </div>
  );
}
