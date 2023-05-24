// import { includes } from "lodash";
import { first } from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "@/components/Link";
import { currentUser } from "@/services/auth";
import PlainButton from "@/components/PlainButton";
import CreateDashboardDialog from "@/components/dashboards/CreateDashboardDialog";
import DesktopOutlinedIcon from "@ant-design/icons/DesktopOutlined";
import CodeOutlinedIcon from "@ant-design/icons/CodeOutlined";
import PlusOutlinedIcon from "@ant-design/icons/PlusOutlined";
import settingsMenu from "@/services/settingsMenu";
import SettingOutlinedIcon from "@ant-design/icons/SettingOutlined";



import "./MobileNavbar.less";
import "./DesktopNavbar.less";


export default function MobileNavbar({ getPopupContainer }) {
  const firstSettingsTab = first(settingsMenu.getAvailableItems());

  // const activeState = useNavbarActiveState();

  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const handleCreateClick = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };
  const canCreateQuery = currentUser.hasPermission("create_query");
  const canCreateDashboard = currentUser.hasPermission("create_dashboard");
  const canCreateAlert = currentUser.hasPermission("list_alerts");

  return (
    <nav className="desktop-navbar">
      {/* <NavbarSection> */}
      {currentUser.hasPermission("list_dashboards") && (
        <span className="navbar-item">
          <Link href="dashboards">
            <DesktopOutlinedIcon style={{ color: "black" }} aria-label="Dashboard navigation button" />
            <span style={{ color: "black" }}>Dashboards</span>
          </Link>
        </span>
      )}
      {currentUser.hasPermission("view_query") && (
        <span className="navbar-item">
          <Link href="queries">
            <CodeOutlinedIcon style={{ color: "black" }} aria-label="Queries navigation button" />
            <span style={{ color: "black" }}>Queries</span>
          </Link>
        </span>
      )}

      {currentUser.hasPermission("view_query") && (
          <span key="settings" style={{ color: "black" }} >
            <Link href={firstSettingsTab.path} data-test="SettingsLink">
              <SettingOutlinedIcon />
              <span className="desktop-navbar-label">Settings</span>
            </Link>
          </span>
        )}

      {(canCreateQuery || canCreateDashboard || canCreateAlert) && (
       <span className="submenu-title" >
       <PlusOutlinedIcon style={{ color: "black" }} />
       <span style={{ color: "black" }}  onClick={handleCreateClick} >Create</span>
     </span>
      
      )}





      {isSubMenuOpen && (
        <ul>
          <li>
            <Link href="queries/new" data-test="CreateQueryMenuItem" style={{ color: "black" }}>
              New Query
            </Link>
          </li>
          <li>
            <PlainButton data-test="CreateDashboardMenuItem" onClick={() => CreateDashboardDialog.showModal()} style={{ color: "black" }}>
              New Dashboard
            </PlainButton>
          </li>
        </ul>
      )}



      {/* {(canCreateQuery || canCreateDashboard || canCreateAlert) && (
        <span className="navbar-item">
          <span className="submenu-title">
            <PlusOutlinedIcon style={{ color: "black" }} />
            <span style={{ color: "black" }}>Create</span>
          </span>
          <div className="submenu-content">
            {canCreateQuery && (
              <Link href="queries/new" data-test="CreateQueryMenuItem" style={{ color: "black" }}>
                New Query
              </Link>
            )}
            {canCreateDashboard && (
              <PlainButton data-test="CreateDashboardMenuItem" onClick={() => CreateDashboardDialog.showModal()} style={{ color: "black" }}>
                New Dashboard
              </PlainButton>
            )}
          </div>
        </span>
      )} */}
    </nav>

  );
}

MobileNavbar.propTypes = {
  getPopupContainer: PropTypes.func,
};

MobileNavbar.defaultProps = {
  getPopupContainer: null,
};
