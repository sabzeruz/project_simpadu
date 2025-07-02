"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } 
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({addComponents}) => {
  // Base
  addComponents({
    '.image-input': {			
      'display': 'inline-flex',
			'position': 'relative',
      'align-items': 'stretch',
			'justify-content': 'center',
      'input[type="file"]': {
				'appearance': 'none',
				'position': 'absolute',
				'width': '0 !important',
				'height': '0 !important',
				'overflow': 'hidden',
				'opacity': '0',
			},
			'.image-input-preview': {
				'cursor': 'pointer',
				'position': 'relative',
				'overflow': 'hidden',
				'width': '100%',
				'height': '100%',
				'background-size': 'cover',
				'background-repeat': 'no-repeat',
			},
			'.image-input-placeholder': {
				'position': 'relative',
				'overflow': 'hidden',
				'width': '100%',
				'height': '100%',
				'background-size': 'cover',
				'background-repeat': 'no-repeat',
			}
    },
  }); 
}); /* v7-64b68743c7e4d15c */