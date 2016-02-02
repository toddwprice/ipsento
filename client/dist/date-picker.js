System.register(['aurelia-framework', 'moment'], function (_export) {
    'use strict';

    var inject, customElement, bindable, moment, DatePicker;

    var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            customElement = _aureliaFramework.customElement;
            bindable = _aureliaFramework.bindable;
        }, function (_moment) {
            moment = _moment['default'];
        }],
        execute: function () {
            DatePicker = (function () {
                var _instanceInitializers = {};
                var _instanceInitializers = {};

                _createDecoratedClass(DatePicker, [{
                    key: 'format',
                    decorators: [bindable],
                    initializer: function initializer() {
                        return "DD/MM/YY";
                    },
                    enumerable: true
                }], null, _instanceInitializers);

                function DatePicker(element) {
                    _classCallCheck(this, _DatePicker);

                    _defineDecoratedPropertyDescriptor(this, 'format', _instanceInitializers);

                    this.element = element;
                }

                _createDecoratedClass(DatePicker, [{
                    key: 'attached',
                    value: function attached() {
                        this.datepicker = $(this.element).find('input');
                        this.datepicker.val(this.value);
                    }
                }], null, _instanceInitializers);

                var _DatePicker = DatePicker;
                DatePicker = bindable("value")(DatePicker) || DatePicker;
                DatePicker = inject(Element)(DatePicker) || DatePicker;
                return DatePicker;
            })();

            _export('DatePicker', DatePicker);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGUtcGlja2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpREFPYSxVQUFVOzs7Ozs7Ozs7O3VDQVBmLE1BQU07OENBQUUsYUFBYTt5Q0FBRSxRQUFROzs7OztBQU8xQixzQkFBVTs7OztzQ0FBVixVQUFVOztpQ0FFbEIsUUFBUTs7K0JBQVUsVUFBVTs7Ozs7QUFFbEIseUJBSkYsVUFBVSxDQUlQLE9BQU8sRUFBRTs7Ozs7QUFDakIsd0JBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2lCQUMxQjs7c0NBTlEsVUFBVTs7MkJBUVgsb0JBQUc7QUFDVCw0QkFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoRCw0QkFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQVdqQzs7O2tDQXJCUSxVQUFVO0FBQVYsMEJBQVUsR0FEdEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUNMLFVBQVUsS0FBVixVQUFVO0FBQVYsMEJBQVUsR0FGdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUVILFVBQVUsS0FBVixVQUFVO3VCQUFWLFVBQVUiLCJmaWxlIjoiZGF0ZS1waWNrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50Jztcbi8vIGltcG9ydCB7cGlrYWRheX0gZnJvbSAnZGJ1c2hlbGwvcGlrYWRheSc7XG4vLyBpbXBvcnQgJ2RidXNoZWxsL3Bpa2FkYXkvY3NzL3Bpa2FkYXkuY3NzISc7XG5cbkBpbmplY3QoRWxlbWVudClcbkBiaW5kYWJsZShcInZhbHVlXCIpXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlciB7XG5cbiAgICBAYmluZGFibGUgZm9ybWF0ID0gXCJERC9NTS9ZWVwiO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIGF0dGFjaGVkKCkge1xuICAgICAgdGhpcy5kYXRlcGlja2VyID0gJCh0aGlzLmVsZW1lbnQpLmZpbmQoJ2lucHV0Jyk7XG4gICAgICB0aGlzLmRhdGVwaWNrZXIudmFsKHRoaXMudmFsdWUpO1xuICAgICAgICAvLyB0aGlzLmRhdGVQaWNrZXIgPSAkKHRoaXMuZWxlbWVudCkuZmluZCgnLmlucHV0LWdyb3VwLmRhdGUnKVxuICAgICAgICAvLyAgICAgLmRhdGV0aW1lcGlja2VyKHtcbiAgICAgICAgLy8gICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAvLyAgICAgICAgIHNob3dDbG9zZTogdHJ1ZSxcbiAgICAgICAgLy8gICAgICAgICBzaG93VG9kYXlCdXR0b246IHRydWVcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyB0aGlzLmRhdGVQaWNrZXIub24oXCJkcC5jaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgLy8gICAgIHRoaXMudmFsdWUgPSBtb21lbnQoZS5kYXRlKS5mb3JtYXQodGhpcy5mb3JtYXQpO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
