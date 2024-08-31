import React, { useState } from 'react'
import { Header } from '../components/home/Header'
import { About } from '../components/home/About'
import { Service } from '../components/home/Service'
import { Cotiza } from '../components/home/Cotiza'
import { Contact } from '../components/home/Contact'


export const Home = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => {
        setModalOpen(!modalOpen);
        const btnOpenForm = document.getElementById('btnOpenForm');
        if (modalOpen) {
            btnOpenForm.innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
            btnOpenForm.innerHTML = '<i class="fas fa-chevron-up"></i>';
        }
    };


    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

  return (
    <>
        <Header/>
        <About/>
        <Service/>
        {modalOpen && <Cotiza open={modalOpen} onClose={handleCloseModal}/>}
        <Contact/>

        <button id="btnTop" className="btnTop" onClick={handleClick}>
        <i className="fas fa-arrow-up"></i>
        </button>

    <button id="btnOpenForm" className="btnOpenForm" onClick={handleCloseModal}>
        <i className="fas fa-chevron-down"></i>
    </button>
    </>
  )
}
