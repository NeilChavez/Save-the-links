import "./CardProfile.css"
import { useAuthContext } from "../hooks/useAuthContext"
export default function CardProfile() {
    const { userData } = useAuthContext();
    // if (!userData) return;
    const { user } = userData;

    const [infoUser] = user.providerData;
    // const { displayName, email, photoURL } = user.providerData[0];
    const { displayName, email, photoURL } = infoUser;

    return (
        <article className="card-profile card">
            <figure>
                <div className="profile-img-wrapper">
                    <img src={photoURL || "./default-user.png"} alt="user profile" />
                </div>
                <figcaption>
                    <h3>Welcome {displayName || email || "User"}!</h3>
                </figcaption>
            </figure>
        </article>
    )
}