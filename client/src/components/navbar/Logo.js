import React from 'react';

const Logo = (props) => {
    return (
        <div className='logo' onClick={()=>{console.log("setting active region to []"); props.setActiveRegion(null)} }>
            The World Mapper
        </div>
    );
};

export default Logo;