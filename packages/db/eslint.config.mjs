import tseslint from 'typescript-eslint';
import baseConfig from '../../eslint.config.base.mjs';

export default tseslint.config(...baseConfig, {
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['eslint.config.mjs']
      },
      tsconfigRootDir: import.meta.dirname
    }
  }
});
