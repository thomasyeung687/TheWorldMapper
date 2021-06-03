import React from 'react';



import { WButton, WRow, WCol } from 'wt-frontend';

const TableHeader = (props) => {
    
    //Fool proof stying for undo redo
    const undoButtonStyle = props.undoSize() === 0 ? 'SS-header-button-disabled ' : 'SS-header-section SS-header-button ';
    const redoButtonStyle = props.redoSize() === 0 ? 'SS-header-button-disabled ' : 'SS-header-section SS-header-button ';
    const hoverUndo = props.undoSize() === 0 ? 'transparent' : 'lighten';
    const hoverRedo = props.redoSize() === 0 ? 'transparent' : 'lighten';

    /** for trouble shooting transactions */
    // console.log('redo transactions:' + props.redoSize());
    // console.log(redoButtonStyle);

    // console.log('undo transactions:' + props.undoSize());
    // console.log(undoButtonStyle);

    const clickDisabled = () => { };

    const handleUndo = async () =>{
        if (props.undoSize() === 0){
            clickDisabled();
        }else{
            props.undo();
            await props.refetchRegion();
            await props.refetchChildrenFunc();
        }  
    }

    const handleRedo = async () =>{
        if (props.redoSize() === 0){
            clickDisabled();
        }else{
            props.redo();
            await props.refetchRegion();
            await props.refetchChildrenFunc();
        }  
    }
    
    const handleAddItem = async () => {
        await props.addItem();
        props.refetchRegion();
    }

    const handleSortRegions = async (method) =>{
        await props.SortSubregions(method, props.subregions);
        await props.refetchRegion();
        await props.refetchChildrenFunc();
    }

    return (
        <>
        <WRow className="SStable-header0">
            <WCol size="1">
                <WButton wType="texted" className='SS-header-section SS-header-button' hoverAnimation="lighten" onClick={ handleAddItem }>
                    <i className="material-icons">add_box</i>
                </WButton>
            </WCol>
            <WCol size="1">
                <WButton wType="texted" className={`${undoButtonStyle}`} onClick={handleUndo}  hoverAnimation={`${hoverUndo}`} >
                    <i className="material-icons">undo</i>
                </WButton>
            </WCol>
            <WCol size="1">
                <WButton wType="texted" className={`${redoButtonStyle}`} onClick={handleRedo} hoverAnimation={`${hoverRedo}`} >
                    <i className="material-icons">redo</i>
                </WButton>
            </WCol>
            <WCol size="1">
            </WCol>
            <WCol size="4">
                <WButton className='SS-header-section' wType="texted" >Region: {props.region ? props.region.name : "Nan"}</WButton>
            </WCol>
        </WRow>
        <WRow className="SStable-header">
            <WCol size="2">
                <WButton className='SS-header-section' wType="texted" onClick={()=>{props.subregions.length && handleSortRegions("name")}}>Name <i className="material-icons">arrow_downward</i></WButton>
            </WCol>

            <WCol size="2">
                <WButton className='SS-header-section' wType="texted" onClick={()=>{props.subregions.length && handleSortRegions("capital")}}>Capital <i className="material-icons">arrow_downward</i></WButton>
            </WCol>

            <WCol size="2">
                <WButton className='SS-header-section' wType="texted" onClick={()=>{props.subregions.length && handleSortRegions("leader")}}>Leader <i className="material-icons">arrow_downward</i></WButton>
            </WCol>

            <WCol size="2">
                <WButton className='SS-header-section' wType="texted" >Flag </WButton>
            </WCol>

            <WCol size="3">
                <WButton className='SS-header-section' wType="texted" >Landmarks </WButton>
            </WCol>
        </WRow>
        </>
    );
};

export default TableHeader;