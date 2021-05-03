import React, { useState }  from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';
import Delete                        from '../../components/modals/Delete';

import trash            from '../../Images/Trash.png'

const SidebarEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);

    const [showDeleteMap, toggleShowDeleteMap] 	= useState(false);
    const setShowDeleteMap = () => {
		toggleShowDeleteMap(!showDeleteMap);
		console.log("showDeleteMap map")
	}

    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.editMapName(props._id, value)
    };
    // console.log("me",props._id)
    // const entryStyle = props.id === props.activeid ? 'list-item list-item-active' : 'list-item ';
    const entryStyle = 'mapEntryContainer ';
    return (
        <>
        <WNavItem 
            className={entryStyle} onDoubleClick={handleEditing} 
            onClick={() => { console.log("entry clicked"); props.handleSetActiveMap(props._id) }} hoverAnimation="lighten"
        >
            {
                editing ? <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" barAnimation="solid" name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} />
                    :   
                    <>
                    <div className="MapEntryContentWrapper">
                        <div className='list-text'>
                            {props.name}
                        </div>
                        <WButton className='mapEntryTrashContainer' wType="texted" onClick={()=>{setShowDeleteMap(); }}>
                            <img className="mapEntryTrashImg" src={trash} alt="trash" />
                        </WButton>
                    </div>
                    </>
            }
        </WNavItem>

        {
			showDeleteMap && (<Delete  
				//  refetchTodos={refetch} 
                mapId={props._id}
				setShowDeleteMap={setShowDeleteMap} 
                deleteMap = {props.deleteMap}
				 />)
		}
        </>
    );
};

export default SidebarEntry;