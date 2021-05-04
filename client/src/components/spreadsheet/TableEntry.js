import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useQuery, useLazyQuery } 	from '@apollo/client';
import * as queries 	from '../../cache/queries';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const TableEntry = (props) => {
    console.log(props._id);
    const { error, loading, data, refetch } = useQuery(queries.GET_DB_REGION_BY_ID, {variables: {_id: props._id}});

    let region = null;

    if(error) { console.log(error); }
    if(loading) { console.log(loading); }
    if(data) { 
        console.log(data);
        let { getRegionById } = data;
        if(getRegionById !== null) { region = getRegionById; }
    }

    const setActiveHelperFunction = async() => {
		props.setActiveRegion(region);
    }
    // refetch();

    console.log(region)

    const name = region ? region.name : "Nan";
    const capital = region ? region.capital : "Nan";
    const leader = region ? region.leader : "Nan";
    let landmarks = region ? region.landmarks.length == 0 ? "Add Landmarks" : region.landmarks : "Nan";

    // if(landmarks == []) {
    //     console.log("in landmarks if");
    //     landmarks = "Add Landmarks"
    // }
    console.log(landmarks)

    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    
    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = name;
        // props.editItem(data._id, 'description', newDescr, prevDescr);
    };
    
    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = capital;
        // props.editItem(data._id, 'due_date', newDate, prevDate);
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : "No Leader";
        const prevLeader = leader;
        // props.editItem(data._id, 'completed', newStatus, prevStatus);
    };

    return (
        <WRow className='SStable_entry'>
            <WCol size="2">
                <div className="SSNameColumn">
                {/* <WButton className="sidebar-buttons" onClick={console.log("delete modal")} clickAnimation="ripple-light" shape="rounded" color="primary">
                    <i className="material-icons">clear</i>
                </WButton> */}
                <div>
                    <i className="material-icons">clear</i>
                </div>
                {
                    editingName ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            autoFocus={true} defaultValue={name} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="SStableText"
                            // onClick={() => toggleNameEdit(!editingName)}
                            onClick={() => {props.setActiveRegion(region)}}
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
                            onClick={() => toggleCapitalEdit(!editingCapital)}
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
                        : <div onClick={() => toggleLeaderEdit(!editingLeader)} className="SStableText">
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
                        props.setSSRegion(region)
                    }
                >{landmarks}
                </div>
            </WCol>
        </WRow>
    );
};

export default TableEntry;