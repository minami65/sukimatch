module.exports = {
  'sukimatch-api': {
    input: `${__dirname}/../backend/openapi.json`,
    output: {
      target: './src/api/generated/endpoints/api.ts',
      schemas: './src/api/generated/models',
      client: 'react-query',
      httpClient: 'axios',
      clean: true,
      override: {
        mutator: {
          path: './src/api/axios.ts',
          name: 'customInstance',
          default: true,
        },
      },
    },
  },
};
