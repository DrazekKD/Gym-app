export function getArrayObjectFromFirbase (firabaseObject) {
	let ArrayObject = {};
		if(firabaseObject) {
			ArrayObject = Object.keys(firabaseObject).map(key => ({
				...firabaseObject[key],
				id: key
			}))
		}


	return ArrayObject
}
