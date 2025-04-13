import React from 'react'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="panel">
        <p>Copyright © 2020, Tábor Vysočina 3. turnus</p>
        <a className="facebook" title="náš Facebook" target="_blank" href="https://www.facebook.com/TaborVysocina.cz"><i className="fa fa-facebook" /></a>
      </footer>
    )
  }
}

export default Footer
