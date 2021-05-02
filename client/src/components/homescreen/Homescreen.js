import React, { useState, useEffect } 	from 'react';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import MainContents 					from '../main/MainContents';
import SidebarContents 					from '../maps/SidebarContents';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import CreateAccount 					from '../modals/CreateAccount';
import UpdateAccount 					from '../modals/UpdateAccount';
import { GET_DB_TODOS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateListField_Transaction, 
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction } 				from '../../utils/jsTPS';
import WInput from 'wt-frontend/build/components/winput/WInput';

import TheWorldMapper from '../../Images/TheWorldMapper.png'


const Homescreen = (props) => {

	let todolists 							= [];
	const [activeList, setActiveList] 		= useState({});
	// const [showDelete, toggleShowDelete] 	= useState(false);
	// const [showLogin, toggleShowLogin] 		= useState(false);
	// const [showCreate, toggleShowCreate] 	= useState(false);
	// const [showUpdate, toggleShowUpdate] 	= useState(false);

	// const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS);
	// const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD);
	// const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD);
	// const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);
	// const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM);
	// const [AddMap] 					= useMutation(mutations.ADD_MAP);
	// const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM);


	// const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);
	// if(loading) { console.log(loading, 'loading'); }
	// if(error) { console.log(error, 'error'); }
	// if(data) { todolists = data.getAllTodos; }

	// const auth = props.user === null ? false : true;

	// // console.log("homescreen",props.user);

	// const refetchTodos = async (refetch) => {
	// 	const { loading, error, data } = await refetch();
	// 	if (data) {
	// 		todolists = data.getAllTodos;
	// 		if (activeList._id) {
	// 			let tempID = activeList._id;
	// 			let list = todolists.find(list => list._id === tempID);
	// 			setActiveList(list);
	// 		}
	// 	}
	// }

	// const tpsUndo = async () => {
	// 	const retVal = await props.tps.undoTransaction();
	// 	refetchTodos(refetch);
	// 	return retVal;
	// }

	// const tpsRedo = async () => {
	// 	const retVal = await props.tps.doTransaction();
	// 	refetchTodos(refetch);
	// 	return retVal;
	// }


	// // Creates a default item and passes it to the backend resolver.
	// // The return id is assigned to the item, and the item is appended
	// //  to the local cache copy of the active todolist. 
	// const addItem = async () => {
	// 	let list = activeList;
	// 	const items = list.items;
	// 	const lastID = items.length >= 1 ? items[items.length - 1].id + 1 : 0;
	// 	const newItem = {
	// 		_id: '',
	// 		id: lastID,
	// 		description: 'No Description',
	// 		due_date: 'No Date',
	// 		assigned_to: props.user._id,
	// 		completed: false
	// 	};
	// 	let opcode = 1;
	// 	let itemID = newItem._id;
	// 	let listID = activeList._id;
	// 	let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();
	// };


	// const deleteItem = async (item, index) => {
	// 	let listID = activeList._id;
	// 	let itemID = item._id;
	// 	let opcode = 0;
	// 	let itemToDelete = {
	// 		_id: item._id,
	// 		id: item.id,
	// 		description: item.description,
	// 		due_date: item.due_date,
	// 		assigned_to: item.assigned_to,
	// 		completed: item.completed
	// 	}
	// 	let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();
	// };

	// const editItem = async (itemID, field, value, prev) => {
	// 	let flag = 0;
	// 	if (field === 'completed') flag = 1;
	// 	let listID = activeList._id;
	// 	let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, flag, UpdateTodoItemField);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const reorderItem = async (itemID, dir) => {
	// 	let listID = activeList._id;
	// 	let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const createNewList = async () => {
	// 	const length = todolists.length
	// 	const id = length >= 1 ? todolists[length - 1].id + Math.floor((Math.random() * 100) + 1) : 1;
	// 	let list = {
	// 		_id: '',
	// 		id: id,
	// 		name: 'Untitled',
	// 		owner: props.user._id,
	// 		items: [],
	// 	}
	// 	const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_TODOS }] });
	// 	await refetchTodos(refetch);
	// 	if(data) {
	// 		let _id = data.addTodolist;
	// 		handleSetActive(_id);
	// 	}
	// };

	// const deleteList = async (_id) => {
	// 	DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_TODOS }] });
	// 	refetch();
	// 	setActiveList({});
	// };

	// const updateListField = async (_id, field, value, prev) => {
	// 	let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateTodolistField);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const handleSetActive = (id) => {
	// 	const todo = todolists.find(todo => todo.id === id || todo._id === id);
	// 	setActiveList(todo);
	// };

	
	/*
		Since we only have 3 modals, this sort of hardcoding isnt an issue, if there
		were more it would probably make sense to make a general modal component, and
		a modal manager that handles which to show.
	*/
	// const setShowLogin = () => {
	// 	toggleShowDelete(false);
	// 	toggleShowCreate(false);
	// 	toggleShowLogin(!showLogin);
	// 	toggleShowUpdate(false);
	// };

	// const setShowCreate = () => {
	// 	toggleShowDelete(false);
	// 	toggleShowLogin(false);
	// 	toggleShowCreate(!showCreate);
	// 	toggleShowUpdate(false);
	// };

	// const setShowDelete = () => {
	// 	toggleShowCreate(false);
	// 	toggleShowLogin(false);
	// 	toggleShowDelete(!showDelete)
	// 	toggleShowUpdate(false);
	// }

	// const setShowUpdate = () => {
	// 	toggleShowCreate(false);
	// 	toggleShowLogin(false);
	// 	toggleShowUpdate(!showUpdate)
	// 	toggleShowDelete(false);
	// 	console.log("settingupdate", showUpdate)
	// }

	console.log("homescreen")
	
	return (
		<WLMain>
			<div className="container-secondary TheWorldMapperImContainer">
				<img className="TheWorldMapperImg" src={TheWorldMapper} alt="TheWorldMapper" />;
			</div>
		</WLMain>
	);
};

export default Homescreen;
