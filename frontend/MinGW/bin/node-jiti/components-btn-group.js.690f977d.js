"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } 
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({addComponents}) => {
	addComponents({
		'.btn-group': {
			'display': 'flex',
			'align-items': 'stretch',
			'.btn + .btn': {
				'border-top-inline-start-radius': '0', 
				'border-bottom-inline-start-radius': '0',
				'border-inline-start': '0'
			},
			'.btn:has(+ .btn)': {
				'border-top-inline-end-radius': '0',
				'border-bottom-inline-end-radius': '0'
			}
		}
	});
}); /* v7-7d60e61f157cb7cc */