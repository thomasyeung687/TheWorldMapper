import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { ADD_MAP }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateNewMap = (props) => {
	const [input, setInput] = useState({ name: ''});
	const [loading, toggleLoading] = useState(false);
	const [AddMap] = useMutation(ADD_MAP);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleCreateNewMap = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('You must give a name to create a new Map');
				return;
			}
		}
		console.log(input.name,props.user);
		let newMap = {
			_id: "",
			name: input.name,
			owner: props.user._id,
			subregions: []
		}
		//const { data } = await AddMap({ variables: { map: newMap }, refetchQueries: [{ query: GET_DB_TODOS }] });
		const { data } = await AddMap({ variables: { map: newMap }});
		// const { loading, error, data } = await AddMap({ variables: { map: newMap } });
		// if (loading) { toggleLoading(true) };
		// if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);

            //here should call props.getMaps() or something to refetch maps
			props.refetchMaps()
			
            props.setShowCreateMap(false);
		};
	};

	console.log("rendering createnewmap modal")

	return (
		<WModal className="signup-modal"  cover="true" visible={props.setShowCreateMap}>
			<WMHeader  className="modal-header" onClose={() => props.setShowCreateMap(false)}>
				Create New Map
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="name" labelAnimation="up" 
								barAnimation="solid" labelText="Map Name" wType="outlined" inputType="text" 
							/>
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleCreateNewMap} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Submit
				</WButton>
			</WMFooter>
			
		</WModal>
	);
}

export default CreateNewMap;