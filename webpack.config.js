const HtmlWebpack=require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: 'development',
    output:{
        clean:true
    },
    module: {
        rules:[
            {
                test: /\.html$/,//si encuentra archivo html ejecuta el loader
                loader: 'html-loader',
                options:{
                    sources:false
                }
            },
            {
                test: /\.css$/,//si encuentra archivo html ejecuta el loader
                //cargamos los paquetes para el manejo de css y style
                //para que pueda continuar la siguiente regla
                exclude: /styles.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /styles.css$/,
                use :[
                    MiniCssExtract.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,//si encuentro este tipo de archivos ejecuta el loader
                loader: 'file-loader',
                options:{
                    sources:false
                }
            }

        ]
    },
    optimization:{},
    plugins:[
        new HtmlWebpack(
            {
                title:'Mi webpack',
                filename: 'index.html',
                template: './src/index.html'
    
            }),

        new MiniCssExtract(
            {
            //Mantenemos el mismo nombre y aplicamos el hash para que los navegadores no mantengan en cache los archivos css    
            filename: '[name].css',
            ignoreOrder:false
        }),

        new CopyPlugin(
            {
                patterns: [{from: "src/assets", to: "assets"}]
                
            }
            )
    ]
}