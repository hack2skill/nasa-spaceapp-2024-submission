import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
export default function Lab() {
  return (
    <main>
      <Header />
      <div className="content--container">
        <Navbar />
      </div>
      <Footer />
    </main>
  )
}
