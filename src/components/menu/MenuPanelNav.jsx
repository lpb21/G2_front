import { NavLink } from "react-router-dom"

const NavigationMenu = ({link, icon, label}) => {
  return (
      <li className="nav-item">
        <NavLink
          to={link}
          className="nav-link active"
        >
         <i className={icon} />
          <p>{label}</p>
        </NavLink>
        
      </li>
    )
  }
  
 export const Navigation = (props) => {
    return (
      <nav className="mt-2" >
        <ul
          className="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false">
          <li className="nav-item menu-open">
            <a href="index.html" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Informes 
                <i className="right fas fa-angle-left" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              {/* <NavigationMenu link="../pages/charts/charts.html"  icon="far fa-circle nav-icon" label="Dashboard BI" /> */}
              <NavigationMenu 
                link="bi/cpsi"  
                icon="far fa-circle nav-icon" 
                label="Channel psi" 
              />
            </ul>
          </li>
        </ul>
      </nav>
    )
  }