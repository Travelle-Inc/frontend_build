import React from 'react';

const AnimatedLogo = () => {
    return (
        <div style={{
            width: '200px',
            height: '200px',
            margin: '0 auto'
        }}>
            <img
                src="/logo-suitcase.png"
                alt="Travel Logo"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }}
            />
        </div>
    );
};

export default AnimatedLogo;
