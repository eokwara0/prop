module.exports = {
  api: {
    input: './openapi.json',
    output: {
      target: "../../packages/ui/src/sdk",
      client: 'axios',
      override: {
        mutator: { path: '../../packages/ui/src/httpclient.ts', name: 'customInstanceMutator' },
      },
    },
  },
};
