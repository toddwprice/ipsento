System.register([], function (_export) {
	"use strict";

	var FieldHasValueValueConverter;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	return {
		setters: [],
		execute: function () {
			FieldHasValueValueConverter = (function () {
				function FieldHasValueValueConverter() {
					_classCallCheck(this, FieldHasValueValueConverter);
				}

				_createClass(FieldHasValueValueConverter, [{
					key: "toView",
					value: function toView(arrayOfObjects, propertyName, filterIsOff) {
						if (filterIsOff) return arrayOfObjects;

						var finalObjects = [];
						arrayOfObjects.forEach(function (row) {
							if (row[propertyName]) finalObjects.push(row);
						});

						return finalObjects;
					}
				}]);

				return FieldHasValueValueConverter;
			})();

			_export("FieldHasValueValueConverter", FieldHasValueValueConverter);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpZWxkSGFzVmFsdWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0tBQWEsMkJBQTJCOzs7Ozs7Ozs7QUFBM0IsOEJBQTJCO2FBQTNCLDJCQUEyQjsyQkFBM0IsMkJBQTJCOzs7aUJBQTNCLDJCQUEyQjs7WUFDaEMsZ0JBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUU7QUFDbkQsVUFBSSxXQUFXLEVBQUUsT0FBTyxjQUFjLENBQUM7O0FBRXZDLFVBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0QixvQkFBYyxDQUFDLE9BQU8sQ0FBQyxVQUFTLEdBQUcsRUFBRTtBQUNwQyxXQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQzlDLENBQUMsQ0FBQzs7QUFFSCxhQUFPLFlBQVksQ0FBQztNQUNsQjs7O1dBVlUsMkJBQTJCIiwiZmlsZSI6ImZpZWxkSGFzVmFsdWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRmllbGRIYXNWYWx1ZVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KGFycmF5T2ZPYmplY3RzLCBwcm9wZXJ0eU5hbWUsIGZpbHRlcklzT2ZmKSB7XG5cdGlmIChmaWx0ZXJJc09mZikgcmV0dXJuIGFycmF5T2ZPYmplY3RzO1xuXG5cdHZhciBmaW5hbE9iamVjdHMgPSBbXTtcblx0YXJyYXlPZk9iamVjdHMuZm9yRWFjaChmdW5jdGlvbihyb3cpIHtcblx0XHRpZiAocm93W3Byb3BlcnR5TmFtZV0pIGZpbmFsT2JqZWN0cy5wdXNoKHJvdyk7XG5cdH0pO1xuXG5cdHJldHVybiBmaW5hbE9iamVjdHM7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
