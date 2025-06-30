"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } 
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({addComponents}) => {
  addComponents({
    '.accordion-item': {
			'display': 'flex',
			'flex-direction': 'column',
		},
		'.accordion-toggle': {
			'display': 'flex',
			'flex-grow': '1',
			'align-items': 'center',
			'text-align': 'start',
			'justify-content': 'space-between',
		},
		'.accordion-content': {
			'transition': 'height 300ms ease',
			'overflow': 'hidden',
			'.accordion.active &': {
				'display': 'block',
				'transition': 'height 300ms ease'
			}
		}
  });   
}); /* v7-e3c66f78d8fa8c24 */