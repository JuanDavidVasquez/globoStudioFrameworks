import React from 'react'

export const Contact = () => {
  return (
    <section id="contact" className="section contact">
        <h2>Contact</h2>
        <div className="contact-content">
            <div className="contact-form">
                <form action="">
                    <input type="text" placeholder="Name"/>
                    <input type="email" placeholder="Email"/>
                    <textarea name="" id="" cols="30" rows="10" placeholder="Message"></textarea>
                    <button>Send</button>
                </form>
            </div>
            <div className="contact-info">
                <h3>Contact Info</h3>
                <p>Address: 1234 Street Name, City Name, United States</p>
                <p>Phone: +1 123 456 7890</p>
                <p>Email:
                    <a href="mailto:globoStudio.com">
                        GloboStudio
                    </a>
                </p>
            </div>
        </div>
    </section>
  )
}
