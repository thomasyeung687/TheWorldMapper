import React from 'react';
import { WButton, WNavItem }                from 'wt-frontend';

const AncestorRegionEntry = (props) => {
    let activeSSRegionId = props.activeSSRegionId;

    
    let hover = props.activeRegionId == props.thisRegionId && activeSSRegionId == null ? 'ancestorBtn currAncestorRegionBtn' : 'ancestorBtn notCurrAncestorRegionBtn'
    console.log("ancestor", activeSSRegionId, hover)
    const setActiveHelperFunc = ()=>{
        if(props.activeRegionId != props.thisRegionId || activeSSRegionId != null){
            props.handleSetActiveAncestorRegion(props.thisRegionId, props.ind);
        }else{
            console.log("clicked on region already active");
        }
    }

    return (
        <>
        {
            props.ind == 0 ?
            <div className={`${hover}`} onClick={()=>{setActiveHelperFunc()}}>
                {props.thisRegionName}
            </div>
            :
            <>
                <div>
                    >
                </div>
                <div className={`${hover}`} onClick={()=>{setActiveHelperFunc()}}>
                    {props.thisRegionName}
                </div>
            </>
        }
        </>
        
    )

}

export default AncestorRegionEntry;