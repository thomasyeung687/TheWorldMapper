import React, { useState }  from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';
import Delete                        from '../../components/modals/Delete';

import { useQuery, useLazyQuery } 	from '@apollo/client';
import * as queries 	from '../../cache/queries';

import trash            from '../../Images/Trash.png'

const SidebarEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);

    const [showDeleteMap, toggleShowDeleteMap] 	= useState(false);
    const setShowDeleteMap = () => {
		toggleShowDeleteMap(!showDeleteMap);
		console.log("showDeleteMap map")
	}

    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.editMapName(props._id, value)
    };
    // console.log("me",props._id)
    // const entryStyle = props.id === props.activeid ? 'list-item list-item-active' : 'list-item ';
    const entryStyle = 'mapEntryContainer ';

    //here we are getting the region information from mongodb
    const { error, loading, data, refetch } = useQuery(queries.GET_DB_REGION_BY_ID, {variables: {_id: props._id}});

    const setActiveHelperFunction = async() => {
		// tps.clearAllTransactions();
		//get all subregions using subregions array in map
		console.log("setActiveHelperFunction",props._id);
		// getRegionById({ variables: { _id: props._id } });
		// console.log(rbiData);
		// console.log("handleSetActiveMap",id)
		// console.log(map);
		// let regionObj = null;
		// // if(rbiData) { 
		// // 	let { getRegionById } = rbiData;
		// // 	if(getRegionById !== null) { regionObj = getRegionById; }
		// // }
        // if(error) { console.log(error); }
        // if(loading) { console.log(loading); }
        // if(data) { 
		//     console.log(data);
        //     let { getRegionById } = data;
        //     if(getRegionById !== null) { regionObj = getRegionById; }
        // }
		// console.log(regionObj);
        // console.log(regionObj["subregions"]);

        props.handleSetActiveMap(props._id);
        //here I want to get the subregions from the db. How do I call the query but with each subregions id?
        // let newSubRegions = [];
        // regionObj["subregions"].map((_id)=>{
        //     refetch( {variables: {_id: _id}} );
        //     if(error) { console.log(error); }
        //     if(loading) { console.log(loading); }
        //     if(data) { 
        //         console.log("In loop",data);
        //         let { getRegionById } = data;
        //         if(getRegionById !== null) { newSubRegions.push(getRegionById); }
        //     }
        // })
        // console.log(newSubRegions)
        // regionObj["subregions"] = newSubRegions;

		// props.setActiveRegion(regionObj);
    }

    return (
        <>
        <WNavItem 
            className={entryStyle} onDoubleClick={handleEditing} 
            hoverAnimation="lighten"
        >
            {
                editing ? <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" barAnimation="solid" name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} />
                    :   
                    <>
                    <div className="MapEntryContentWrapper">
                        <div className="MapEntryClickable " onClick={() => { console.log("entry clicked"); setActiveHelperFunction() }}>
                            <div className='list-text'>
                                {props.name}
                            </div>
                        </div>
                        <WButton className='mapEntryTrashContainer' wType="texted" onClick={()=>{setShowDeleteMap(); }}>
                            <img className="mapEntryTrashImg" src={trash} alt="trash" />
                        </WButton>
                    </div>
                    </>
            }
        </WNavItem>

        {
			showDeleteMap && (<Delete  
				//  refetchTodos={refetch} 
                mapId={props._id}
				setShowDeleteMap={setShowDeleteMap} 
                deleteMap = {props.deleteMap}
				 />)
		}
        </>
    );
};

export default SidebarEntry;