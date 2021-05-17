import React, { useState, useEffect}        from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';

import * as mutations from '../../cache/mutations';
import { useMutation } from '@apollo/client';
import {useQuery} from '@apollo/client';
import {GET_DB_REGION_BY_ID} from '../../cache/queries'
import {GET_ALL_CHILDREN_REGIONS} from '../../cache/queries'


const MainContents = (props) => {
    // console.log("activeRegion", props.activeRegion);
    const [AddRegion] = useMutation(mutations.ADD_REGION);
    const {loading, error, data, refetch} = useQuery(GET_DB_REGION_BY_ID, {variables: {_id: props.activeRegionId}});
    // const [region, setRegion] = useState(data ? data.getRegionById : null);
    // console.log(data.getRegionById);
    let region = data ? data.getRegionById : null
    const refetchRegion = async () =>{
        console.log("refetchRegion")
        await refetch()
        const {data} = await refetch();
        if(data) { 
            // console.log(data);
            let { getRegionById } = data;
            if(getRegionById !== null) { region = getRegionById; }
        }
    }
    let subregionsIds = region.subregions;
    const {loading:loadingChildren, error:errorChildren, data:dataChildren, refetch:refetchChildren} = useQuery(GET_ALL_CHILDREN_REGIONS, {variables: {subregionIds: subregionsIds}})
    let subregions = dataChildren ? dataChildren.getAllChildren : [];
    
    console.log(region);
    console.log(subregions);
    console.log(props.undoSize(), props.redoSize());

    // const createNewRegion = async () => {
    //     console.log("createNewRegion")
    //     let newRegion = {
	// 		_id: "",
	// 		owner: props.user._id,
	// 		name: "New Region",
	// 		capital:"Capital",
	// 		leader: "Leader",
	// 		parentRegion: props.activeRegion._id,
	// 		subregions: [],
	// 		landmarks:[]
	// 	}
	// 	//const { data } = await AddMap({ variables: { map: newMap }, refetchQueries: [{ query: GET_DB_TODOS }] });
	// 	const { data } = await AddRegion({ variables: { region: newRegion }});
    //     let { addRegion } = data;
    //     console.log(addRegion);
    //     // let region = props.activeRegion
    //     // region

    //     props.setActiveRegion(addRegion)
    // }

    // const DeleteRegion = async (_id) => {
    //     console.log("DeleteRegion")
	// 	//const { data } = await AddMap({ variables: { map: newMap }, refetchQueries: [{ query: GET_DB_TODOS }] });
	// 	const { data } = await AddRegion({ variables: { region: newRegion }});
    //     let { addRegion } = data;
    //     console.log(addRegion);
    //     // let region = props.activeRegion
    //     // region

    //     props.setActiveRegion(addRegion)
    // }

    return (
        <div className='mainContainer'>
            <div className='SSContainer' >
                <TableHeader
                    addItem={props.addItem}
                    setShowDelete={props.setShowDelete} setActiveList={props.setActiveList}
                    region = {region}
                    
                    refetchRegion = {refetchRegion}

                    undo = {props.undo} redo = {props.redo}
                    undoSize={props.undoSize} redoSize={props.redoSize}
                />
                <TableContents
                    region = {region}
                    activeRegionId={props.activeRegionId}
                    setActiveRegionId={props.setActiveRegionId}
                    activeSSRegionId={props.activeSSRegionId} setSSRegionId={props.setSSRegionId}
                    deleteRegion={props.deleteRegion}
                    editRegion={props.editRegion}

                    refetchRegion = {refetchRegion}
                    // deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                    // editItem={props.editItem}
                />
            </div>
        </div>
    );
};

export default MainContents;