const Layout = ({ children }) => {
  return (
    <div className="screen-wrapper screen-wrapper--bg--cloudy">
      <div className="screen-nav-wrapper">
        <div className="screen">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;
