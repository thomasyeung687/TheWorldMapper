import React, { useState } from 'react';
import { useQuery, useMutation } 	from '@apollo/client';
import * as queries 	from '../../cache/queries';
import * as mutations 	from '../../cache/mutations';
import CreateMap                        from '../../components/modals/CreateNewMap';

import MapEntry         from '../maps/MapEntry';


import Globe from '../../Images/Globe.png'

const MapsScreen = (props) => {
    const [showCreateMap, toggleShowCreateMap] 	= useState(false);
    
    console.log("mapscreen")
    

    const setShowCreateMap = () => {
		toggleShowCreateMap(!showCreateMap);
		console.log("create map")
	}
    
    // console.log("MapsScreen",props.maps)

    let maps = props.maps;

	// const refetchMaps = async (refetch) => {//used when we need to refetch while updating a map
	// 	const { loading, error, data } = await refetch();
	// 	if (data) {
	// 		props.setMaps(data.getAllMaps) // where is this defined?
	// 		if (props.activeMap._id) {
	// 			let tempID = props.activeMap._id;
	// 			let list = props.maps.find(map => map._id === tempID);
	// 			props.setActiveMap(list);
	// 		}
	// 	}
	// }

    

    
    // const mostRecentMapToTop = (id) => {
	// 	console.log("mostRecentMapToTop", id);
		
	// 	let recentMap = maps.filter((map)=>{return map._id === id});
	// 	let restMap = maps.filter((map)=>{return map._id !== id});

	// 	let newMap = [...recentMap, ...restMap];
	// 	console.log(newMap);
    //     maps = newMap;
	// 	props.setMaps(newMap);
	// }

    
    return (
        <div className="mainContainer">
            <div className="yourMapsContainer">
                <div className="yourMapsContainerHeader">
                    <h1 style={{color: "white"}}>Welcome to your maps</h1>
                </div>
                <div className="yourMapsMainContent">
                    <div className="yourMapsLeftBox">
                        {maps.map( map => (<MapEntry 
                        key={map._id}
                        name={map.name} _id={map._id}
                        updateListField={props.updateListField}  
                        deleteMap ={props.deleteMap}
                        editMapName = {props.editMapName}
                        setActiveRegionId={props.setActiveRegionId}
                        handleSetActiveMap={props.handleSetActiveMap}
                        />)    )}
                    </div>
                    <div className="yourMapsRightBox">
                        <div className="yourMapsRightBoxImageContainer">
                            <img className="GlobeImg" src={Globe} alt="Globe" />
                        </div>
                        <button className="yourMapsAddMapBtn" onClick={setShowCreateMap}>
                            <div className="yourMapsAddMapBtnTxt">Create New Map</div>
                        </button>
                    </div>
                </div>
            </div>
            {
			showCreateMap && (<CreateMap 
				// refetchTodos={refetch} 
                refetchMaps = {props.refetchMaps}
				setShowCreateMap={setShowCreateMap} 
				setActiveMap = {props.setActiveMap}
				user = {props.user} />)
		    }
        </div>
    );
};

export default MapsScreen;