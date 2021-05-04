import React, { useState } from 'react';
import { useQuery, useMutation } 	from '@apollo/client';
import * as queries 	from '../../cache/queries';
import * as mutations 	from '../../cache/mutations';
import CreateMap                        from '../modals/CreateNewMap';

import MapEntry         from '../maps/MapEntry';

import Globe from '../../Images/Globe.png'

const RegionViewer = (props) => {

    console.log("RegionViewer")
    return (
        <div className="rv_Maincontainer">
            <div className="rv_LeftBox">
                <div className="rv_backForwardButtonsBox">
                    <div className="rv_backForwardButtons"></div>
                    <div className="rv_backForwardButtons"></div>
                </div>
                <img className="rv_Img" src={Globe} alt="Globe" />
                <div className="rv_TextContainer">
                    <div className="rv_Text">Region Name: United States</div>
                    <div className="rv_ParentTextBox">
                        <div className="rv_Text">Parent Region: North America</div>
                        <div className="rv_editButton"></div>
                    </div>
                    <div className="rv_Text">Region Capital: Washington DC</div>
                    <div className="rv_Text">Region Leader: Joeseph Biden</div>
                    <div className="rv_Text"># Of Sub Regions: 50</div>
                </div>
            </div>
            <div className="rv_RightBox">
                <div className="rv_landmarksContainer">
                    <div className="rv_landmarks_textbox">Region Landmarks:</div>
                    <div className="landmarksBox">
                        {/* map to generate all landmarks */}
                    </div>
                    <div className="rv_addNewLandmarksBar">
                        <div className="rv_addNewLandmarksBar_btn"></div>
                        <input className="rv_addNewLandmarksBar_input"></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegionViewer;