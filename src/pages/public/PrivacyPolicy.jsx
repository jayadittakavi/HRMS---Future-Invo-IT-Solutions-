import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1 pt-5">
                <div className="container py-5">
                    <h1 className="fw-bold mb-4">Privacy Policy</h1>
                    <p className="text-muted mb-4">Last updated: February 2026</p>

                    <section className="mb-5">
                        <h2 className="h4 fw-bold mb-3">1. Introduction</h2>
                        <p className="text-secondary">
                            Future Invo HRMS respects your privacy and is committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2 className="h4 fw-bold mb-3">2. Data We Collect</h2>
                        <p className="text-secondary">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="text-secondary">
                            <li>Identity Data includes first name, last name, username or similar identifier.</li>
                            <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
                            <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version.</li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <h2 className="h4 fw-bold mb-3">3. How We Use Your Data</h2>
                        <p className="text-secondary">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="text-secondary">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
