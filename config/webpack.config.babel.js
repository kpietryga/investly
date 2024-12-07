import merge from "webpack-merge";
import commonConfig from './webpack.common.babel'

module.exports = ({env, version}) => {
    const envConfig = require(`./webpack.${env}.babel.js`)
    return merge(commonConfig, envConfig);
}