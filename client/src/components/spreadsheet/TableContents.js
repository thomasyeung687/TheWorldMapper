import React, { useState }        from 'react';
import TableEntry   from './TableEntry';
import DeleteModal from '../modals/DeleteModal'

const TableContents = (props) => {
    const [showDeleteRegion, toggleShowDeleteRegion] = useState(false)

    const setShowDeleteRegion = () =>{
        toggleShowDeleteRegion(!showDeleteRegion);
    }
    console.log(props.activeRegion);
    return (
        <>
        <div className=' SSMainContent'>
            
            {
                props.activeRegion ?
                props.activeRegion.subregions.map((_id, index) => (
                    <TableEntry
                        index={index}
                        num = {index}
                        // indOfLastEntry = {indOfLastEntry}
                        _id={_id}
                        activeRegion= {props.activeRegion}
                        setActiveRegion={props.setActiveRegion}
                        activeSSRegion={props.activeSSRegion} setSSRegion={props.setSSRegion}
                        // deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        // editItem={props.editItem}
                    />
                ))
                :
                <div></div>
            }
        </div>
        {
			showDeleteRegion && (<DeleteModal  
				//  refetchTodos={refetch} 
                deleteMsg ={"Delete Region?"}
                Id={props._id}
				setShowDelete={setShowDeleteRegion} 
                delete = {props.deleteMap}
				 />)
		}
        </>
    );
};

export default TableContents;
