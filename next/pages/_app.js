import '../styles/base/reset.scss';

function MyApp({ Component, pageProps }) {
  console.log(Component)
  console.log(pageProps)
  return <Component {...pageProps} />
}

export default MyApp
