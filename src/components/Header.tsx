import { SetStateAction } from "react";
import { MdLogout, MdMenu } from "react-icons/md";
import { useAuthContext } from "../hooks/useAuthContext";
import { createAvatar } from "../helpers";
import { Link, useNavigate } from "react-router-dom";

const Header = ({
  setToggleSidebar,
}: {
  setToggleSidebar: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, signUserOut, firebaseLoading, isAuth } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const loggedOut = await signUserOut();
    if (loggedOut) {
      navigate("/login");
    }
  };
  return (
    <header className="header">
      <div>
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
      <div>
        {user?.displayName ? (
          createAvatar(user?.displayName)
        ) : (
          <span className="spinner"></span>
        )}
        {isAuth && (
          <button
            disabled={firebaseLoading}
            className="logout"
            onClick={handleLogout}
          >
            {firebaseLoading ? <span className="spinner"></span> : <MdLogout />}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
