import "./SignInGoogleButton.css"

export default function SignInGoogleButton({ signInWithGoogle }) {
    return (<button className="google-btn" onClick={signInWithGoogle}>
        <div className="google-icon-wrapper">
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
        </div>
        <p className="btn-text"><b>Sign in with google</b></p>
    </button>)
}



