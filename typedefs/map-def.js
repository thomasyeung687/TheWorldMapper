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
		name: String!
		capital: String!
		leader: String!
		parentRegion: String!
		landmarks: [String]
		subregions: [String]
	}
	extend type Query {
		getAllMaps: [Map]
		getMapById(_id: String!): Map 
		getRegionById(_id: String!): Region
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
		name: String
		capital: String
		leader: String
		parentRegion: String
		landmarks: [String]
		subregions: [String]
	}
`;

module.exports = { typeDefs: typeDefs }