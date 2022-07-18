import * as anchor from "@project-serum/anchor";
import { web3 } from '@project-serum/anchor';

export const SOLWAGER_PROGRAM = new anchor.web3.PublicKey(
  "8VxWJzmYtVrC755tFjQGMLhAN3hgPfCNPReEtN3wBzYz"
);

const FEE_WALLET = new anchor.web3.PublicKey(
  "8WnqfBUM4L13fBUudvjstHBEmUcxTPPX7DGkg3iyMmc8"
);

const POOL_PDA = new anchor.web3.PublicKey(
  "6N4dfkqdTFsdJuu6gvvKCUhUX4swWqeTRvt4zonJGgW4"
);

const url = "https://solana-spinners.herokuapp.com";
// const url = "http://localhost:4800";

async function getData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return response.json();
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  // console.log(response);
  return response.json();
}

async function putData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json();
}

export const createUser = async (ID: string) => {
  putData(url + '/api/users', { "ID": ID })
  .then(data => {
    // console.log('Create user:', data);
  })
  .catch((error) => {
    // console.error('Error:', error);
  });
}

export const getSpins = async (ID: string): Promise<boolean>  => {
  return new Promise<boolean>(resolve => {
    getData(url + '/api/users/spins/' + ID)
    .then(data => {
      resolve(parseInt(data) > 0);
    })
    .catch((error) => {
      // console.log(error);
      resolve(false);
    });
  });
}

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const awaitTransactionSignatureConfirmation = async (
  txid: anchor.web3.TransactionSignature,
  timeout: number,
  connection: anchor.web3.Connection,
  commitment: anchor.web3.Commitment = "recent",
  queryStatus = false
): Promise<anchor.web3.SignatureStatus | null | void> => {
  let done = false;
  let status: anchor.web3.SignatureStatus | null | void = {
    slot: 0,
    confirmations: 0,
    err: null,
  };
  let subId = 0;
  status = await new Promise(async (resolve, reject) => {
    setTimeout(() => {
      if (done) {
        return;
      }
      done = true;
      console.log("Rejecting for timeout...");
      reject({ timeout: true });
    }, timeout);
    try {
      subId = connection.onSignature(
        txid,
        (result: any, context: any) => {
          done = true;
          status = {
            err: result.err,
            slot: context.slot,
            confirmations: 0,
          };
          if (result.err) {
            console.log("Rejected via websocket", result.err);
            reject(status);
          } else {
            console.log("Resolved via websocket", result);
            resolve(status);
          }
        },
        commitment
      );
    } catch (e) {
      done = true;
      console.error("WS error in setup", txid, e);
    }
    while (!done && queryStatus) {
      // eslint-disable-next-line no-loop-func
      (async () => {
        try {
          const signatureStatuses = await connection.getSignatureStatuses([
            txid,
          ]);
          status = signatureStatuses && signatureStatuses.value[0];
          if (!done) {
            if (!status) {
              console.log("REST null result for", txid, status);
            } else if (status.err) {
              console.log("REST error for", txid, status);
              done = true;
              reject(status.err);
            } else if (!status.confirmations) {
              console.log("REST no confirmations for", txid, status);
            } else {
              console.log("REST confirmation for", txid, status);
              done = true;
              resolve(status);
            }
          }
        } catch (e) {
          if (!done) {
            console.log("REST connection error: txid", txid, e);
          }
        }
      })();
      await sleep(2000);
    }
  });

  //@ts-ignore
  if (connection._signatureSubscriptions[subId]) {
    connection.removeSignatureListener(subId);
  }
  done = true;
  console.log("Returning status", status);
  return status;
}

export const checkTX = async (
  owner: anchor.web3.PublicKey,
  tx: string,
  connection: anchor.web3.Connection
): Promise<boolean> => {
  const txTimeout = 60000;
  const status = await awaitTransactionSignatureConfirmation(
    tx,
    txTimeout,
    connection,
    "singleGossip",
    false
  )

  if (!status?.err) {
    return new Promise<boolean>(resolve => {
      // console.log(tx);
      postData(url + '/api/unlock', { "ID": owner.toString(), "sig": tx })
      .then(data => {
        resolve(true);
      })
      .catch((error) => {
        console.error('error:', error);
        resolve(false);
      });
    });
  }
  else {
    return new Promise<boolean>(resolve => {(resolve(false))})
  }
}

export const spin = async (ID: string): Promise<string> => {
  let mint = "";
  await postData(url + '/api/spin', { "ID": ID })
  .then(data => {
    mint = data.mint;
  })
  .catch((error) => {
    console.error('error:', error);
  });
  return mint;
}
