import typescript from 'rollup-plugin-typescript2';

export default {
    input: './src/index.ts',
    output: {
        file: './lib/bundle.js',
        format: 'cjs'
    },

    plugins: [
        typescript(/*{ plugin options }*/)
    ],
    external: [
        'uuidv4',
        'axios'
    ]
}
