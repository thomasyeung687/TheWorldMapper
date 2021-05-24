import React                                from 'react';
import { WButton, WNavItem }                from 'wt-frontend';
import AncestorRegionEntry                  from './ancestorRegionEntry'


import {useQuery} 	from '@apollo/client';
import * as queries 	from '../../cache/queries';

const AncestorRegionNav = (props) => {

    let ancestorsArr = props.activeAncestorRegions;
    console.log("AncestorRegionNav", ancestorsArr);
    
    
    return (
        <>
            <WNavItem className="ancestorNavigation">
                {
                    ancestorsArr.map((ancestor, ind) => {
                        return(
                            <>
                                <AncestorRegionEntry
                                ind={ind}
                                activeRegionId = {props.activeRegionId}
                                thisRegionId = {ancestor._id}
                                thisRegionName = {ancestor.name}
                                activeSSRegionId = {props.activeSSRegionId}

                                handleSetActiveAncestorRegion={props.handleSetActiveAncestorRegion}
                                />
                            </>
                        )
                    })
                }
            </WNavItem>
        </>
    );
};

export default AncestorRegionNav;