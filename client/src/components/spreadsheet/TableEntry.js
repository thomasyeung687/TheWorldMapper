import React, { useEffect, useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useQuery, useLazyQuery } 	from '@apollo/client';
import DeleteModal from '../modals/DeleteModal'
import * as queries 	from '../../cache/queries';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// useeffect [] queries no useeffect between.
    //table contents
    //whther onchange rran first or onblur ran first. 
    //onblur click off unfocus, call unblur when moving arrow key. doesnt work. recognize the arrowkey first.
    //onkeydown onkeyup. props. input class. onblur="" onkeydown="down"

    // if(editingLeader == false && props.editTracker == [props.index, 2] ){
    //     console.log("here5")
    //     props.updateEditTracker([]);
    // }else if(editingLeader == true && props.editTracker == []){
    //     console.log("here2")
    //     props.updateEditTracker([props.index, 2]);
    // }    
const TableEntry = (props) => {

    const [showDeleteRegion, toggleShowDeleteRegion] = useState(false);
    
    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);
    // console.log(showDeleteRegion);
    
    let edittracker = props.editTracker;
    // console.log(props.editTracker);
    useEffect(() => {
        console.log("in useeffect")
        if(edittracker[0] === props.index){
            if(edittracker[1] === 0){
                console.log("here 0",props.index)
                toggleNameEdit(true)
            }else if(edittracker[1] === 1){
                console.log("here 1",props.index)
                toggleCapitalEdit(true)
            }else if(edittracker[1] === 2){
                console.log("here 2",props.index)
                toggleLeaderEdit(true)
            }else{
                console.log("here 10000",props.index)
            }
        }
      });
      //useeffect only renders the first time. 
    
    const toggleNameEditfunc = () =>{
        toggleNameEdit(!editingName);
        props.updateEditTracker([props.index, 0])
    }
    const toggleCapitalEditfunc = () =>{
        toggleCapitalEdit(!editingCapital);
        props.updateEditTracker([props.index, 1])
    }
    const toggleLeaderEditfunc = () =>{
        toggleLeaderEdit(!editingLeader);
        props.updateEditTracker([props.index, 2])
    }
    // console.log("type",typeof props.index,typeof props.editNameBool,typeof props.editCapitalBool,typeof props.editLeaderBool)
    // console.log("props", props.editTracker, props.index, props.editNameBool, props.editCapitalBool, props.editLeaderBool)
    // console.log("state", props.index, editingName, editingCapital, editingLeader)


    const region = props.thisRegion;

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
        if(newName === prevName){
            console.log("no change detected");
        }else{
            await props.editRegion(region._id, 'name', newName, prevName);
            props.refetchChildrenFunc();
        }
    };
    
    const handleCapitalEdit = async (e) => {
        toggleCapitalEditfunc();
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = capital;
        if(newCapital === prevCapital){
            console.log("no change detected");
        }else{
            await props.editRegion(region._id, 'capital', newCapital, prevCapital);
            props.refetchChildrenFunc();
        }
    };

    const handleLeaderEdit = async (e) => {
        toggleLeaderEditfunc();
        const newLeader = e.target.value ? e.target.value : "No Leader";
        const prevLeader = leader;
        if(newLeader === prevLeader){
            console.log("no change detected");
        }else{
            await props.editRegion(region._id, 'leader', newLeader, prevLeader);
            props.refetchChildrenFunc();
        }
    };

    const handleNameEditOnBlur = async (e) => {
        handleNameEdit(e);
        props.updateEditTracker([])
    }
    const handleCapitalEditOnBlur = async (e) => {
        handleCapitalEdit(e);
        props.updateEditTracker([])
    }
    const handleLeaderEditOnBlur = async (e) => {
        handleLeaderEdit(e);
        props.updateEditTracker([])
    }

    const handleNameEditonkeyDown = async (e) => {
        if(e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowDown'){
            handleNameEdit(e);
            props.updateEditTracker([])
        }
    }
    const handleCapitalEditonkeyDown = async (e) => {
        if(e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowDown'){
            handleCapitalEdit(e);
            props.updateEditTracker([])
        }
    }
    const handleLeaderEditonkeyDown = async (e) => {
        if(e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowDown'){
            handleLeaderEdit(e);
            props.updateEditTracker([])
        }
    }

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
                            className='table-input' onBlur={handleNameEditOnBlur}
                            onKeyDown={handleNameEditonkeyDown}
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
                        className='table-input' onBlur={handleCapitalEditOnBlur}
                        onKeyDown={handleCapitalEditonkeyDown}
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
                    className='table-input' onBlur={handleLeaderEditOnBlur}
                    onKeyDown={handleLeaderEditonkeyDown}
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