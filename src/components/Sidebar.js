import React from "react";
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";
const Sidebar = ({ setselectedTab, selectedTab }) => {
  return (
    <div className="sidebar">
      <div
        className={selectedTab === "INBOX" ? "active" : ""}
        onClick={() => setselectedTab("INBOX")}
      >
        <FaInbox className="icon" />
        indox
      </div>
      <div
        className={selectedTab === "TODAY" ? "active" : ""}
        onClick={() => setselectedTab("TODAY")}
      >
        <FaRegCalendar className="icon" />
        today
      </div>
      <div
        className={selectedTab === "NEXT_7" ? "active" : ""}
        onClick={() => setselectedTab("NEXT_7")}
      >
        <FaRegCalendarAlt className="icon" />
        next 7 days
      </div>
    </div>
  );
};

export default Sidebar;
