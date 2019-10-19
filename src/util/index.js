export const getArrayObjectFromFirebase = firebaseObject=>{
	let ArrayObject = {};
		if(firebaseObject) {
			ArrayObject = Object.keys(firebaseObject).map(key => ({
				...firebaseObject[key],
				id: key
			}))
		}
	return ArrayObject
}


