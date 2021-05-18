import React, { useState } from 'react';
import { useQuery, useLazyQuery } 	from '@apollo/client';
import * as queries 	from '../../cache/queries';
import * as mutations 	from '../../cache/mutations';
import WInput from 'wt-frontend/build/components/winput/WInput';

const LandmarkEntry = (props) => {
    const [editLandmark, toggleEditLandmark] = useState(false);

    // console.log(props.landmark, props.landmarksArr, props.thisRegionslandmarks);

    const handleLandmarkEdit = async (e)=> {
        const value = e.target.value;
        if(props.landmark !== value){
            console.log("handleLandmarkEdit",value);
            await props.addDeleteEditLandmark(props.regionId, props.landmark, 2, value);// opcodes: 0 - delete, 1 - add, 2-edit
            await props.refetchSSRegion();
        }else{
            console.log("no change detected");
        }
        toggleEditLandmark(!editLandmark)
    }
    const handlelandmarkDelete = async () =>{
        console.log("delte Clicked", props.regionId)
        await props.addDeleteEditLandmark(props.regionId, props.landmark, 0, "");// opcodes: 0 - delete, 1 - add, 2-edit
        await props.refetchSSRegion();
    }
    return(
        <>
        {
            props.thisRegionslandmarks.includes(props.landmark) ?
            <div className="landmarkEntryEditable">
                <div className="delteLandmarkx" onClick={()=>{handlelandmarkDelete()}}>x</div>
                {editLandmark ?
                    <input
                            className='landmarkTextInput' onBlur={handleLandmarkEdit}
                            autoFocus={true} defaultValue={props.landmark} type='text'
                        />
                :
                    <div className="landmarkText" onClick={()=>{toggleEditLandmark(!editLandmark); console.log(editLandmark)}}>{props.landmark}</div>
                }
            </div>
            :
            <div className="landmarkEntryUnEditable">
                <div className="delteLandmarkx"></div>
                <div className="landmarkText">{props.landmark}</div>
            </div>
        }
        </>
    );
};

export default LandmarkEntry;