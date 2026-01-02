import React from 'react'
import './Footer.css'
import { CopyrightIcon, CreditCard, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footerSection">
                    <div className="brandDetails">
                        <h2 className="brandname">NEHSH</h2>
                        <p className="detail">
                            Your trusted online marketplace for premium products. We bring you the best deals on electronics, home goods, fashion, and more.
                        </p>
                        <div className="detail_contacts">
                            <MapPin />
                            <span>123 Commerce ,Gujarat,India</span>
                        </div>

                        <div className="contactno detail_contacts">
                            <Phone />
                            <span>+91-123456789</span>
                        </div>

                        <div className="detail_contacts">
                            <Mail />
                            <span>support@nehsh.com</span>
                        </div>

                        <div className="socialmedia">
                            <button className="socialIconbtn">
                                <Facebook className="facebookIcon" />
                            </button>

                            <button className="socialIconbtn">
                                <Instagram className="instagramIcon" />
                            </button>

                            <button className="socialIconbtn">
                                <Twitter className="twitterIcon" />
                            </button>

                            <button className="socialIconbtn">
                                <Youtube className="youtubeIcon" />
                            </button>
                        </div>
                    </div>

                    <div className="customer_service">
                        <h2 className="header_service">Customer Service</h2>
                        <ul className="service_ul">
                            <Link to={"/"}><li className="service_li">Help Center</li></Link>
                            <Link to={"/"}><li className="service_li">Track Order</li></Link>
                            <Link to={"/"}><li className="service_li">Returns & Refunds</li></Link>
                            <Link to={"/"}><li className="service_li">Shipping Info</li></Link>
                            <Link to={"/"}><li className="service_li">Contact Us</li></Link>
                        </ul>
                    </div>

                    <div className="aboutus">
                        <h2 className="about_header">About NEHSH</h2>
                        <ul className="aboutus_ul">
                            <li className="aboutus_li">About Us</li>
                            <li className="aboutus_li">Careers</li>
                            <li className="aboutus_li">Press & Media</li>
                            <li className="aboutus_li">Sustainability</li>
                            <li className="aboutus_li">Affiliate Program</li>
                        </ul>
                    </div>

                    <div className="subscribe_updates">
                        <h2 className="subscribe_header">Newsletter</h2>
                        <p className="deals_updates">Subscribe for exclusive deals and updates!</p>

                        <div className="subscriber_email">
                            <input type="email" className="contact_email" placeholder="Your Email" />
                            <button className="email_btn">Subscribe</button>
                        </div>

                        <p className="subscribe_condition">By subscribing, you agree to our Privacy Policy</p>
                    </div>
                </div>

                <div className="footer_copyrights">
                    <div className="copyrights"><CopyrightIcon className="copyrightIcon" />NEHSH. All rights reserved.</div>

                    <ul className="copyright_ul">
                        <li className="copyright_li">Privacy Policy</li>
                        <li className="copyright_li">Terms of Service</li>
                        <li className="copyright_li">Cookie Policy</li>
                        <li className="copyright_li">Accessibility</li>
                    </ul>

                    <div className="payment_methods">
                        <span>We Accept:</span>
                        <div className="creditcardIcon">
                            <CreditCard />
                        </div>
                        <div className="cardmethod">VISA</div>
                        <div className="cardmethod">Paypal</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
