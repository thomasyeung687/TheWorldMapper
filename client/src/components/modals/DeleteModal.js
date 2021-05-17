import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';
import WMFooter from 'wt-frontend/build/components/wmodal/WMFooter';

const DeleteModal = (props) => {

    let region = props.region;
    const handleDelete = async () => {
        props.delete(region, props.index);
        props.toggleShowDeleteRegion(!props.showDeleteRegion)
        props.refetchRegion();
    }

    return (
        <WModal className="delete-modal" cover="true" visible={props.showDeleteRegion}>
            <WMHeader  className="modal-header" onClose={() => props.toggleShowDeleteRegion(!props.showDeleteRegion)}>
                Delete {props.region.name}?
			</WMHeader >

            <WMMain >
                Are you sure you want to delete {props.region.name}? <br></br> All of its children subregions will be deleted as well!
            </WMMain>
            <WMFooter>
                <WButton className="modal-button cancel-button" onClick={() => props.toggleShowDeleteRegion(!props.showDeleteRegion)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
            </WMFooter>

        </WModal >
    );
}

export default DeleteModal;