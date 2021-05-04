import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useQuery, useLazyQuery } 	from '@apollo/client';
import * as queries 	from '../../cache/queries';

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

    console.log(region)


    const { data } = props;

    const name = region.name;
    const capital = region.capital;
    const leader = region.leader;
    const landmarks = region.landmarks;

    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    
    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = description;
        // props.editItem(data._id, 'description', newDescr, prevDescr);
    };
    
    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = due_date;
        // props.editItem(data._id, 'due_date', newDate, prevDate);
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : "No Leader";
        const prevLeader = status;
        // props.editItem(data._id, 'completed', newStatus, prevStatus);
    };

    return (
        <WRow className='table-entry'>
            <WCol size="2">
                {
                    editingName || description === ''
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            autoFocus={true} defaultValue={description} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleDescrEdit(!editingDescr)}
                        >{description}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingCapital ? <input
                        className='table-input' onBlur={handleCapitalEdit}
                        autoFocus={true} defaultValue={due_date} type='date'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                        : <div className="table-text"
                            onClick={() => toggleDateEdit(!editingDate)}
                        >{due_date}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingLeader ? <input
                    className='table-input' onBlur={handleLeaderEdit}
                    autoFocus={true} defaultValue={due_date} type='date'
                    wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                        : <div onClick={() => toggleStatusEdit(!editingStatus)} className={`${completeStyle} table-text`}>
                            {status}
                        </div>
                }
            </WCol>

            <WCol size="2">
                <div className={`${assignedStyle} table-text`}
                    onClick={() => toggleAssignEdit(!editingAssigned)}
                >FLAG
                </div>
            </WCol>

            <WCol size="4">
                <div className={`${assignedStyle} table-text`}
                    onClick={() => toggleAssignEdit(!editingAssigned)}
                >{landmarks}
                </div>
            </WCol>
        </WRow>
    );
};

export default TableEntry;