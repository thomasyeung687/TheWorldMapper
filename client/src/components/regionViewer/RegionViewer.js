import React, { useState } from 'react';
import { useQuery, useMutation } 	from '@apollo/client';
import * as queries 	from '../../cache/queries';
import * as mutations 	from '../../cache/mutations';
import CreateMap                        from '../modals/CreateNewMap';

import MapEntry         from '../maps/MapEntry';

import Globe from '../../Images/Globe.png'

const RegionViewer = (props) => {
    const parentRegion = props.activeRegion;
    const region = props.activeSSRegion;
    console.log(region);

    let name = region ? region.name : "";
    let parentName = parentRegion ? parentRegion.name : "";
    let capital = region ? region.capital : "";
    let leader = region ? region.leader : "";
    let num = region ? region.subregions.length : 0;
    if(region){
        console.log(region.subregions, region.subregions.length)
    }
    console.log(num);
    console.log("RegionViewer")
    return (
        <div className="rv_Maincontainer">
            <div className="rv_LeftBox">
                <div className="rv_backForwardButtonsBox">
                    <div className="rv_backForwardButtons"><i className="material-icons">undo</i></div>
                    <div className="rv_backForwardButtons"><i className="material-icons">redo</i></div>
                </div>
                <img className="rv_Img" src={Globe} alt="Globe" />
                <div className="rv_TextContainer">
                    <div className="rv_Text">Region Name: {name}</div>
                    <div className="rv_ParentTextBox">
                        <div className="rv_Text">Parent Region: 
                            <span className="rv_ParentName_Text" onClick={()=>props.setSSRegion(null)}>{parentName}</span>
                        </div>
                        <div className="rv_editButton"><i className="material-icons">edit</i></div>
                    </div>
                    <div className="rv_Text">Region Capital: {capital}</div>
                    <div className="rv_Text">Region Leader: {leader}</div>
                    <div className="rv_Text"># Of Sub Regions: {num}</div>
                </div>
            </div>
            <div className="rv_RightBox">
                <div className="rv_landmarksContainer">
                    <div className="rv_landmarks_textbox">Region Landmarks:</div>
                    <div className="landmarksBox">
                        {/* map to generate all landmarks */}
                    </div>
                    <div className="rv_addNewLandmarksBar">
                        <div className="rv_addNewLandmarksBar_btn"><i className="material-icons">add</i></div>
                        <input className="rv_addNewLandmarksBar_input"></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegionViewer;