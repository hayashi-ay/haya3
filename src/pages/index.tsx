import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="p-4">
      <Head>
        <title>haya3</title>
        <meta name="description" content="haya3 gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 flex flex-col justify-center">
        <h1 className="text-4xl text-center">
          Haya3
        </h1>

        <p className="m-4 text-xl text-center leading-normal">
          My portfolio of web3 apps.<br />
          You can see the source code <a className="text-blue-400" href="https://github.com/hayashi-ay/haya3" target="_blank" rel="noreferrer">here</a>.
        </p>
        <div className="flex justify-center flex-wrap">
          <a href="eth-dapp" className="group m-4 p-6 max-w-xs border rounded-xl hover:border-blue-500">
            <h2 className="mb-4 text-2xl group-hover:text-blue-600">ETH-dApp &rarr;</h2>
            <p className="text-xl leading-normal group-hover:text-blue-600">
              A simple dApp constructed on ethereum network.
            </p>
          </a>

          <a href="" className="pointer-events-none group m-4 p-6 max-w-xs border rounded-xl hover:border-blue-500">
            <h2 className="mb-4 text-2xl group-hover:text-blue-600">Coming soon...</h2>
            <p className="text-xl leading-normal group-hover:text-blue-600">
              A super wonderful awesome NFT app.
            </p>
          </a>
        </div>
      </main >

      <footer>
      </footer>
    </div >
  )
}

export default Home
