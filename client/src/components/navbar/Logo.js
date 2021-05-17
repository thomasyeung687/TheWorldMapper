import React from 'react';

const Logo = (props) => {
    const onclickFunc = () =>{
        console.log("setting active region to []"); 
        props.setActiveRegionId(null); 
        props.setSSRegionId(null); 
        props.clearAllTransactions(); 
    }
    return (
        <div className='logo' onClick={()=>{onclickFunc()}} >
            The World Mapper
        </div>
    );
};

export default Logo;