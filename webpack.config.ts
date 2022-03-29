import path from 'path';
// import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
  name: 'sleact',
  mode: isDevelopment ? 'development' : 'production',
  devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
    },
  },
  entry: { //TODO: entry 안의 point는 여러게 만 들수 있다.  ex ) {app: './client',app2: './client',app3: './client',}
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions', 'IE11'] }, // 최신 크롬만 지원 하겠다.
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              plugins: [['@emotion', { sourceMap: true }], require.resolve('react-refresh/babel')],
            },
            production: {
              plugins: ['@emotion'],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    //   // eslint: {
    //   //   files: "./src/**/*",
    //   // },
    // }),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
    //TODO: EnvironmentPlugin =>  이걸 넣으면 프론트에서도 process.env.NODE_ENV에 접근 할 수 있다.
  ],
  output: {
    path: path.join(__dirname, 'dist'), //TODO: 현재 __dirname 은 sleact-std 이고 그 안에 dist폴더를 만들겠다.
    filename: '[name].js', //TODO: [name].js는 entry로 지정한 파일을 말한다.
    publicPath: '/dist/',
  },
//   devServer: {
//     historyApiFallback: true, // react router
//     port: 3090,
//     publicPath: '/dist/',
//     proxy: {
//     '/api/': {
//         target: 'http://localhost:3095',
//         changeOrigin: true,
//     },
//     },
// },
};

if (isDevelopment && config.plugins) { //개발 환경일떄 사용할 플러그인
//   config.plugins.push(new webpack.HotModuleReplacementPlugin());
//   config.plugins.push(new ReactRefreshWebpackPlugin());
//   config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}
if (!isDevelopment && config.plugins) { //개발 환경이 아닐때 사용할 플러그인
//   config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
//   config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;