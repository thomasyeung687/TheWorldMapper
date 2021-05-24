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
		getRegionById(_id: String!): Region
		getAllChildren(subregionIds: [String]): [Region]

		getAllRegionAbove(_id: String!): [Region]
		getAllLandmarks(_id: String!): [String]

		getAncestorRegions(_id: String!): [AncestorRegion]
	}
	extend type Mutation {
		addMap(map: RegionInput!): String
		deleteMap(_id: String!): Boolean
		updateMapName(_id: String!, value: String!): String

		addRegion(region: RegionInput!): Region
		deleteRegion(_id: String!, childID: String!): Region
		updateRegionField(_id: String!, field: String!, value: String!): Boolean
		
		updateSubregionArray(_id: String!, subregionsArr: [String]):Region
		updateRegionLandmarks(_id: String!, landmark: String!, opcode: String!, newLandmark: String!): Boolean
		updateRegionParent(_id: String!, parentId: String!): Boolean
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

	type AncestorRegion {
		_id: String!
		name: String!
	}
`;

module.exports = { typeDefs: typeDefs }