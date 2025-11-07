module.exports = {
  root: true, // 标识为根配置，避免向上查找其他配置
  env: {
    node: true, // 启用Node.js环境变量
    browser: true, // 启用浏览器环境变量
    es2021: true // 启用ES2021语法支持
  },
  extends: [
    // 引入Vue官方推荐规则（根据你的Vue版本选择，Vue3用vue3-essential，Vue2用vue2-essential）
    'plugin:vue/vue3-essential',
    // 引入ESLint官方推荐规则
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser', // 使用babel解析器处理ES6+语法
    sourceType: 'module', // 声明使用ES6模块（支持import/export）
    ecmaVersion: 'latest' // 支持最新ECMAScript语法
  },
  rules: {
    // 可添加自定义规则（可选）
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};