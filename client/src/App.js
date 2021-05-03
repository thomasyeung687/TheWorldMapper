import React, { useState, useEffect } 	from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import MapsScreen       from './components/maps/MapsScreen';
import SpreadSheet       from './components/spreadsheet/SpreadSheet';
import { useQuery, useLazyQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//imports for navbar
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import Logo 							from './components/navbar/Logo';
import NavbarOptions 					from './components/navbar/NavbarOptions';

import Login 							from './components/modals/Login';
import Delete 							from './components/modals/Delete';
import CreateAccount 					from './components/modals/CreateAccount';
import UpdateAccount 					from './components/modals/UpdateAccount';

 
const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
	
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);
	const [ getRegionById, { loading:rbiloading, data:rbiData } ] = useLazyQuery(queries.GET_DB_REGION_BY_ID);
	// const [ getRegionById ] = useLazyQuery(queries.GET_DB_REGION_BY_ID);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }

	//for navbar
	const auth = user === null ? false : true;
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);
	

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
		toggleShowUpdate(false);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
		toggleShowUpdate(false);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
		toggleShowUpdate(false);
	}

	const setShowUpdate = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(!showUpdate)
		toggleShowDelete(false);
		console.log("settingupdate", showUpdate)
	}
	//for navbar

	const [maps, setMaps] 						= useState([]);
	const [activeRegion, setActiveRegion] 		= useState(null);
	

	const handleSetActiveMap = async (id) => {
		const map = maps.find(map => map._id === id);
		// tps.clearAllTransactions();
		//get all subregions using subregions array in map
		console.log("handleSetActiveMap",map._id);
		await getRegionById({ variables: { _id: map._id } })
		// console.log(rbiData);
		// console.log("handleSetActiveMap",id)
		// console.log(map);
		let regionObj = null;
		if(rbiData) { 
			let { getRegionById } = rbiData;
			if(getRegionById !== null) { regionObj = getRegionById; }
		}
		
		console.log(rbiData);

		setActiveRegion(regionObj);
	};

	const handleSetActiveRegion = (id) => {
		const region = activeRegion.subregions.find(region => region._id === id);
		// tps.clearAllTransactions();
		//get all subregions using subregions array in map
		
		// console.log("handleSetActiveRegion",id)
		// console.log(region);

		setActiveRegion(region);
	};

	console.log(maps);
	console.log("active Region", activeRegion);

	return(
		<>
		<WLHeader>
				<WNavbar color="danger" style={{backgroundColor: "black"}}>
					<ul>
						<WNavItem >
							<Logo className='logo' 
							setActiveRegion= {setActiveRegion}//to go back to maps by setting active region to []
							/>
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={refetch} auth={auth} 
							setShowCreate={setShowCreate} setShowLogin={setShowLogin} 
							// setActiveList={setActiveList}
							user={user}
							setShowUpdateProp={setShowUpdate}
							// refetchTodos={refetch}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
		<BrowserRouter>
			{auth && activeRegion !== null ? <Redirect to="/spreadsheet" /> : <Redirect to="/maps" />}
			{auth && activeRegion === null ? <Redirect to="/maps" /> : <Redirect to="/spreadsheet" />}
			{auth === false && <Redirect to={ {pathname: "/home"} } />}
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/home"} } />
				
				<Route 
					path="/home" 
					name="home" 
					render={() => 
						<Homescreen tps={transactionStack} fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/maps" 
					name="maps" 
					render={() => 
						<MapsScreen tps={transactionStack} 
						fetchUser={refetch} user={user} 
						maps={maps} setMaps={setMaps} 
						handleSetActiveMap={handleSetActiveMap}/>
					} 
				/>
				<Route
					path="/spreadsheet" 
					name="spreadsheet" 
					render={() => 
						<SpreadSheet tps={transactionStack} 
						fetchUser={refetch} user={user} 
						activeRegion={activeRegion}
						handleSetActiveRegion={handleSetActiveRegion}/>
					} 
				/>
			</Switch>
		</BrowserRouter>
		{
			showCreate && (<CreateAccount fetchUser={refetch} setShowCreate={setShowCreate} />)
		}

		{
			showLogin && (<Login fetchUser={refetch} 
				// refetchTodos={refetch}
				setShowLogin={setShowLogin} />)
		}

		{
			showUpdate && (<UpdateAccount fetchUser={refetch} 
				// refetchTodos={refetch} 
				setShowUpdate={setShowUpdate} 
				user = {user} />)
		}

		
		</>
	);
}

export default App;