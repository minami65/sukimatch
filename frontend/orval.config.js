module.exports = {
    'sukimatch-api': {
      input: 'http://localhost:8000/openapi.json',
      output: {
        mode: 'tags-split',
        target: './src/api/generated/client.ts',
        schemas: './src/api/generated/models',
        client: 'react-query',
      },
    },
  };