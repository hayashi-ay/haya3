import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main className="p-4 flex flex-col justify-start min-h-screen">
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

        <a href="eth-nft" className="group m-4 p-6 max-w-xs border rounded-xl hover:border-blue-500">
          <h2 className="mb-4 text-2xl group-hover:text-blue-600">ETH NFT &rarr;</h2>
          <p className="text-xl leading-normal group-hover:text-blue-600">
            A super wonderful awesome NFT app.
          </p>
        </a>
      </div>
    </main >
  )
}

export default Home
