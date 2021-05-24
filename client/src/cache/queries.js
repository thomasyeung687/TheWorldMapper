import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			firstName
			lastName
			email
		}
	}
`;

export const GET_DB_MAPS = gql`
	query GetDBMaps {
		getAllMaps {
			_id
			name
			owner
			subregions
		}
	}
`;

// export const GET_DB_REGION_BY_ID = gql`
// 	query GetDBRegionpById($_id: String!) {
// 		getRegionById(_id: $_id) 
// 	}
// `;

export const GET_DB_REGION_BY_ID = gql`
	query GetDBRegionpById($_id: String!) {
		getRegionById(_id: $_id) {
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

export const GET_ALL_CHILDREN_REGIONS = gql`
	query GetAllChildren($subregionIds: [String]) {
		getAllChildren(subregionIds: $subregionIds) {
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

export const GET_ALL_REGION_ABOVE = gql`
	query GetAllRegionAbove($_id: String!) {
		getAllRegionAbove(_id: $_id) {
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

export const GET_ALL_LANDMARKS = gql`
	query GetAllLandmarks($_id: String!) {
		getAllLandmarks(_id: $_id)
	}
`;


export const GET_ANCESTOR_REGIONS = gql`
	query GetAncestorRegions($_id: String!) {
		getAncestorRegions(_id: $_id){
			_id
			name
		}
	}
`;
