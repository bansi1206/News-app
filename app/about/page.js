import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/about.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';



const About = () => {
    return (
        <div>
            <Header />
            <div className="about-container">
                <div className='breadcrumb-wrapper'>
                    <div className='container'>
                        <nav aria-label='breadcrumb'>
                            <ol className='breadcrumb d-flex align-items-center mt-4'>
                                <li><a href='/'>Home</a></li>
                                <li><span className='dash'>/</span><span className='about-us'>About us</span><span className='dash'></span></li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='banner'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-12'>
                                <h2>About Us</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-content">
                    <div className="container">
                        <img className="img-fluid mx-auto" src="/image/about-us.jpg" />
                        <h2>The Professional Publishing Platform</h2>
                        <p>Aenean consectetur massa quis sem volutpat, a condimentum tortor pretium. Cras id ligula consequat, sagittis nulla at, sollicitudin lorem. Orci varius natoque penatibus et magnis dis parturient montes.</p>
                        <p>Cras id ligula consequat, sagittis nulla at, sollicitudin lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus eleifend, dolor vel condimentum imperdiet.</p>
                        <p>In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its
                            elements.</p>
                        <h4>Our Growing News Network</h4>
                        <p>Cicero famously orated against his political opponent Lucius Sergius Catilina. Occasionally the first Oration against Catiline is taken for type specimens: Quo usque tandem abutere, Catilina, patientia nostra? Quam diu etiam furor iste tuus nos eludet? (How long, O Catiline, will you abuse our patience? And for how long will that madness of yours mock us?)</p>
                        <p>Most text editors like MS Word or Lotus Notes generate random lorem text when needed, either as pre-installed module or plug-in to be added. Word selection or sequence don't necessarily match the original, which is intended to add variety.</p>
                        <h4>The Professional Publishing Platform</h4>
                        <p>Cicero famously orated against his political opponent Lucius Sergius Catilina. Occasionally the first Oration against Catiline is taken for type specimens: Quo usque tandem abutere, Catilina, patientia nostra? Quam diu etiam furor iste tuus nos eludet? (How long, O Catiline, will you abuse our patience? And for how long will that madness of yours mock us?)</p>
                        <p>Most text editors like MS Word or Lotus Notes generate random lorem text when needed, either as pre-installed module or plug-in to be added. Word selection or sequence don't necessarily match the original, which is intended to add variety.</p>
                    </div>
                </div>
                <div className="about-author p-4">
                    <div className="container">
                        <div className="about-author-wrapper">
                            <div className="text-section">
                                <h2>Meet Our Publishing Authors</h2>
                                <p>Wherever & whenever you need us. We are here for you - contact us for all your support needs,
                                    <br /> be it technical, general queries or information support.
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="team-block">
                                        <a className="block img-container">
                                            <img src="/image/default.png"></img>
                                        </a>
                                        <div className="team-inner-content">
                                            <h3 className="author-title">Author Name</h3>
                                            <div className="author-role">Publisher</div>
                                        </div>
                                        <div className="team-social-share-container">
                                            <ul>
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
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="team-block">
                                        <a className="block img-container">
                                            <img src="/image/default.png"></img>
                                        </a>
                                        <div className="team-inner-content">
                                            <h3 className="author-title">Author Name</h3>
                                            <div className="author-role">Publisher</div>
                                        </div>
                                        <div className="team-social-share-container">
                                            <ul>
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
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="team-block">
                                        <a className="block img-container">
                                            <img src="/image/default.png"></img>
                                        </a>
                                        <div className="team-inner-content">
                                            <h3 className="author-title">Author Name</h3>
                                            <div className="author-role">Publisher</div>
                                        </div>
                                        <div className="team-social-share-container">
                                            <ul>
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
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="team-block">
                                        <a className="block img-container">
                                            <img src="/image/default.png"></img>
                                        </a>
                                        <div className="team-inner-content">
                                            <h3 className="author-title">Author Name</h3>
                                            <div className="author-role">Publisher</div>
                                        </div>
                                        <div className="team-social-share-container">
                                            <ul>
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
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="team-block">
                                        <a className="block img-container">
                                            <img src="/image/default.png"></img>
                                        </a>
                                        <div className="team-inner-content">
                                            <h3 className="author-title">Author Name</h3>
                                            <div className="author-role">Publisher</div>
                                        </div>
                                        <div className="team-social-share-container">
                                            <ul>
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
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="team-block">
                                        <a className="block img-container">
                                            <img src="/image/default.png"></img>
                                        </a>
                                        <div className="team-inner-content">
                                            <h3 className="author-title">Author Name</h3>
                                            <div className="author-role">Publisher</div>
                                        </div>
                                        <div className="team-social-share-container">
                                            <ul>
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
                                            </ul>
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

export default About