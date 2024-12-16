import React from 'react';
function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{ textAlign: 'center', padding: '0.5em', backgroundColor: '#5a7c5a', color : 'white' }}>
            <p>&copy; {currentYear} All Rights Reserved by Ai Crafters.</p>
        </footer>
    );
}
export default Footer;
