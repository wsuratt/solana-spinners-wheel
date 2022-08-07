import * as anchor from "@project-serum/anchor";
import {clusterApiUrl, Connection, PublicKey, Transaction} from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';
import {programs} from "@metaplex/js";
import {Token, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {AnchorWallet} from "@solana/wallet-adapter-react";

export const BET_NFT_WALLET = new anchor.web3.PublicKey(
  "2uiQx1XG7Ljc8PnrFYKtLWU5UZ2UtYj1PuRG9B3m7ThA"
);

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new anchor.web3.PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
// const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// export const connection = new Connection("https://withered-delicate-bird.solana-mainnet.quiknode.pro/59cfd581e09e0c25b375a642f91a4db010cf27f6/", "confirmed");
export const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

const {
  metadata: { MetadataData },
  TokenAccount,
} = programs;

export const getTokenWallet = async (
  wallet: anchor.web3.PublicKey,
  mint: anchor.web3.PublicKey
) => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0];
};

// export const betNFT = async (
//   mintAddressToBet: anchor.web3.PublicKey,
//   payerAndMintAccountOwner: anchor.web3.PublicKey
// ): Promise<string> => {

//   const { sendTransaction } = useWallet();

//   const tokenAccountAddress = await getTokenWallet(
//     payerAndMintAccountOwner,
//     mintAddressToBet
//   );

//   const transaction = new Transaction().add(
//     Token.createTransferInstruction(
//       TOKEN_PROGRAM_ID,
//       tokenAccountAddress,
//       BET_NFT_WALLET,
//       payerAndMintAccountOwner,
//       [],
//       1,
//     ),
//   );

//   const signature = await sendTransaction(transaction, connection);
  
//   // await connection.confirmTransaction(signature, 'processed');

//   return signature;
// };

export const shortenAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getKeyMints = async (
  user_wallet: AnchorWallet
): Promise<any> => {
  let keyNft = []
  try {
    const accountsUser = await TokenAccount.getTokenAccountsByOwner(
      connection,
      user_wallet.publicKey
    );

    let potentialNftAccounts = accountsUser.filter((account) => account.data.amount.toNumber() === 1)

    let nftMetadataAddresses: Array<PublicKey> = [];
    for (let potentialNftAccount of potentialNftAccounts) {
      nftMetadataAddresses.push(await fetchMetadata(potentialNftAccount.data.mint))
    }
    console.log(connection);
    let nftAcinfo = await connection.getMultipleAccountsInfo(
        nftMetadataAddresses,
        "processed"
    );

    for (let info of nftAcinfo) {
      if (!info) {
        continue
      }
      let accountMetaData = MetadataData.deserialize(info.data)
      if (accountMetaData.updateAuthority !== "GYUGP6BdXQFionk98bjV7tDVNARfVwZmja5WQsD1yUit") {
        continue
      }


      keyNft.push({
        mint: accountMetaData.mint,
        uri: accountMetaData.data.uri,
      })
    }
  } catch (err) {
    console.log("you don't have any keys");
  }
  return keyNft;
};

export const fetchMetadata = async (nftMintKey: PublicKey) => {
  const metadataBuffer = Buffer.from("metadata");

  // Fetches metadata account from PDA
  return (
      await PublicKey.findProgramAddress(
          [
            metadataBuffer,
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            nftMintKey.toBuffer(),
          ],
          TOKEN_METADATA_PROGRAM_ID
      )
  )[0];
};
