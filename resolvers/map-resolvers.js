const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of map objects on success, and an empty array on failure
		**/
		getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			console.log("getAllMaps:",req.userId)
			if(!_id) { 
				console.log("getAllMaps uid is null!");
				return([]);
			};
			const maps = await Region.find({owner: _id, parentRegion: null}); //maps are regions with a null parent
			if(maps) return (maps);
		},
		/** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getRegionById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const region = await Region.findOne({_id: objectId});
			if(region){
				// const subregionIds = region.subregions;
				// console.log(subregionIds);
				// const subregionsObjArr = []

				// const getData = async () => {
				// 	return Promise.all(
				// 		subregionIds.map(async (_rid) => {
				// 		const maps = await Region.findOne({_id: _rid});
				// 		console.log("a Map",maps);
				// 		const newMap = new Region({
				// 			_id: maps._id,
				// 			// id: id,
				// 			name: maps.name,
				// 			owner: maps.owner,
				// 			capital: maps.capital,
				// 			leader: maps.leader,
				// 			parentRegion: maps.parentRegion,
				// 			subregions: maps.subregions,
				// 			landmarks: maps.landmarks
				// 		});
				// 		subregionsObjArr.push(newMap)
				// 	}))
				// }
				// await getData();
				// console.log("subregionsObjArr",subregionsObjArr)
				// region["subregions"] = subregionsObjArr;
				// region["parentRegion"] = "";
				console.log("region", region)
				return region;
			}else return ({});
		},
	},
	Mutation: {
		/** 
		 	@param 	 {object} args - an empty todolist object
			@returns {string} the objectID of the todolist or an error message
		**/
		addMap: async (_, args) => {
			console.log("map-resolver");
			const { map } = args;
			const objectId = new ObjectId();
			const { name, owner, subregions, capital, leader, landmarks } = map;
			const newMap = new Region({
				_id: objectId,
				// id: id,
				name: name,
				owner: owner,
				capital: capital,
				leader: leader,
				parentRegion: null,
				subregions: subregions,
				landmarks: landmarks
			});
			const updated = await newMap.save();
			if(updated) return objectId;
			else return ('Could not add Map');
		},
		deleteMap: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		updateMapName: async (_, args) => {
			const { _id, value } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {name: value});
			if(updated) return value;
			else return "";
		},



		addRegion: async (_, args) => {
			console.log("addRegion-resolver");
			const { region } = args;
			const objectId = new ObjectId();
			const { name, owner, subregions, capital, leader, landmarks, parentRegion } = region;
			const newRegion = new Region({
				_id: objectId,
				// id: id,
				name: name,
				owner: owner,
				capital: capital,
				leader: leader,
				parentRegion: parentRegion,
				subregions: subregions,
				landmarks: landmarks
			});
			const updated = await newRegion.save();
			if(updated){
				const parent =  await Region.findOne({_id: parentRegion})
				if(parent){
					console.log("found parent", parent)
					console.log("Obj id", objectId)
					let subregions = parent.subregions;//adding subregionid to parent region in db
					console.log(subregions);
					subregions.push(objectId)
					console.log(subregions);
					const updated = await Region.updateOne({_id: parentRegion}, {subregions: subregions});
					if(updated){
						console.log("Sucessfully updated parent in backend")
						return "Sucessfully updated parent in backend";
					}else{
						console.log("Coundn't update parent Deleting region created")
						const deleted = Region.deleteOne({_id: objectId})
						return ("Coundn't update parent")
					}
				}else{
					console.log("Coundn't find parent Deleting region created")
					const deleted = Region.deleteOne({_id: objectId})
					return ("Coundn't find parent")
				}
			}else return ('Could not add Region');
		},
		deleteRegion: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
	}
}
