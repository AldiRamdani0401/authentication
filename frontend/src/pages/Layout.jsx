import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <NavBar/>
        <div className="columns mt-6">
            <div className="column is-2"><SideBar/></div>
            <div className="columns has-background-light">
                <main>{children}</main>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Layout