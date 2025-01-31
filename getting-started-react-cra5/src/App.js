import "./App.css";
import { Metaplex } from "@metaplex-foundation/js-next";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";

const connection = new Connection(clusterApiUrl("devnet"));
const mx = Metaplex.make(connection);

function App() {
  const [address, setAddress] = useState(
    "3ijFZcJKmp1EnDbbuaumWYvEFbztx9NRupwTXTchK9bP"
  );
  const [nft, setNft] = useState(null);
  const fetchNft = async () => {
    const nft = await mx.nfts().findNftByMint(new PublicKey(address));
    setNft(nft);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">NFT Mint Address</h1>
        <div className="nftForm">
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <button onClick={fetchNft}>Fetch</button>
        </div>
        {nft && (
          <div className="nftPreview">
            <h1>{nft.name}</h1>
            <img
              src={nft.metadata.image}
              alt="The downloaded illustration of the provided NFT address."
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
