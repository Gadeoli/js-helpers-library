import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs     from '@rollup/plugin-commonjs';
import typescript   from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import external     from 'rollup-plugin-peer-deps-external';
import dts          from 'rollup-plugin-dts';
import packageJson from "./package.json" with { type: "json" };

const production = !process.env.ROLLUP_WATCH;

const onlyPath = (filePath) => {
    const aux = filePath.split('/');
    aux.pop();
    return aux.join('/');
}

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: !production,
                name: 'react-ts-lib'
            }
        ],
        plugins: [
            external(),
            nodeResolve({ preferBuiltins: false, mainFields: ['browser'] }),
            commonjs(),
            typescript({ 
                tsconfig: './tsconfig.json',
                sourceMap: !production,
                "declarationDir": `${onlyPath(packageJson.main)}/types`,
            }),
            terser()
        ]
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: !production
            }
        ],
        plugins: [
            external(),
            nodeResolve({ preferBuiltins: false, mainFields: ['browser'] }),
            commonjs(),
            typescript({ 
                tsconfig: './tsconfig.json',
                sourceMap: !production,
                "declarationDir": `${onlyPath(packageJson.module)}/types`,
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