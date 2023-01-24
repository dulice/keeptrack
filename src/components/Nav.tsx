import { NavLink } from "react-router-dom"

const Nav = () => {
  return (
    <header className="sticky">
        <span className="logo">
            <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to='/' className="buttton rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to='/projects' className="buttton rounded">
          <span className="icon-layers"></span>
          Projects
        </NavLink>
    </header>
  )
}

export default Nav