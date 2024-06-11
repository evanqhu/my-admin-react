// @see https://eslint.org/docs/v8.x/

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  /** 根目录为当前目录 */
  root: true,
  /** 环境为浏览器环境和 ECMAScript 2020 */
  env: { browser: true, es2020: true },
  /** 继承的规则配置 */
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Prettier 规则集必须放在最后
  ],
  /** 忽略文件 */
  ignorePatterns: ['dist', '.eslintrc.cjs', '.prettierrc.cjs', '.stylelintrc.cjs'],
  /** 解析器 */
  parser: '@typescript-eslint/parser',
  /** 配置解析器的行为和选项 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  /** 插件 */
  plugins: ['react-refresh', 'simple-import-sort'],
  /** 自定义规则 */
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-explicit-any': 'off', // 关闭使用 any 类型的检测规则
    '@typescript-eslint/no-unsafe-assignment': 'off', // 关闭不安全的赋值操作规则
    '@typescript-eslint/no-unsafe-member-access': 'off', // 关闭不安全成员访问规则
    '@typescript-eslint/no-unsafe-return': 'off', // 关闭不安全返回值规则
    '@typescript-eslint/no-unsafe-call': 'off', // 关闭不安全调用规则
    '@typescript-eslint/no-unsafe-argument': 'off', // 关闭不安全参数传递规则
    '@typescript-eslint/ban-types': 'off', // 关闭禁止使用特定类型的规则
    '@typescript-eslint/no-unused-vars': 'warn', // 关闭未使用变量的检测规则
    '@typescript-eslint/no-unsafe-enum-comparison': 'off', // 关闭不安全的枚举比较规则
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'react/display-name': 'off', // 关闭 React 组件的 display name 规则
  },
}
