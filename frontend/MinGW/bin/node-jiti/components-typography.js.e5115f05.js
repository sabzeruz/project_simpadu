"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } 
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({addComponents, theme}) => {
	addComponents({
		'.link': {
			'color': 'var(--tw-primary)',
			'&:hover': {
				'color': 'var(--tw-primary-active)',
			}
		},
		'.form-label': {
			'display': 'flex',
			'width': '100%',
			'color': 'var(--tw-gray-700)',
			'font-weight': theme('fontWeight.medium'),
      'font-size': theme('fontSize.2sm'),
			'line-height': theme('fontSize.2sm.1.lineHeight')
		},
		'.form-info': {
			'color': 'var(--tw-gray-700)',
			'font-weight': theme('fontWeight.medium'),
      'font-size': theme('fontSize.2sm'),
			'line-height': theme('fontSize.2sm.1.lineHeight')
		},
		'.form-hint': {
			'color': 'var(--tw-gray-600)',
			'font-weight': theme('fontWeight.medium'),
      'font-size': theme('fontSize.xs'),
			'line-height': theme('fontSize.xs.1.lineHeight')
		}
	});
}); /* v7-14f99fbfa0b3d016 */