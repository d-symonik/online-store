import React from 'react';
import Card from "../UI/Card/Card.jsx";
import classes from './Payment.module.scss';

const PaymentPage = () => {
    return (
        <section className={classes.payment}>
            <Card>
                <h1>Payment</h1>
                <p>At our electro devices shop, we believe in making the shopping experience as easy and convenient as
                    possible. That's why we offer a variety of payment options to suit your needs.

                </p>
                <p>
                    We accept all major credit cards, including Visa, Mastercard, and American Express, as well as
                    PayPal. You can also pay with your debit card, or opt for a bank transfer if that's more convenient
                    for you.
                </p>

                <p>
                    To ensure the security of your payment information, we use the latest encryption technology to
                    protect your personal data. Rest assured that your payment details are safe with us.

                </p>
                <p>
                    If you have any questions or concerns about the payment process, our friendly customer service team
                    is always available to assist you. We're here to make sure that your shopping experience is seamless
                    from start to finish.
                </p>
                <p>
                    At our electro devices shop, we believe that everyone should have access to the latest technology
                    without breaking the bank. That's why we offer competitive prices and frequent promotions, so you
                    can get the best deals on the products you love.
                </p>
                <p>
                    Thank you for choosing our shop for your electronic needs. We're committed to providing a
                    hassle-free shopping experience, so you can focus on enjoying your new device.
                </p>
                <p>
                   Email:  <a href = "mailto: techno.store@gmail.com">techno.store@gmail.com</a>
                </p>
                <p>
                    Phone:  <a href="tel:+496170961709" >+496170961709</a>
                </p>

            </Card>
        </section>
    );
};

export default PaymentPage;