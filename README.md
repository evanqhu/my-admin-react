# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# 笔记

## 01 项目初始化

1️⃣ 使用 `Vite` 初始化项目

```bash
pnpm create vite

pnpm install
```

2️⃣ 安装其它依赖

```bash
# 安装额外 ESlint 包
pnpm i eslint-plugin-react -D # React 规则集
pnpm i eslint-plugin-simple-import-sort -D # 规范模块导入顺序

# 安装 Prettier 相关包
pnpm i prettier eslint-config-prettier -D # 覆盖 ESLint 本身的规则配置
pnpm i eslint-plugin-prettier -D # 让 Prettier 来接管 eslint --fix 即修复代码的能力
```

3️⃣ 修改 ESlint 配置

```js
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
  ignorePatterns: ['dist', '.eslintrc.cjs', '.prettierrc.cjs'],
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
    "@typescript-eslint/no-unsafe-assignment": "off", // 关闭不安全的赋值操作规则
    "@typescript-eslint/no-unsafe-member-access": "off", // 关闭不安全成员访问规则
    "@typescript-eslint/no-unsafe-return": "off", // 关闭不安全返回值规则
    "@typescript-eslint/no-unsafe-call": "off", // 关闭不安全调用规则
    "@typescript-eslint/no-unsafe-argument": "off", // 关闭不安全参数传递规则
    '@typescript-eslint/ban-types': 'off', // 关闭禁止使用特定类型的规则
    "@typescript-eslint/no-unused-vars": 'warn', // 关闭未使用变量的检测规则
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    'react/display-name': 'off', // 关闭 React 组件的 display name 规则
  },
}
```

4️⃣ 添加 Prettier 配置文件

```bash
touch .prettierrc.cjs
```

```js
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
```

5️⃣ 配置 Stylelint

安装相关依赖

```bash
pnpm i stylelint-config-standard stylelint-config-standard-less -D
pnpm i stylelint-order stylelint-less stylelint-prettier stylelint-config-recess-order -D
```

添加 Stylelint 配置文件

```bash
touch .stylelintrc.cjs
```

```js
/** @type {import('stylelint').Config} */​
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
  },
};
```

6️⃣ 安装样式处理器

```bash
pnpm i postcss autoprefixer -D
```

修改 `vite.config.ts` 配置文件

```js
import autoprefixer from 'autoprefixer';

export default defineConfig(() => {
  css: {
    postcss: {
      plugins: [
        // 处理 css 兼容性问题
        // https://github.com/postcss/autoprefixer
        autoprefixer(),
      ],
    },
  },
});
```

