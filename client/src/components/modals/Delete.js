import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const Delete = (props) => {

    const handleDelete = async () => {
        props.deleteMap(props.mapId);
        props.setShowDeleteMap(false);
    }

    return (
        <WModal className="delete-modal" cover="true" visible={props.setShowDeleteMap}>
            <WMHeader  className="modal-header" onClose={() => props.setShowDeleteMap(false)}>
                Delete Map?
			</WMHeader >

            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDeleteMap(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
            </WMMain>

        </WModal >
    );
}

export default Delete;