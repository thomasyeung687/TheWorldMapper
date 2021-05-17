import React, { useState, useEffect}        from 'react';
import TableEntry   from './TableEntry';
import {useQuery} from '@apollo/client';
import {GET_DB_REGION_BY_ID} from '../../cache/queries'

const TableContents = (props) => {
    const [showDeleteRegion, toggleShowDeleteRegion] = useState(false)
    const [editTracker, setEditTracker] = useState([])// [i, c] //where i is the index of the item currently being editted and c is the column (0=name, 1=capital, 2= leader).

    const setShowDeleteRegion = () =>{
        toggleShowDeleteRegion(!showDeleteRegion);
    }
    
    let region = props.region;
    let subregions = props.subregions;
    // region.subregion.map(map=>{
    const updateEditTracker = (arr) =>{
        const newArr = arr
        setEditTracker(newArr);
    }
    // })
    
    useEffect(() => {
        function keydownChecker(e) {
            if(e.key === 'ArrowLeft'){//left
                console.log("left Pressed")
                if(editTracker !== []){
                    if(editTracker[1] !== 0){
                        const newArr = [editTracker[0], editTracker[1]-1]
                        updateEditTracker(newArr); //will make the column next to it editable.
                    }
                }
            }else if(e.key === 'ArrowUp'){//up
                console.log("up Pressed")
                if(editTracker !== []){
                    if(editTracker[0] !== 0){
                        const newArr = [editTracker[0]-1, editTracker[1]]
                        updateEditTracker(newArr); //will make the row above it editable.
                    }
                }
            }else if(e.key === 'ArrowRight'){//right
                console.log("right Pressed")
                if(editTracker !== []){
                    if(editTracker[1] !== 2){
                        const newArr = [editTracker[0], editTracker[1]+1]
                        updateEditTracker(newArr); //will make the column next to it editable.
                    }
                }
            }else if(e.key === 'ArrowDown'){//down
                console.log("down Pressed")
                if(editTracker !== []){
                    if(editTracker[0] !== region.subregions.length -1 ){
                        console.log("ArrowDown");
                        const newArr = [editTracker[0]+1, editTracker[1]]
                        updateEditTracker(newArr); //will make the row below it editable.
                    }
                }
            }
        }
        window.addEventListener('keydown', keydownChecker);
        return () => window.removeEventListener('keydown', keydownChecker);
    });
    console.log("editTracker",editTracker);

    // function mapSubregions(){
    //     if(subregions){
    //         subregions.map((thisRegion, index) => {
    //             // let editLeader = false;
    //             // let editName = false;
    //             // let editCapital = false;
    //             // if(editTracker && editTracker[0] === index){
    //             //     if(editTracker[1] === 0){
    //             //         editName = true;
    //             //     }else if(editTracker[1] === 1){
    //             //         editCapital = true;
    //             //     }else if(editTracker[1] === 2){
    //             //         editLeader = true;
    //             //     }
    //             //     console.log(index, editName, editCapital, editLeader)
    //             // }
    //             return (
    //             <TableEntry
    //                 index={index}
    //                 // key = {editTracker}
    //                 // indOfLastEntry = {indOfLastEntry}
    //                 thisRegion = {thisRegion}
    //                 activeRegion= {region}
    //                 activeRegionId={props.activeRegionId}
    //                 setActiveRegionId={props.setActiveRegionId}
    //                 activeSSRegionId={props.activeSSRegionId} setSSRegionId={props.setSSRegionId}
    //                 deleteRegion = {props.deleteRegion}
    //                 editRegion={props.editRegion}

    //                 // editLeaderBool = {editLeader}
    //                 // editNameBool = {editName}
    //                 // editCapitalBool = {editCapital}

    //                 editTracker = {editTracker}
    //                 updateEditTracker={updateEditTracker}

    //                 refetchRegion = {props.refetchRegion}
    //                 refetchChildrenFunc = {props.refetchChildrenFunc}
    //                 // deleteItem={props.deleteItem} reorderItem={props.reorderItem}
    //                 // editItem={props.editItem}
    //             />
    //         )})
    //     }else{
    //         return (<div></div>)
    //     }
    // }

    return (
        <>
        <div className=' SSMainContent'>
            
            {
                subregions ?
                subregions.map((thisRegion, index) => {
                    let key = true;
                    // let editLeader = false;
                    // let editName = false;
                    // let editCapital = false;
                    // if(editTracker && editTracker[0] === index){
                    //     if(editTracker[1] === 0){
                    //         editName = true;
                    //     }else if(editTracker[1] === 1){
                    //         editCapital = true;
                    //     }else if(editTracker[1] === 2){
                    //         editLeader = true;
                    //     }
                    //     console.log(index, editName, editCapital, editLeader)
                    // }
                    if(editTracker && editTracker[0] === index){
                        key = false;
                    }
                    return (
                    <TableEntry
                        index={index}
                        // key = {editTracker}
                        // indOfLastEntry = {indOfLastEntry}
                        thisRegion = {thisRegion}
                        activeRegion= {region}
                        activeRegionId={props.activeRegionId}
                        setActiveRegionId={props.setActiveRegionId}
                        activeSSRegionId={props.activeSSRegionId} setSSRegionId={props.setSSRegionId}
                        deleteRegion = {props.deleteRegion}
                        editRegion={props.editRegion}

                        // editLeaderBool = {editLeader}
                        // editNameBool = {editName}
                        // editCapitalBool = {editCapital}

                        editTracker = {editTracker}
                        updateEditTracker={updateEditTracker}

                        refetchRegion = {props.refetchRegion}
                        refetchChildrenFunc = {props.refetchChildrenFunc}
                        // deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        // editItem={props.editItem}
                    />
                )}
                )
                :
                <div></div>
                // mapSubregions()
            }
        </div>
        </>
    );
};

export default TableContents;
