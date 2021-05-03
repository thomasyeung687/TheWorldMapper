import React from 'react';



import { WButton, WRow, WCol } from 'wt-frontend';

const TableHeader = (props) => {

    // const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const clickDisabled = () => { };

    return (
        <>
        <WRow className="SStable-header0">
            <WCol size="1">
                <WButton wType="texted" className='SS-header-section SS-header-button' hoverAnimation="lighten" onClick={ props.addItem }>
                    <i className="material-icons">add_box</i>
                </WButton>
            </WCol>

            <WCol size="1">
                <WButton wType="texted" className='SS-header-section SS-header-button' hoverAnimation="lighten" onClick={()=>{console.log("undo clicked")} }>
                    <i className="material-icons">undo</i>
                </WButton>
            </WCol>

            <WCol size="1">
                <WButton wType="texted" className='SS-header-section SS-header-button' hoverAnimation="lighten" onClick={()=>{console.log("redo clicked")} }>
                    <i className="material-icons">redo</i>
                </WButton>
            </WCol>
            <WCol size="1">
            </WCol>
            <WCol size="4">
                <WButton className='SS-header-section' wType="texted" >Region: North America</WButton>
            </WCol>
        </WRow>
        <WRow className="SStable-header">
            <WCol size="2">
                <WButton className='SS-header-section' wType="texted" >Name</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='SS-header-section' wType="texted">Capital</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='SS-header-section' wType="texted" >Leader</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='SS-header-section' wType="texted" >Flag</WButton>
            </WCol>

            <WCol size="4">
                <WButton className='SS-header-section' wType="texted" >Landmarks</WButton>
            </WCol>
        </WRow>
        </>
    );
};

export default TableHeader;