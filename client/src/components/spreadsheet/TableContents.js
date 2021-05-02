import React, { useState }        from 'react';
import TableEntry   from './TableEntry';
import DeleteModal from '../modals/DeleteModal'

const TableContents = (props) => {
    const [showDeleteRegion, toggleShowDeleteRegion] = useState(false)

    const setShowDeleteRegion = () =>{
        toggleShowDeleteRegion(!showDeleteRegion);
    }
    return (
        <>
        <div className=' SSMainContent'>
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
