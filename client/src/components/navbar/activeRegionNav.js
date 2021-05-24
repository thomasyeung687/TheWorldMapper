import React                                from 'react';
import { WButton, WNavItem }                from 'wt-frontend';

const ActiveRegionNav = (props) => {

    let subregionArr = props.subregionsArr;
    let subregionIds = [];
    let activeSSRegionId = props.activeSSRegionId;

    let indOfCurActive = 0;
    for(let i = 0; i < subregionArr.length; i++){
        let region = subregionArr[i];
        subregionIds.push(region._id);
        if(region._id === activeSSRegionId){
            indOfCurActive = i;
        }
    }

    console.log("indOfCurActive", indOfCurActive, "activeSSRegionId", activeSSRegionId, "subregionIds", subregionIds);

    const backButtonStyle = indOfCurActive === 0 ? 'header_button SS-header-button-disabled ' : 'header_button SS-header-section SS-header-button ';
    const forwardButtonStyle = indOfCurActive === subregionIds.length-1 ? 'header_button SS-header-button-disabled ' : 'header_button SS-header-section SS-header-button ';
    
    const hoverBack = indOfCurActive === 0 ? 'transparent' : 'lighten';
    const hoverForward = indOfCurActive === subregionIds.length-1 ? 'transparent' : 'lighten';

    const handleSetBackwards = () =>{
        if(indOfCurActive === 0){
            console.log("can't move backwards");
        }else{
            props.setSSRegionId(subregionIds[indOfCurActive-1]);
        }
    }

    const handleSetFoward = () =>{
        if(indOfCurActive === subregionIds.length-1){
            console.log("can't move forwards");
        }else{
            props.setSSRegionId(subregionIds[indOfCurActive+1]);
        }
    }
    
    
    return (
        <>
            <WNavItem hoverAnimation={`${hoverBack}`} className="header_button">
                <WButton onClick={()=>{handleSetBackwards()}} className={`${backButtonStyle}`}>
                    <i className="material-icons">arrow_back</i>
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation={`${hoverForward}`} className="header_button">
                <WButton onClick={()=>{handleSetFoward()}} className={`${forwardButtonStyle}`}>
                    <i className="material-icons">arrow_forward</i>
                </WButton>
            </WNavItem>
        </>
    );
};

export default ActiveRegionNav;