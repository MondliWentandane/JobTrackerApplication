import React from 'react'


const Navbar:React.FC = () => {
  return (
    <nav style={navStyle}>
        <h2 style={{}}>JobBuddy</h2>

    </nav>
  )
}

export default Navbar

const navStyle:React.CSSProperties={
    backgroundColor: "#00a8e8",
    width: "100%",
    height: "3.5rem",
    position: "fixed",
    top: 1
    

}
