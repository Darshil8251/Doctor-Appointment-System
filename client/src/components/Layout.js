import React from "react";
import { Link,useLocation } from "react-router-dom";
import '../style/LayoutStyles.css';
import {SidebarMenu} from './../Data/data'
function Layout({children}) {
    const location=useLocation();
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>DOC APP</h6>
            <hr/>
          </div>
          <div className="menu">{
            SidebarMenu.map(menu=>{
                const isActive=location.pathname===menu.Path;
                            return(
                                <>
                                    <div className={`menu-item ${isActive && "active"}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.Path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
            })
          }</div>

        </div>
        <div className="content">
            <div className="header">Header</div>
            <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
