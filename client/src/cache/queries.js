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

// export const GET_DB_TODOS = gql`
// 	query GetDBTodos {
// 		getAllTodos {
// 			_id
// 			id
// 			name
// 			owner
// 			items {
// 				_id
// 				id
// 				description
// 				due_date
// 				assigned_to
// 				completed
// 			}
// 		}
// 	}
// `;
