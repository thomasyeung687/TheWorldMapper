import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			firstName
			lastName
			password
			initials
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			email
			password
			firstName
			lastName
		}
	}
`;

export const UPDATE = gql`
	mutation Update($_id: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		update(_id: $_id, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			email
			password
			firstName
			lastName
		}
	}
`;


export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const ADD_ITEM = gql`
	mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
	  	addItem(item: $item, _id: $_id, index: $index)
	}
`;

export const DELETE_ITEM = gql`
	mutation DeleteItem($itemId: String!, $_id: String!) {
		deleteItem(itemId: $itemId, _id: $_id) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const UPDATE_ITEM_FIELD = gql`
	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!, $flag: Int!) {
		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const REORDER_ITEMS = gql`
	mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
		reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const ADD_MAP = gql`
	mutation AddMap($map: RegionInput!) {
		addMap(map: $map) 
	}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!) {
		deleteMap(_id: $_id)
	}
`;

export const UPDATE_MAP_NAME = gql`
	mutation UpdateMapName($_id: String!, $value: String!) {
		updateMapName(_id: $_id, value: $value)
	}
`;




export const ADD_REGION = gql`
	mutation AddRegion($region: RegionInput!) {
		addRegion(region: $region) {
			_id
			owner
			name
			capital
			leader
			parentRegion
			subregions
			landmarks
		}
	}
`;

export const DELETE_REGION = gql`
	mutation DeleteRegion($_id: String!, $childID: String!) {
		deleteRegion(_id: $_id, childID: $childID){
			_id
			owner
			name
			capital
			leader
			parentRegion
			subregions
			landmarks
		}
	}
`;

export const UPDATE_REGION_FIELD = gql`
	mutation UpdateRegionField($_id: String!, $field: String!, $value: String!) {
		updateRegionField(_id: $_id, field: $field, value: $value)
	}
`;

export const UPDATE_SUBREGIONS_ARRAY = gql`
	mutation UpdateSubregionArray($_id: String!, $subregionsArr: [String]) {
		updateSubregionArray(_id: $_id, subregionsArr: $subregionsArr){
			_id
			owner
			name
			capital
			leader
			parentRegion
			subregions
			landmarks
		}
	}
`;

// export const UPDATE_REGION_FIELD = gql`
// 	mutation UpdateRegionField($_id: String!, $value: String!) {
// 		updateRegionField(_id: $_id, value: $value)
// 	}
// `;