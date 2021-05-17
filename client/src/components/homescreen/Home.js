import React, { useState, useEffect } 	from 'react';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import WInput from 'wt-frontend/build/components/winput/WInput';

import TheWorldMapper from '../../Images/TheWorldMapper.png'



const Home = (props) => {
    return (
        <WLMain>
            <div className="container-secondary TheWorldMapperImContainer">
                <img className="TheWorldMapperImg" src={TheWorldMapper} alt="TheWorldMapper" />;
            </div>
        </WLMain>
    );
};

export default Home;