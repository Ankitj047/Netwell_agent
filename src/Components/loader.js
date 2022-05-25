import React from 'react';
const Loader = () => {
    return (
    <div style={{ width: '100%', height: '100%', position: 'fixed', zIndex: '101', top: 0, left: 0, opacity: '0.8', backgroundColor: '#ffffff' }}>
        <img style={{ marginTop: '20%', marginLeft: '46%', width: '100px' }} src={require('../Assets/Images/Loading_2.gif')} />
    </div>
    )
}

export default Loader;