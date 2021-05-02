import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';

const MainContents = (props) => {
    return (
        <div className='mainContainer'>
            <div className='SSContainer' >
                <TableHeader
                    addItem={props.addItem}
                    setShowDelete={props.setShowDelete} setActiveList={props.setActiveList}
                />
                <TableContents
                />
            </div>
        </div>
    );
};

export default MainContents;