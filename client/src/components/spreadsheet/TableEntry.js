import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useQuery, useLazyQuery } 	from '@apollo/client';
import DeleteModal from '../modals/DeleteModal'
import * as queries 	from '../../cache/queries';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const TableEntry = (props) => {

    const [showDeleteRegion, toggleShowDeleteRegion] = useState(false);
    
    const [editingName, toggleNameEdit] = useState(props.editNameBool);
    const [editingCapital, toggleCapitalEdit] = useState(props.editCapitalBool);
    const [editingLeader, toggleLeaderEdit] = useState(props.editLeaderBool);
    // console.log(showDeleteRegion);
    let edittracker = props.editTracker;
    // useeffect [] queries no useeffect between.
    //table contents
    //whther onchange rran first or onblur ran first. 
    //onblur click off unfocus, call unblur when moving arrow key. doesnt work. recognize the arrowkey first.
    //onkeydown onkeyup. props. input class. onblur="" onkeydown="down"
    const toggleNameEditfunc = () =>{
        toggleNameEdit(!editingName);
        // if(editingName == false && props.editTracker == [props.index, 0] ){
        //     console.log("here3")
        //     props.updateEditTracker([]);
        // }else if(editingName == true && props.editTracker == []){
        //     console.log("here0")
        //     props.updateEditTracker([props.index, 0]);
        // }
    }
    const toggleCapitalEditfunc = () =>{
        toggleCapitalEdit(!editingCapital);
        // if(editingCapital == false && props.editTracker == [props.index, 1] ){
        //     console.log("here4")
        //     props.updateEditTracker([]);
        // }else if(editingCapital == true && props.editTracker == []){
        //     console.log("here1")
        //     props.updateEditTracker([props.index, 1]);
        // }
    }
    const toggleLeaderEditfunc = () =>{
        toggleLeaderEdit(!editingLeader);
        // if(editingLeader == false && props.editTracker == [props.index, 2] ){
        //     console.log("here5")
        //     props.updateEditTracker([]);
        // }else if(editingLeader == true && props.editTracker == []){
        //     console.log("here2")
        //     props.updateEditTracker([props.index, 2]);
        // }
    }
    // console.log("type",typeof props.index,typeof props.editNameBool,typeof props.editCapitalBool,typeof props.editLeaderBool)
    // console.log("props", props.editTracker, props.index, props.editNameBool, props.editCapitalBool, props.editLeaderBool)
    // console.log("state", props.index, editingName, editingCapital, editingLeader)

    // console.log(props._id);
    const { error, loading, data, refetch } = useQuery(queries.GET_DB_REGION_BY_ID, {variables: {_id: props._id}});
    let region = null;

    // if(error) { console.log(error); }
    // if(loading) { console.log(loading); }
    if(data) { 
        // console.log(data);
        let { getRegionById } = data;
        if(getRegionById !== null) { region = getRegionById; }
    }
    const refetchRegions = async (refetch) => {
        const { loading, error, data } = await refetch();
        if (data) {
            region = data.getRegionById;
        }
    }

    

    const setActiveHelperFunction = async() => {
		props.setActiveRegion(region);
    }
    // refetch();

    // console.log(region)

    const name = region ? region.name : "Nan";
    const capital = region ? region.capital : "Nan";
    const leader = region ? region.leader : "Nan";
    let landmarks = region ? region.landmarks.length == 0 ? "Add Landmarks" : region.landmarks : "Nan";
 
    // console.log(landmarks)



    
    const handleNameEdit = async (e) => {
        toggleNameEditfunc()
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = name;
        await props.editRegion(region._id, 'name', newName, prevName);
        const {data} = await refetch();
        if(data) { 
            // console.log(data);
            let { getRegionById } = data;
            if(getRegionById !== null) { region = getRegionById; }
        }
    };
    
    const handleCapitalEdit = async (e) => {
        toggleCapitalEditfunc();
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = capital;
        await props.editRegion(region._id, 'capital', newCapital, prevCapital);
        const {data} = await refetch();
        if(data) { 
            // console.log(data);
            let { getRegionById } = data;
            if(getRegionById !== null) { region = getRegionById; }
        }
    };

    const handleLeaderEdit = async (e) => {
        toggleLeaderEditfunc();
        const newLeader = e.target.value ? e.target.value : "No Leader";
        const prevLeader = leader;
        await props.editRegion(region._id, 'leader', newLeader, prevLeader);
        const {data} = await refetch();
        if(data) { 
            // console.log(data);
            let { getRegionById } = data;
            if(getRegionById !== null) { region = getRegionById; }
        }
    };

    let timer = 0;
    let delay = 300;
    let prevent = false;

    const handleClick = (e) => {
      let me = this;
      timer = setTimeout(function() {
        if (!prevent) {
            console.log("asdas");
            props.setActiveRegionId(region._id);
        }
        prevent = false;
      }, delay);
    }
    const handleDoubleClick = (e) => {
      clearTimeout(timer);
      prevent = true;
      toggleNameEditfunc();
    }


    return (
        <WRow className='SStable_entry'>
            <WCol size="2">
                <div className="SSNameColumn">
                <WButton className="sidebar-buttons" onClick={()=>{console.log("delete modal"); toggleShowDeleteRegion(!showDeleteRegion)}} clickAnimation="ripple-light" shape="rounded" color="primary">
                    <i className="material-icons">clear</i>
                </WButton>
                {/* <div>
                    <i className="material-icons">clear</i>
                </div> */}
                {
                    editingName ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            autoFocus={true} defaultValue={name} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="SStableText"
                            // onClick={() => toggleNameEdit(!editingName)}
                            onDoubleClick={ handleDoubleClick } 
                            onClick={ handleClick }
                        >{name}
                        </div>
                }
                </div>
            </WCol>

            <WCol size="2">
                {
                    editingCapital ? <WInput
                        className='table-input' onBlur={handleCapitalEdit}
                        autoFocus={true} defaultValue={capital} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                        : <div className="SStableText"
                            onClick={toggleCapitalEditfunc}
                        >{capital}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingLeader ? <WInput
                    className='table-input' onBlur={handleLeaderEdit}
                    autoFocus={true} defaultValue={leader} type='text'
                    wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                        : <div onClick={toggleLeaderEditfunc} className="SStableText">
                            {leader}
                        </div>
                }
            </WCol>

            <WCol size="2">
                <div className="SStableText"
                >FLAG
                </div>
            </WCol>

            <WCol size="4">
                <div className="SStableText"
                    onClick={() => 
                        props.setSSRegionId(region._id)
                    }
                >{landmarks}
                </div>
            </WCol>
            {
			showDeleteRegion && (<DeleteModal  
				//  refetchTodos={refetch} 
                index={props.index}
                region={region}
                // deleteMsg ={"Delete Region?"}
                // Id={props._id}
				toggleShowDeleteRegion={toggleShowDeleteRegion} 
                showDeleteRegion = {showDeleteRegion}
                delete = {props.deleteRegion}
                refetchRegion = {props.refetchRegion}
				 />)
		    }
        </WRow>
    );
};

export default TableEntry;