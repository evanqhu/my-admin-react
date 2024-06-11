// @see https://prettier.io/docs/en/options

/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 120, // 每行代码的最大长度
  tabWidth: 2, // 每个制表符等于的空格数
  useTabs: false, // 是否使用制表符代替空格
  semi: true, // 是否在语句末尾添加分号
  singleQuote: true, // 是否使用单引号
  jsxSingleQuote: true, // JSX 中是否使用单引号
  arrowParens: 'always', // 箭头函数参数是否使用括号
};