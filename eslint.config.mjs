import tseslint from 'typescript-eslint'
import configs from 'rete-cli/configs/eslint.mjs'
import gloals from 'globals'

export default tseslint.config(
  ...configs,
  {
    languageOptions: {
      globals: {
        ...gloals.browser
      }
    },
    rules: {
      '@typescript-eslint/unbound-method': 'off'
    }
  }
)