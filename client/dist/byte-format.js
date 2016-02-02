System.register([], function (_export) {
  'use strict';

  var ByteFormatValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      ByteFormatValueConverter = (function () {
        function ByteFormatValueConverter() {
          _classCallCheck(this, ByteFormatValueConverter);
        }

        _createClass(ByteFormatValueConverter, [{
          key: 'toView',
          value: function toView(bytes, decimals) {
            if (bytes == 0 || !bytes) return '0 Byte';
            var k = 1000;
            var dm = decimals + 1 || 3;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
          }
        }]);

        return ByteFormatValueConverter;
      })();

      _export('ByteFormatValueConverter', ByteFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ5dGUtZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFhLHdCQUF3Qjs7Ozs7Ozs7O0FBQXhCLDhCQUF3QjtpQkFBeEIsd0JBQXdCO2dDQUF4Qix3QkFBd0I7OztxQkFBeEIsd0JBQXdCOztpQkFDN0IsZ0JBQUMsS0FBSyxFQUFDLFFBQVEsRUFBRTtBQUNyQixnQkFBRyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sUUFBUSxDQUFDO0FBQ3pDLGdCQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDYixnQkFBSSxFQUFFLEdBQUcsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsZ0JBQUksS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RSxnQkFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRCxtQkFBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1dBQ2xFOzs7ZUFSVSx3QkFBd0IiLCJmaWxlIjoiYnl0ZS1mb3JtYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQnl0ZUZvcm1hdFZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KGJ5dGVzLGRlY2ltYWxzKSB7XG4gICAgaWYoYnl0ZXMgPT0gMCB8fCAhYnl0ZXMpIHJldHVybiAnMCBCeXRlJztcbiAgICB2YXIgayA9IDEwMDA7XG4gICAgdmFyIGRtID0gZGVjaW1hbHMgKyAxIHx8IDM7XG4gICAgdmFyIHNpemVzID0gWydCeXRlcycsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddO1xuICAgIHZhciBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZyhrKSk7XG4gICAgcmV0dXJuIChieXRlcyAvIE1hdGgucG93KGssIGkpKS50b1ByZWNpc2lvbihkbSkgKyAnICcgKyBzaXplc1tpXTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
