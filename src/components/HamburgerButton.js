export default function HamburgerButton({ showMenu, handleClick }) {
    return (
        <button className={`hamburger hamburger--collapse 
            ${showMenu ? "is-active" : ""} btn-hamburger`}
            type="button"
            onClick={handleClick}>
            <span className="hamburger-box">
                <span className="hamburger-inner hamburger-color"></span>
            </span>
        </button>
    )
}