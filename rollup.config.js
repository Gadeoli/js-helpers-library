import resolve      from '@rollup/plugin-node-resolve';
import commonjs     from '@rollup/plugin-commonjs';
import typescript   from '@rollup/plugin-typescript';
import { terser }   from 'rollup-plugin-terser';
import external     from 'rollup-plugin-peer-deps-external';
import dts          from 'rollup-plugin-dts';

const packageJson = require('./package.json');
const production = !process.env.ROLLUP_WATCH;

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: !production,
                name: 'react-ts-lib'
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: !production
            }
        ],
        plugins: [
            external(),
            resolve(),
            commonjs(),
            typescript({ 
                tsconfig: './tsconfig.json',
                sourceMap: !production,
            }),
            terser()
        ]
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: "esm" }],
        plugins: [dts()],
    }
]