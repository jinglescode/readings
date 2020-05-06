import React from 'react'

// import {
//     HeaderContainer,
//     HeaderWrapper,
//     HeaderTitle,
//     HeaderSubtitle,
//     GithubLogin
// } from './'
import { config } from "../../config"

export const Header = ( ) => {
    return (
      <div>

        <div className="navbar-fixed">
          <nav className="z-depth-2 nav-bar" role="navigation">
            <div className="nav-wrapper container">
              <a id="logo-container" className="brand-logo truncate">
                Readings
              </a>
              <ul className="right hide-on-med-and-down">
                <li><a href="https://jinglescode.github.io/" className="tooltipped" data-position="top" data-tooltip="Blog"><i className="fas fa-blog"></i><span id="menu-text">Blog</span></a></li>
                <li><a href="https://jinglescode.github.io/readings/" className="tooltipped" data-position="top" data-tooltip="Readings"><i className="far fa-sticky-note"></i><span id="menu-text">Readings</span></a></li>
                <li><a href="https://github.com/jinglescode" target="_blank"><i className="fab fa-github-square"></i><span id="menu-text">GitHub</span></a></li>
              </ul>
              <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            </div>
          </nav>
          <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>

        <ul id="slide-out" className="sidenav">
          <li><a href="https://jinglescode.github.io/" className="tooltipped" data-position="top" data-tooltip="Blog"><i className="fas fa-blog"></i><span id="menu-text">Blog</span></a></li>
          <li><a href="https://jinglescode.github.io/readings/" className="tooltipped" data-position="top" data-tooltip="Readings"><i className="far fa-sticky-note"></i><span id="menu-text">Readings</span></a></li>
          <li><a href="https://github.com/jinglescode" target="_blank"><i className="fab fa-github-square"></i><span id="menu-text">GitHub</span></a></li>
        </ul>

      </div>
        // <HeaderContainer>
        //     <GithubLogin isAbsolute={true} />
        //     <HeaderWrapper>
        //         <HeaderTitle>{config.title}</HeaderTitle>
        //         <HeaderSubtitle>{config.subtitle}</HeaderSubtitle>
        //     </HeaderWrapper>
        // </HeaderContainer>
    )
}
