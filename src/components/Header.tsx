import { SetStateAction, useState } from "react";
import { MdLogout, MdMenu } from "react-icons/md";
import { useAuthContext } from "../hooks/useAuthContext";
import { createAvatar } from "../helpers";
import { Link, useNavigate } from "react-router-dom";

const Header = ({
  setToggleSidebar,
}: {
  setToggleSidebar: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [popup, setPopup] = useState(false);
  const { user, signUserOut, firebaseLoading } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const loggedOut = await signUserOut();
    if (loggedOut) {
      navigate("/login");
    }
  };
  return (
    <header className="header">
      <div className="first-col">
        <button
          className="button"
          onClick={() => setToggleSidebar((prev) => !prev)}
        >
          <MdMenu />
        </button>
        <Link to="/" className="logo">
          Gemini
        </Link>
      </div>
      <div className="second-col">
        {!user?.displayName ? (
          <span className="spinner"></span>
        ) : (
          createAvatar(user?.displayName || "", setPopup)
        )}
      </div>
      {popup && (
        <div className="popup">
          <div className="user-details">
            {createAvatar(user?.displayName || "")}
            <strong className="email">{user?.email}</strong>
            <p>
              Hi! <strong>{user?.displayName}</strong>
            </p>
          </div>

          <button
            disabled={firebaseLoading}
            className="logout"
            onClick={handleLogout}
          >
            {firebaseLoading ? (
              <span className="spinner"></span>
            ) : (
              <>
                <MdLogout /> Sign out
              </>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
