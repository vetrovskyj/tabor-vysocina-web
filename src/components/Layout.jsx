import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from './Footer'
import Navbar from './Navbar'
import './style.css'

const TemplateWrapper = ({ children }) => {
  return (
    <div className="site-body">
      <Helmet>
        <html lang="cs" />
        <meta charset="UTF-8" />
        <meta name="author" content="Jan Větrovský" />
        <link rel="icon" href="../../img/logo.png" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Helmet>
      <Navbar />
      {children}
      <div className="footer-to-bottom"></div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
