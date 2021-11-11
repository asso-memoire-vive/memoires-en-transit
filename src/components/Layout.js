import React, { Component } from 'react'
import Header from "./Header";
import Menu from "./Menu";

function Layout({ title, children }) {
  return (
    <div className='layout'>
      <header>
        <h1>{title}</h1>
      </header>
      <Header />
      <Menu />
      <main>{children}</main>
    </div>
  )
}

export default Layout