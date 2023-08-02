'use client'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import '../styles/contact.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFax, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isNameFocused, setNameFocused] = useState(false);
    const [isPhoneFocused, setPhoneFocused] = useState(false);
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isMessageFocused, setMessageFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.init('YCuFmSmGxfs_aGIzL');
        emailjs.send('service_y6rkdxe', 'template_gvtf93q', {
            from_name: name,
            phone,
            reply_to: email,
            message,
        })
            .then((response) => {
                toast.success('Email sent successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };
    return (
        <div>
            <Header />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <ToastContainer />
            <div className="contact-container">
                <div className='breadcrumb-wrapper'>
                    <div className='container'>
                        <nav aria-label='breadcrumb'>
                            <ol className='breadcrumb d-flex align-items-center mt-4'>
                                <li><a href='/'>Home</a></li>
                                <li><span className='dash'>/</span><span className='contact-us'>Contact us</span><span className='dash'></span></li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='banner'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-12'>
                                <h2>Contact Us</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-text">
                    <div className="container">
                        <div className="text-section">
                            <h2>Meet Our Publishing Authors</h2>
                            <p>Wherever & whenever you need us. We are here for you - contact us for all your support needs,
                                <br />be it technical, general queries or information support.
                            </p>
                        </div>
                        <img src="/image/contact-banner.jpg" />
                    </div>
                </div>
                <div className="contact-form">
                    <div className="container">
                        <div className="row d-flex align-items-center">
                            <div className="col-lg-7">
                                <div className="zero-contact-form">
                                    <div className="section-title">
                                        <h2>Send Us a Message</h2>
                                        <p>Your email address will not be published. All the fields are required.</p>
                                    </div>
                                    <div className="zero-contact-form-wrapper">
                                        <form className="zero-form row no-gutters" onSubmit={handleSubmit}>
                                            <div className={`form-group col-12 ${isNameFocused || name ? 'focused' : ''}`}>
                                                <label>Name</label>
                                                <input type="text" name="contact-name" value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    onFocus={() => setNameFocused(true)}
                                                    onBlur={() => setNameFocused(false)} />
                                            </div>
                                            <div className={`form-group col-12 ${isPhoneFocused || phone ? 'focused' : ''}`}>
                                                <label>Phone</label>
                                                <input type="text" name="contact-phone" value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                    onFocus={() => setPhoneFocused(true)}
                                                    onBlur={() => setPhoneFocused(false)} />
                                            </div>
                                            <div className={`form-group col-12 ${isEmailFocused || email ? 'focused' : ''}`}>
                                                <label>Email</label>
                                                <input type="text" name="contact-email" value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    onFocus={() => setEmailFocused(true)}
                                                    onBlur={() => setEmailFocused(false)} />
                                            </div>
                                            <div className={`form-group col-12 ${isMessageFocused || message ? 'focused' : ''}`}>
                                                <label>Message</label>
                                                <textarea type="textarea" name="contact-message" rows={3} value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    required
                                                    onFocus={() => setMessageFocused(true)}
                                                    onBlur={() => setMessageFocused(false)} />
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary">SUBMIT</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="contact-info-wrapper">
                                    <div className="contact-info-inner">
                                        <h2>Contact Information</h2>
                                        <div className="zero-contact-info">
                                            <address className="address">
                                                <p>
                                                    18 Hoang Quoc Viet, Nghia Do <br /> Cau Giay, Ha Noi
                                                </p>
                                                <div><h5>We're Available 24/ 7. Call Now.</h5></div>
                                                <div>
                                                    <a href="#" className="social-icon phone">
                                                        <FontAwesomeIcon icon={faPhone} className="icon" />
                                                        <span>(+84) 456-2790</span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <a href="#" className="social-icon fax">
                                                        <FontAwesomeIcon icon={faFax} className="icon" />
                                                        <span>(+84) 255-53333</span>
                                                    </a>
                                                </div>
                                            </address>
                                            <div className="contact-social-share">
                                                <div className="social-title">
                                                    <h5>Follow Us</h5>
                                                </div>
                                                <ul className="contact-social-share-icon">
                                                    <li>
                                                        <a href="#" className="social-icon facebook">
                                                            <FontAwesomeIcon icon={faFacebookF} className="icon" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="social-icon twitter">
                                                            <FontAwesomeIcon icon={faTwitter} className="icon" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="social-icon instagram">
                                                            <FontAwesomeIcon icon={faInstagram} className="icon" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="social-icon youtube">
                                                            <FontAwesomeIcon icon={faYoutube} className="icon" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact;