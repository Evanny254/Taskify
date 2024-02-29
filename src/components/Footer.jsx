import React from "react";

const Footer = () => {
    return (
        <footer className="bg-cyan-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>Copyright © {new Date().getFullYear()} Taskify. All rights reserved.</p>
                <div className="mt-2">
                    <a href="#" className="mr-4">Privacy Policy</a>
                    <a href="#" className="mr-4">Terms of Service</a>
                    <a href="#" className="mr-4">Security</a>
                    <a href="#">Contact Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
