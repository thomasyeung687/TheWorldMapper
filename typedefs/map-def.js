const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map {
		_id: String!
		name: String!
		owner: String!
		subregions: [String],
	}
	type Region {
		_id: String!
		id: Int
		name: String!
		capital: String!
		leader: String!
		flag: String!
		landmarks: [String]
		regions: [String]
	}
	extend type Query {
		getAllMaps: [Map]
		getMapById(_id: String!): Map 
	}
	extend type Mutation {
		addMap(map: MapInput!): String
		deleteMap(_id: String!): Boolean
		updateMapName(_id: String!, value: String!): String
	}
	input MapInput {
		_id: String
		name: String
		owner: String
		subregions: [String],
	}
	
	input RegionInput {
		_id: String
		id: Int
		name: String
		capital: String
		leader: String
		flag: String
		landmarks: [String]
		regions: [String]
	}
`;

module.exports = { typeDefs: typeDefs }