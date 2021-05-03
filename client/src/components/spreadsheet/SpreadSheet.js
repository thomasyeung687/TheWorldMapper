import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';

import * as mutations from '../../cache/mutations';
import { useMutation } from '@apollo/client';

const MainContents = (props) => {
    // console.log("activeRegion", props.activeRegion);
    const [AddRegion] = useMutation(mutations.ADD_REGION);

    const createNewRegion = async () => {
        console.log("createNewRegion")
        let newRegion = {
			_id: "",
			owner: props.user._id,
			name: "New Region",
			capital:"Capital",
			leader: "Leader",
			parentRegion: props.activeRegion._id,
			subregions: [],
			landmarks:[]
		}
		//const { data } = await AddMap({ variables: { map: newMap }, refetchQueries: [{ query: GET_DB_TODOS }] });
		const { data } = await AddRegion({ variables: { region: newRegion }});
        console.log(data);
    }
    return (
        <div className='mainContainer'>
            <div className='SSContainer' >
                <TableHeader
                    addItem={createNewRegion}
                    setShowDelete={props.setShowDelete} setActiveList={props.setActiveList}
                />
                <TableContents
                />
            </div>
        </div>
    );
};

export default MainContents;