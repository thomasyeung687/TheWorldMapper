import React, { useState, useEffect } 	from 'react';
import MapsScreen       from '../maps/MapsScreen';
import SpreadSheet       from '../spreadsheet/SpreadSheet';
import RegionViewer 	from '../regionViewer/RegionViewer';
import Home 			from './Home';

//imports for navbar
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import NavbarOptions 					from '../navbar/NavbarOptions';
import ActiveRegionNav 					from '../navbar/activeRegionNav';
import AncestorRegionNav 				from '../navbar/ancestorRegions';
import Logo 							from '../navbar/Logo';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import CreateAccount 					from '../modals/CreateAccount';
import UpdateAccount 					from '../modals/UpdateAccount';

import { useQuery, useLazyQuery, useMutation} 	from '@apollo/client';
import * as mutations 					from '../../cache/mutations';
import * as queries 	from '../../cache/queries';
import { UpdateRegionField_Transaction, 
	UpdateRegionSubregions_Transaction, 
	ReorderItems_Transaction, 
	ChangeParentRegion_Transaction, 
	UpdateRegionLandmarks_Transaction, SortRegion_Transaction} 				from '../../utils/jsTPS';
import { isNetworkRequestInFlight } from '@apollo/client/core/networkStatus';
import WButton from 'wt-frontend/build/components/wbutton/WButton';

 
const Homescreen = (props) => {
	//for navbar
	const auth = props.user === null ? false : true;
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

	let maps = [];
	const [activeRegionId, setActiveRegionId] 		= useState(null);
	const [activeSSRegionId, setSSRegionId] 		= useState(null);
	const [subregionsArr, setSubregionsArr]   		= useState(null);
	const [activeAncestorRegions, setactiveAncestorRegions] = useState(null);
	const [numUndo, setNumUndo] 					= useState(0);
	const [numRedo, setNumRedo] 					= useState(0);

	const [DeleteMap] 			    = useMutation(mutations.DELETE_MAP);
    const [UpdateMapName] 			= useMutation(mutations.UPDATE_MAP_NAME);
	const [DeleteRegion] 			= useMutation(mutations.DELETE_REGION);
	const [AddRegion] 				= useMutation(mutations.ADD_REGION);
	const [UpdateRegionField]		= useMutation(mutations.UPDATE_REGION_FIELD);
	const [UpdateSubRegionsArray] 	= useMutation(mutations.UPDATE_SUBREGIONS_ARRAY);
	const [UpdateRegionLandmarks]	= useMutation(mutations.UPDATE_REGION_LANDMARKS);
	const [UpdateRegionParent] 		= useMutation(mutations.UPDATE_REGION_PARENT);


	//for navbar
	const { loading, error, data, refetch:refetchMaps } = useQuery(queries.GET_DB_MAPS);
	// if(loading) { console.log(loading, 'loading'); }
	// if(error) { console.log(error, 'error'); }
	if(data) {
        // if(props.maps.length === 0){
            maps = data.getAllMaps
        // } 
    }
	// if(!data){console.log("not dataMap")}

	const refetchRegions = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			maps = data.getAllMaps; // where is this defined?
			if (activeRegionId) {
				setActiveRegionId(activeRegionId);
			}
			if (activeSSRegionId) {
				setSSRegionId(activeSSRegionId);
			}
		}
	}

	const { loading:loadingAR, error:errorAR, data:dataAR, refetch:refetchAR } = useQuery(queries.GET_ANCESTOR_REGIONS, {skip: !activeRegionId, variables: {_id: activeRegionId}, fetchPolicy:"no-cache"});

	const refetchAncestorRegions = async (id) =>{
		const {data} = await refetchAR({variables: {_id: id}} );//activeRegionId gets passed in.
		console.log("refetched Ancestor Regions: ", data.getAncestorRegions, id);
		setactiveAncestorRegions(data.getAncestorRegions);
	}


	const deleteMap = async (_id) => {
		DeleteMap({ variables: { _id: _id }, refetchQueries: [{ query: queries.GET_DB_MAPS }] });
		refetchMaps();
        maps = data.getAllMaps;
	};

    const editMapName = async (_id, value) => {
        UpdateMapName({ variables: { _id: _id, value: value }, refetchQueries: [{ query: queries.GET_DB_MAPS }] });
        refetchMaps();
    }

	const tpsUndo = async () => {
		console.log("undoing");
		const retVal = await props.tps.undoTransaction();
		refetchRegions(refetchMaps)
		console.log(getUndoSize(), getRedoSize())
		return retVal;
	}

	const tpsRedo = async () => {
		console.log("redoing");
		const retVal = await props.tps.doTransaction();
		refetchRegions(refetchMaps)
		console.log(getUndoSize(), getRedoSize())
		return retVal;
	}

	const getUndoSize = () => {
		return props.tps.getUndoSize();
	}

	const getRedoSize = () => {
		return props.tps.getRedoSize();
	}

	const clearAllTransactions = () => {
		props.tps.clearAllTransactions();
	}

	const addRegion = async () => {
		console.log("createNewRegion")
		let newRegion = {
			_id: "",
			owner: props.user._id,
			name: "New Region",
			capital:"Capital",
			leader: "Leader",
			parentRegion: activeRegionId,
			subregions: [],
			landmarks:[]
		}
		console.log(newRegion);
		let transaction = new UpdateRegionSubregions_Transaction(newRegion.parentRegion,
			newRegion._id, newRegion, 1, AddRegion, DeleteRegion) 
		props.tps.addTransaction(transaction);
		await tpsRedo();
	};

	const deleteRegion = async (region, index) => { 
		let regionToDelete = {
			_id: region._id,
			owner: region.owner,
			name: region.name,
			capital: region.capital,
			leader: region.leader,
			parentRegion: region.parentRegion,
			subregions: region.subregions,
			landmarks: region.landmarks
		}
		let transaction = new UpdateRegionSubregions_Transaction(region.parentRegion,
			region._id, regionToDelete, 0, AddRegion, DeleteRegion, index) 
		props.tps.addTransaction(transaction);
		await tpsRedo();
	};

	const editRegion = async (_id, field, value, prev) => {
		console.log("update region")
		let transaction = new UpdateRegionField_Transaction(_id, field, prev, value, UpdateRegionField);
		props.tps.addTransaction(transaction);
		await tpsRedo();
	}

	const SortSubregions = async (sortingMethod, subregions) => {
		console.log("SortSubregions method sorting ",subregions, "by "+sortingMethod);

		let oldList = [];
		let newList = [];

		for(let i = 0; i < subregions.length; i++){
			let region = subregions[i];
			let newRegion = {_id: region._id,  name : region.name, capital : region.capital, leader : region.leader};
			oldList.push(newRegion);
			newList.push(newRegion);
		}


		let sortIncreasing = true;

		if (isSorted(subregions, sortingMethod)) {
		  sortIncreasing = false;
		}

		let compareFunction = createCompareFunction(sortIncreasing, sortingMethod);

		newList = newList.sort(compareFunction);

		console.log("newList", newList);
		console.log("oldList", oldList);

		let newListIDs = []
		let oldListIDs = []
		for(let i = 0; i < subregions.length; i++){
			newListIDs = newListIDs.concat(newList[i]._id)
			oldListIDs = oldListIDs.concat(oldList[i]._id)
		}

		// console.log(oldList);
		// console.log(newList);

		let transaction = new SortRegion_Transaction(activeRegionId+"", oldListIDs, newListIDs, UpdateSubRegionsArray);
		props.tps.addTransaction(transaction);
		await tpsRedo();
	}

	function isSorted(itemsToTest, sortingMethod) {
		for (let i = 0; i < itemsToTest.length - 1; i++) {
			if (itemsToTest[i][sortingMethod] > itemsToTest[i + 1][sortingMethod])
			return false;
		}
		return true;
	}

	const createCompareFunction = (isIncreasing, sortingMethod)=>{
		return function (item1, item2){
			let value1 = item1[sortingMethod];
			let value2 = item2[sortingMethod];
			if(value1 < value2){
				if(isIncreasing){
				return -1;
				}else{
					return 1;
				}
			}else if(value1 === value2){
				return 0;
			}else if(value1 > value2){
			if(isIncreasing){
				return 1;
				}else{
					return -1;
				}
			}
		}
	}
	
	const addDeleteEditLandmark = async (_id, landmark, opcode, newLandmark) => { // opcodes: 0 - delete, 1 - add 
		console.log("addLandmark")
		let transaction = new UpdateRegionLandmarks_Transaction(_id, landmark, opcode, UpdateRegionLandmarks, newLandmark);
		props.tps.addTransaction(transaction);
		await tpsRedo();
	}

	const changeParentRegion = async (_id, newParentId, oldParentId) => { 
		console.log("changeParentRegion")
		let transaction = new ChangeParentRegion_Transaction(_id, newParentId, oldParentId, UpdateRegionParent);
		props.tps.addTransaction(transaction);
		await tpsRedo();
	}

	const handleSetActiveMap = async (id) =>{
		console.log("handleSetActiveMap", id);
		
		let recentMap = maps.filter((map)=>{return map._id === id});
		let restMap = maps.filter((map)=>{return map._id !== id});

		let newMap = [...recentMap, ...restMap];
		console.log(newMap);
		maps = newMap;
		setActiveRegionId(recentMap[0]._id);
		await refetchAncestorRegions(id);
		clearAllTransactions()
	}
	const handleSetActiveRegion = async (id) =>{
		// console.log("handleSetActiveRegion", id);

		setActiveRegionId(id);
		await refetchAncestorRegions(id);
		clearAllTransactions()
	}
	const handleSetActiveSSRegion = (id) =>{
		// console.log("handleSetActiveSSRegion", id);

		setSSRegionId(id);
		clearAllTransactions()
	}
	const handleSetActiveAncestorRegion = async (id, ind) =>{
		console.log("handleSetActiveAncestorRegion", id)
		setActiveRegionId(id)
		setactiveAncestorRegions(activeAncestorRegions.splice(ind))
		setSSRegionId(null);
		setSubregionsArr(null);
		clearAllTransactions()
	}

	// console.log(maps);
	// console.log("active Region", activeRegionId);
	console.log(getUndoSize(), getRedoSize());

	return(
		<>
		<WLHeader>
				<WNavbar color="danger" style={{backgroundColor: "black"}}>
					<ul>
						<WNavItem >
							<Logo className='logo' 
							setActiveRegionId= {setActiveRegionId}//to go back to maps by setting active region to []
							setSSRegionId={setSSRegionId}
							clearAllTransactions={clearAllTransactions}
							setactiveAncestorRegions={setactiveAncestorRegions}
							/>
						</WNavItem>
					</ul>
					{
            			activeAncestorRegions ?
						<ul>
							<AncestorRegionNav
							setActiveRegionId = {setActiveRegionId}
								activeRegionId = {activeRegionId}
								setSSRegionId = {setSSRegionId}
								activeSSRegionId = {activeSSRegionId}
								subregionsArr = {subregionsArr}

								activeAncestorRegions = {activeAncestorRegions}
								handleSetActiveAncestorRegion={handleSetActiveAncestorRegion}
							/>
						</ul>
						:
						<></>
					}
					{
            			activeSSRegionId && subregionsArr ?
						<ul>
							<ActiveRegionNav
								activeSSRegionId = { activeSSRegionId}
								setSSRegionId = {setSSRegionId}
								subregionsArr = {subregionsArr}
							/>
						</ul>
						:
						<></>
					}
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth} 
							setShowCreate={setShowCreate} setShowLogin={setShowLogin} 
							// setActiveList={setActiveList}
							user={props.user}
							setShowUpdateProp={setShowUpdate}
							// refetchTodos={refetch}

							subregionsArr={subregionsArr}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
		<BrowserRouter>
			{auth && activeRegionId !== null && activeSSRegionId !== null ? <Redirect to="/regionViewer" /> : <Redirect to="/spreadsheet" />}
			{auth && activeRegionId !== null ? <Redirect to="/spreadsheet" /> : <Redirect to="/maps" />}
			{auth && activeRegionId === null ? <Redirect to="/maps" /> : <Redirect to="/spreadsheet" />}

			{/* {auth === false ? activeRegion !== null ? activeSSRegion !== null ? <Redirect to="/regionViewer" /> : <Redirect to="/spreadsheet" /> : <Redirect to="/maps" /> : <Redirect to={ {pathname: "/home"} } /> } */}
			
			{/* {auth && activeRegion === null ? <Redirect to="/regionViewer" /> : <Redirect to="/spreadsheet" />} */}
			{auth === false && <Redirect to={ {pathname: "/home"} } />}
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/home"} } />
				<Route path="/home" name="home" render={()=><Home/>} />
				<Route 
					path="/maps" 
					name="maps" 
					render={() => 
						<MapsScreen tps={props.tps} 
						fetchUser={props.fetchUser} user={props.user} 
						maps={maps}
						refetchMaps= {refetchMaps}
						deleteMap={deleteMap} editMapName={editMapName}
						setActiveRegionId={setActiveRegionId}
						handleSetActiveMap={handleSetActiveMap}
						
						/>
					} 
				/>
				<Route
					path="/spreadsheet" 
					name="spreadsheet" 
					render={() => 
						<SpreadSheet tps={props.tps} 
						addItem = {addRegion}
						fetchUser={props.fetchUser} user={props.user} 
						activeRegionId={activeRegionId}
						setActiveRegionId={handleSetActiveRegion}
						activeSSRegionId={activeSSRegionId} setSSRegionId={handleSetActiveSSRegion}
						deleteRegion = {deleteRegion}
						editRegion={editRegion}
						SortSubregions={SortSubregions}

						undo={tpsUndo} redo={tpsRedo}
						undoSize={getUndoSize} redoSize={getRedoSize}
						/>
					} 
				/>

				<Route
					path="/regionViewer" 
					name="regionViewer" 
					render={() => 
						<RegionViewer tps={props.tps} 
						fetchUser={props.fetchUser} user={props.user} 
						activeRegionId={activeRegionId}
						setActiveRegionId={setActiveRegionId}
						activeSSRegionId={activeSSRegionId} setSSRegionId={handleSetActiveSSRegion}
						setSubregionsArr={setSubregionsArr}

						addDeleteEditLandmark={addDeleteEditLandmark}
						changeParentRegion={changeParentRegion}

						undo={tpsUndo} redo={tpsRedo}
						undoSize={getUndoSize} redoSize={getRedoSize}
						/>
					} 
				/>
			</Switch>
		</BrowserRouter>
		{
			showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
		}

		{
			showLogin && (<Login fetchUser={props.fetchUser} 
				// refetchTodos={refetch}
				setShowLogin={setShowLogin} />)
		}

		{
			showUpdate && (<UpdateAccount fetchUser={props.fetchUser} 
				// refetchTodos={refetch} 
				setShowUpdate={setShowUpdate} 
				user = {props.user} />)
		}

		
		</>
	);
}

export default Homescreen;