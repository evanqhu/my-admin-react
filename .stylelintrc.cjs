/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    // 标准规则集
    'stylelint-config-standard',
    // Less 规则集
    'stylelint-config-standard-less',
    // 继承已有的样式顺序
    'stylelint-config-recess-order',
    // 作为 Stylelint 规则运行 Prettier
    'stylelint-prettier/recommended',
  ],
  plugins: [
    // Less 插件
    'stylelint-less',
    // 允许自定义样式顺序
    'stylelint-order',
  ],
  rules: {
    'order/order': [
			'custom-properties',
			'declarations',
		],
    'selector-class-pattern': null,
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'value-keyword-case': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'selector-not-notation': null,
  },
};
