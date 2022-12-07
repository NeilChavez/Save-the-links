import "./CardProfile.css"

export default function CardProfile(){
    return(
        <article className="card-profile card">
            <figure>
                <img src="https://placeimg.com/200/200/any" alt="profile"/>
                <figcaption>
                    <h3>Welcome Name!</h3>
                </figcaption>
            </figure>
        </article>
    )
}