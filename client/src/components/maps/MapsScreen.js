import React, { useState } from 'react';
import { useQuery, useMutation } 	from '@apollo/client';
import * as queries 	from '../../cache/queries';
import * as mutations 	from '../../cache/mutations';
import CreateMap                        from '../../components/modals/CreateNewMap';

import MapEntry         from '../maps/MapEntry';


import Globe from '../../Images/Globe.png'

const MapsScreen = (props) => {
    const [showCreateMap, toggleShowCreateMap] 	= useState(false);
    

    const [DeleteMap] 			    = useMutation(mutations.DELETE_MAP);
    const [UpdateMapName] 			= useMutation(mutations.UPDATE_MAP_NAME);

    const setShowCreateMap = () => {
		toggleShowCreateMap(!showCreateMap);
		console.log("create map")
	}
    
    console.log("MapsScreen",props.maps)

    const { loading, error, data, refetch } = useQuery(queries.GET_DB_MAPS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) {
        if(props.maps.length === 0){
            props.setMaps(data.getAllMaps) 
        } 
    }
	if(!data){console.log("not dataMap")}

    const deleteMap = async (_id) => {
		DeleteMap({ variables: { _id: _id }, refetchQueries: [{ query: queries.GET_DB_MAPS }] });
		refetch();//refetches maps using refetch from line 28
	};

	const refetchMaps = async (refetch) => {//used when we need to refetch while updating a map
		const { loading, error, data } = await refetch();
		if (data) {
			props.setMaps(data.getAllMaps) // where is this defined?
			if (props.activeMap._id) {
				let tempID = props.activeMap._id;
				let list = props.maps.find(map => map._id === tempID);
				props.setActiveMap(list);
			}
		}
	}

    const editMapName = async (_id, value) => {
        UpdateMapName({ variables: { _id: _id, value: value }, refetchQueries: [{ query: queries.GET_DB_MAPS }] });
        refetch();//refetches maps using refetch from line 28
    }

    let maps = props.maps;
    const mostRecentMapToTop = (id) => {
		console.log("mostRecentMapToTop", id);
		
		let recentMap = maps.filter((map)=>{return map._id === id});
		let restMap = maps.filter((map)=>{return map._id !== id});

		let newMap = [...recentMap, ...restMap];
		console.log(newMap);
        maps = newMap;
		props.setMaps(newMap);
	}

    console.log("mapscreen")
    return (
        <div className="mainContainer">
            <div className="yourMapsContainer">
                <div className="yourMapsContainerHeader">
                    <h1 style={{color: "white"}}>Welcome to your maps</h1>
                </div>
                <div className="yourMapsMainContent">
                    <div className="yourMapsLeftBox">
                        {maps.map( map => (<MapEntry name={map.name} _id={map._id}
                        updateListField={props.updateListField}  
                        deleteMap ={deleteMap}
                        editMapName = {editMapName}
                        setActiveRegion={props.setActiveRegion}
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
                refetchMaps = {refetch}
				setShowCreateMap={setShowCreateMap} 
				setActiveMap = {props.setActiveMap}
				user = {props.user} />)
		    }
        </div>
    );
};

export default MapsScreen;