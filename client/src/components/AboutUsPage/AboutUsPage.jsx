import React from 'react';
import Card from "../UI/Card/Card.jsx";
import classes from './AboutUsPage.module.scss';

const AboutUsPage = () => {
    return (
        <section className={classes.about_us}>
            <Card>
                <h1>Hello! We`re Techno Store</h1>
                <p>Welcome to our electro devices shop, where we strive to provide our customers with the latest and
                    greatest technology available on the market. Our goal is to make your life easier by offering
                    high-quality electronic devices that enhance your productivity, entertainment, and communication.
                </p>
                <p>
                    We understand that in today's fast-paced world, staying connected and up-to-date is essential.
                    That's why we've curated a selection of electronic devices that cater to your every need, whether
                    you're looking for a new smartphone, tablet, laptop, or home entertainment system.</p>

                <p>
                    At our shop, we pride ourselves on providing exceptional customer service. Our team is made up of
                    knowledgeable and friendly professionals who are passionate about technology and dedicated to
                    helping you find the perfect device to suit your needs.</p>
                <p>
                    We believe that everyone should have access to the latest technology, which is why we offer
                    competitive prices and frequent promotions to help you save on your purchases. Our shop is committed
                    to delivering value for your money and ensuring that you're completely satisfied with your purchase.
                </p>
                <p>
                    Our commitment to quality extends beyond the products we offer. We're also committed to providing a
                    safe and secure online shopping experience. Our website is designed with user-friendly navigation
                    and robust security measures to protect your personal information.
                </p>
                <p>
                    Thank you for choosing our electro devices shop as your go-to destination for all your
                    electronic
                    needs. We look forward to serving you and helping you stay connected in today's digital
                    world.</p>
            </Card>
        </section>
    );
};

export default AboutUsPage;