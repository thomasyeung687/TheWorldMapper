import React, { useState } from 'react';
import { useQuery, useLazyQuery } 	from '@apollo/client';
import * as queries 	from '../../cache/queries';
import * as mutations 	from '../../cache/mutations';
import CreateMap                        from '../modals/CreateNewMap';

import MapEntry         from '../maps/MapEntry';

import Globe from '../../Images/Globe.png'
import LandmarkEntry from './landmarkEntry';
import { WButton, WRow, WCol } from 'wt-frontend';

const RegionViewer = (props) => {

    const [landmarkName, setLandmarkName] = useState('')
    const [changeParent, toggleChangeParent] = useState(false);

    

    const { error:error2, loading:loading2, data:data2, refetch:refetch2 } = useQuery(queries.GET_DB_REGION_BY_ID, {variables: {_id: props.activeSSRegionId}});

    let region = null;
    if(data2) { 
        console.log(data2);
        let { getRegionById } = data2;
        if(getRegionById !== null) { region = getRegionById; }
    }
    // let _id = region ? region.parentRegion : null;

    const { error, loading, data, refetch } = useQuery(queries.GET_DB_REGION_BY_ID, {skip: !region, variables: {_id: region ? region.parentRegion : null}});
    

    let parentRegion = null;
    
    if(data) { 
        console.log(data);
        let { getRegionById } = data;
        if(getRegionById !== null) { 
            parentRegion = getRegionById; 
            console.log(parentRegion.subregions);}
    }
    const { error:errorSubregionsArr, loading:loadingSubregionsArr, data:dataSubregionsArr, refetch:refetchSubregionsArr } = useQuery(queries.GET_ALL_CHILDREN_REGIONS, {skip: !parentRegion, variables: {subregionIds: parentRegion ? parentRegion.subregions : null}});
    
    if(dataSubregionsArr) { 
        console.log(dataSubregionsArr.getAllChildren);
        let { getAllChildren } = dataSubregionsArr;
        if(getAllChildren !== null) { 
            props.setSubregionsArr(getAllChildren); 
            console.log("fetched dataSubregionsArr", getAllChildren);
        }
    }
    
    
    let name = region ? region.name : "";
    let parentName = parentRegion ? parentRegion.name : "";
    let capital = region ? region.capital : "";
    let leader = region ? region.leader : "";
    let num = region ? region.subregions.length : 0;

    const { error:error4, loading:loading4, data:data4, refetch:refetch4 } = useQuery(queries.GET_ALL_LANDMARKS, {variables: {_id: props.activeSSRegionId}}); 
    let thisRegionslandmarks = region ? region.landmarks : [];
    let landmarksArr = data4 ? data4.getAllLandmarks : [];

    // console.log(landmarksArr);

    
    const { error:error3, loading:loading3, data:data3, refetch:refetch3 } = useQuery(queries.GET_ALL_REGION_ABOVE, {variables: {_id: props.activeSSRegionId}}); 

    if(loading3){console.log("loading parentRegionCandidatesdata")}
    if(error3){console.log("error parentRegionCandidatesdata", error3)}
    let parentRegionCandidatesdata =  data3 ? data3.getAllRegionAbove : [];

    let parentRegionCandidates =  {};
    for(let i = 0; i < parentRegionCandidatesdata.length; i++){
        const reg = parentRegionCandidatesdata[i];
        parentRegionCandidates[reg.name] = reg._id;
    }
    

    // console.log("parentRegionCandidatesdata", parentRegionCandidatesdata)
    // console.log("parentRegionCandidates", parentRegionCandidates)
    
    
    


    const refetchSSRegion = async () =>{
        const {data} = await refetch2();
        region = data.getRegionById;
        console.log("refetched SSRegion",region);
        await refetchLandmarks();
    }

    const refetchRegionsAbove = async () => {
        const {data} = await refetch3();
        parentRegionCandidatesdata =  data ? data.getAllRegionAbove : [];
        parentRegionCandidates =  {};
        for(let i = 0; i < parentRegionCandidatesdata.length; i++){
            const reg = parentRegionCandidatesdata[i];
            parentRegionCandidates[reg.name] = reg._id;
        }
        console.log("refetched refetchRegionsAbove:", parentRegionCandidates)
    }

    const refetchLandmarks = async () => {
        const {data} = await refetch4();
        landmarksArr = data.getAllLandmarks;
        console.log("refetched landmarks:", landmarksArr)
    }

    const refetchParentRegion = async () =>{
        const {data} = await refetch();
        parentRegion = data.getRegionById;
        console.log("refetched parent",parentRegion);
    }

    const refetchSubregionsArrfunc = async () => {
        const {data} = await refetchSubregionsArr();
        props.setSubregionsArr(data.getAllChildren);
        console.log("refetched refetchSubregionsArr",data.getAllChildren);
    }

    const handleAddLandmark = async () =>{
        console.log(landmarkName);
        if(landmarkName !== ""){
            await props.addDeleteEditLandmark(region._id, landmarkName, 1, "");// opcodes: 0 - delete, 1 - add
            await refetchSSRegion();
            await refetchLandmarks();
            setLandmarkName("");
        }
    }

    const handleChangeParent = async (e) => {
        const value = e.target.value;
        console.log("handleChangeParent, parentID:", value);
        if(value === region.parentRegion || null){
            console.log("no change detected!");
        }else{
            await props.changeParentRegion(region._id, value, region.parentRegion);
            props.setActiveRegionId(value);
            await refetchSSRegion();
            await refetchRegionsAbove();
            await refetchLandmarks();
            await refetchParentRegion();
            await refetchSubregionsArrfunc();
        }

        toggleChangeParent(!changeParent)
    }

    

    let undoButtonStyle = props.undoSize() === 0 ? 'SS-header-button-disabled ' : 'SS-header-section SS-header-button ';
    let redoButtonStyle = props.redoSize() === 0 ? 'SS-header-button-disabled ' : 'SS-header-section SS-header-button ';
    
    const clickDisabled = (str) => {
        if(str === "undo"){
            undoButtonStyle = 'SS-header-button-disabled';
        }else if( str === "redo") {
            redoButtonStyle = 'SS-header-button-disabled';
        }
    };
    const hoverUndo = props.undoSize() === 0 ? 'transparent' : 'lighten';
    const hoverRedo = props.redoSize() === 0 ? 'transparent' : 'lighten';
    const handleUndo = async () =>{
        if (props.undoSize() === 0){
            console.log("undo clicked disabled")
            clickDisabled("undo");
        }else{
            // console.log("undo clicked")
            await props.undo();
            await refetchSSRegion();
            await refetchRegionsAbove();
            await refetchLandmarks();
            await refetchParentRegion();
            await refetchSubregionsArrfunc();
        }  
    }

    const handleRedo = async () =>{
        if (props.redoSize() === 0){
            console.log("redo clicked disabled")
            clickDisabled("redo");
        }else{
            // console.log("redo clicked")
            await props.redo();
            await refetchSSRegion();
            await refetchRegionsAbove();
            await refetchLandmarks();
            await refetchParentRegion();
            await refetchSubregionsArrfunc();
        }  
    }

    // console.log(region);
    console.log(landmarksArr);

    const showFlag = () =>{
        try {
            return(
                <div className="flagInRVWrapper">
                    <img src={require("../../../public/flags/" + name + " Flag.png")} className="flagInRV"></img>
                </div>
            )
        } catch (error) {
            return(
                <div className="flagInRVWrapper">
                    <img className="globe" src={Globe} alt="Globe" />
                </div>
            )
        }
    }

    return (
        <div className="rv_Maincontainer">
            <div className="rv_LeftBox">
                <div className="rv_backForwardButtonsBox">
                    {/* <div className="rv_backForwardButtons"><i className="material-icons">undo</i></div>
                    <div className="rv_backForwardButtons"><i className="material-icons">redo</i></div> */}
                    <WButton wType="texted" className={`${undoButtonStyle}`} onClick={handleUndo}  hoverAnimation={`${hoverUndo}`} >
                        <i className="material-icons">undo</i>
                    </WButton>
                    <WButton wType="texted" className={`${redoButtonStyle}`} onClick={handleRedo} hoverAnimation={`${hoverRedo}`} >
                        <i className="material-icons">redo</i>
                    </WButton>
                </div>
                {showFlag()}
                <div className="rv_TextContainer">
                    <div className="rv_Text">Region Name: {name}</div>
                    <div className="rv_ParentTextBox">
                        <div className="rv_Text">Parent Region: 
                            {changeParent ?
                                <select
                                    className='rv_parent_select' onBlur={handleChangeParent}
                                    autoFocus={true} 
                                >
                                    {
                                        Object.keys(parentRegionCandidates).map((key)=>{
                                            if(key === parentName){
                                                console.log(key, parentName);
                                                return (
                                                    <option value={parentRegionCandidates[key]} selected>{key}</option>
                                                )
                                            }else{
                                                return(
                                                    <option value={parentRegionCandidates[key]}>{key}</option>
                                                )
                                            }
                                        })
                                    }
                                </select>
                            :
                            <span className="rv_ParentName_Text" onClick={()=>{props.setSSRegionId(null); props.setActiveRegionId(region.parentRegion)}}>{parentName}</span>
                            }
                        </div>
                        <div className="rv_editButton" onClick={()=>{toggleChangeParent(!changeParent)} }><i className="material-icons">edit</i></div>
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
                        {/* map to generate all landmarks */
                            landmarksArr ?
                            landmarksArr.map(landmark => (
                                <LandmarkEntry
                                    landmark={landmark} 
                                    thisRegionslandmarks={thisRegionslandmarks}
                                    landmarksArr={landmarksArr}

                                    addDeleteEditLandmark={props.addDeleteEditLandmark}
                                    refetchSSRegion= {refetchSSRegion}
                                    refetchLandmarks={refetchLandmarks}
                                    regionId={region? region._id: null}
                                />
                            ))
                            :
                            <></>
                        }
                    </div>
                    <div className="rv_addNewLandmarksBar">
                        <div className="rv_addNewLandmarksBar_btn" onClick={()=>{handleAddLandmark()}}><i className="material-icons">add</i></div>
                        <input className="rv_addNewLandmarksBar_input" name="landmark" value={landmarkName} onChange={event => setLandmarkName(event.target.value)}></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegionViewer;