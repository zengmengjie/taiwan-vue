// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    'es6': true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'spaced-comment': 0, //注释风格要不要有空格什么的
    'no-console': 0,
    'no-useless-escape': 0,
    'eqeqeq': 0,
    'no-constant-condition': 0, //禁止在条件中使用常量表达式
    "no-return-assign": 0,
    "no-unneeded-ternary": 0,
    'no-multi-spaces': 0,
    "indent": [0, 4], //缩进风格
    'space-before-function-paren': [0, "always"], //function关键字后面的小括号前是否需要加空格
    'no-multiple-empty-lines': [1, {
      "max": 3
    }], //空行最多不能超过3行
    'no-extend-native': 0,
    'no-prototype-builtins': 0,
    'no-unused-vars': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
