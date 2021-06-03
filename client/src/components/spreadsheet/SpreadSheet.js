import React, { useState, useEffect}        from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';

import * as mutations from '../../cache/mutations';
import { useMutation } from '@apollo/client';
import {useQuery} from '@apollo/client';
import {GET_DB_REGION_BY_ID} from '../../cache/queries'
import {GET_ALL_CHILDREN_REGIONS} from '../../cache/queries'


const MainContents = (props) => {
    const [AddRegion] = useMutation(mutations.ADD_REGION);
    const {loading, error, data, refetch} = useQuery(GET_DB_REGION_BY_ID, {variables: {_id: props.activeRegionId}});

    let region = data ? data.getRegionById : null
    const refetchRegion = async () =>{
        await refetch()
        const {data} = await refetch();
        if(data) {
            let { getRegionById } = data;
            if(getRegionById !== null) { region = getRegionById; }
        }
        // console.log("refetched", region);
    }

    let subregionsIds = region ? region.subregions : null;
    
    const {loading:loadingChildren, error:errorChildren, data:dataChildren, refetch:refetchChildren} = useQuery(GET_ALL_CHILDREN_REGIONS, 
        {skip: !subregionsIds, variables: {subregionIds: subregionsIds}})
    let subregions = dataChildren ? dataChildren.getAllChildren : [];
    
    /**For Troubleshooting */
    // console.log(region);
    // console.log(subregions);
    // console.log(props.undoSize(), props.redoSize());

    const refetchChildrenFunc = async () => {
        const {data} = await refetchChildren();
        subregions = data ? data.getAllChildren : [];
        console.log("refetched", subregions);
    }
    
    return (
        <div className='mainContainer'>
            <div className='SSContainer' >
                <TableHeader
                    addItem={props.addItem}
                    SortSubregions={props.SortSubregions}
                    setShowDelete={props.setShowDelete} setActiveList={props.setActiveList}
                    region = {region}
                    subregions = {subregions}
                    
                    refetchRegion = {refetchRegion}
                    refetchChildrenFunc = {refetchChildrenFunc}

                    undo = {props.undo} redo = {props.redo}
                    undoSize={props.undoSize} redoSize={props.redoSize}
                />
                <TableContents
                    region = {region}
                    subregions = {subregions}
                    activeRegionId={props.activeRegionId}
                    setActiveRegionId={props.setActiveRegionId}
                    activeSSRegionId={props.activeSSRegionId} setSSRegionId={props.setSSRegionId}
                    deleteRegion={props.deleteRegion}
                    editRegion={props.editRegion}

                    refetchRegion = {refetchRegion}
                    refetchChildrenFunc = {refetchChildrenFunc}
                />
            </div>
        </div>
    );
};

export default MainContents;