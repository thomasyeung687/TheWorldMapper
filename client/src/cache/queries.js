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

export const GET_DB_MAP_BY_ID = gql`
	query GetDBMapById {
		getMapById {
			_id
			name
			owner
			subregions
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
