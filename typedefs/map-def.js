const { gql } = require('apollo-server');


const typeDefs = gql `
	type Region {
		_id: String!
		owner: String
		name: String!
		capital: String!
		leader: String!
		parentRegion: String
		subregions: [String]
		landmarks: [String]
	}
	type RegionWRegionObj {
		_id: String!
		owner: String
		name: String!
		capital: String!
		leader: String!
		parentRegion: String
		subregions: [Region]
		landmarks: [String]
	}
	extend type Query {
		getAllMaps: [Region]
		getRegionById(_id: String!): RegionWRegionObj
	}
	extend type Mutation {
		addMap(map: RegionInput!): String
		deleteMap(_id: String!): Boolean
		updateMapName(_id: String!, value: String!): String

		addRegion(region: RegionInput!): String
		deleteRegion(_id: String!): Boolean
	}
	
	input RegionInput {
		_id: String
		owner: String
		name: String
		capital: String
		leader: String
		parentRegion: String
		subregions: [String]
		landmarks: [String]
	}






	type Map {
		_id: String!
		name: String!
		owner: String!
		subregions: [String],
	}
	input MapInput {
		_id: String
		name: String
		owner: String
		subregions: [String],
	}
`;

module.exports = { typeDefs: typeDefs }