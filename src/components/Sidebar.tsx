import { IoMenuSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { IoHelpCircleOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useAppContext } from "../hooks/useAppContext";

const Sidebar = () => {
  const { openNewChat, showResults, toggleSidebar, setToggleSidebar } =
    useAppContext();
  const iconStyle = {
    width: toggleSidebar ? "100%" : 32,
    borderRadius: toggleSidebar ? 20 : "50%",
    color: "#fff",
    display: "flex",
    justifyContent: toggleSidebar ? "flex-start" : "center",
    padding: toggleSidebar ? "0 10px" : 0,
    gap: 3,
  };
  return (
    <nav className={`sidebar ${toggleSidebar ? "sidebarToggled" : ""}`}>
      <div className="top-col">
        {toggleSidebar ? (
          <button
            className="button"
            onClick={() => setToggleSidebar((prev) => !prev)}
          >
            <MdClose />
          </button>
        ) : (
          <button
            className="button"
            onClick={() => setToggleSidebar((prev) => !prev)}
          >
            <IoMenuSharp />
          </button>
        )}
        <button
          disabled={!showResults}
          onClick={openNewChat}
          style={iconStyle}
          className={`button newchat-icon ${!showResults && "disabled"}`}
        >
          <IoMdAdd />
          {toggleSidebar && <p>New Chat</p>}
        </button>
      </div>
      <div className="bottom-col">
        <button style={iconStyle} className="button">
          <IoHelpCircleOutline />
          {toggleSidebar && <p>Help</p>}
        </button>
        <button style={iconStyle} className="button">
          <MdNotificationsActive />
          {toggleSidebar && <p>Activity</p>}
        </button>
        <button style={iconStyle} className="button">
          <IoIosSettings />
          {toggleSidebar && <p>Settings</p>}
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
