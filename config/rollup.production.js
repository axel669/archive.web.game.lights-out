import { terser } from "rollup-plugin-terser"
import copy from "@axel669/rollup-copy-static"

import config from "./rollup.dev.js"

config.output.file = `build/app-${process.env.version}.min.js`
config.plugins.push(copy("static"))
config.plugins.push(terser())

export default config
