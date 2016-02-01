export class FieldHasValueValueConverter {
  toView(arrayOfObjects, propertyName, filterIsOff) {
	if (filterIsOff) return arrayOfObjects;

	var finalObjects = [];
	arrayOfObjects.forEach(function(row) {
		if (row[propertyName]) finalObjects.push(row);
	});

	return finalObjects;
  }
}
