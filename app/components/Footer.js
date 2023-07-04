import React from 'react';
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white">
            <div className="container">
                <div className="footer__content">
                    <div className="footer__left">
                        <h3 className="footer__title">About Us</h3>
                        <p className="footer__description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
                            nunc sed velit imperdiet imperdiet vitae nec turpis.
                        </p>
                    </div>
                    <div className="footer__right">
                        <h3 className="footer__title">Contact</h3>
                        <p className="footer__contact-info">
                            Email: thanglb.bi11-243@st.usth.edu.vn
                            <br />
                            Phone: 123-456-7890
                        </p>
                    </div>
                </div>
                <p className="footer__copy">&copy; 2023 Vercel. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
