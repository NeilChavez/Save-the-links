import "./CardProfile.css"
import { useAuthContext } from "../hooks/useAuthContext"
export default function CardProfile() {
    const { userData } = useAuthContext();
    const providerData = userData;
    const [infoUser] = providerData.providerData;
    const { displayName, photoURL } = infoUser;

    return (
        <article className="card-profile card">
            <figure>
                <div className="profile-img-wrapper">
                    <img src={photoURL || "./default-user.png"} alt="user profile" />
                </div>
                <figcaption>
                    <h3>Welcome {displayName || "User"}!</h3>
                </figcaption>
            </figure>
        </article>
    )
}