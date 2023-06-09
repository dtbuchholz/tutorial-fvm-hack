# FVM Hack Workshop

> FEVM SQL database for event-driven applications.

## Background

Tableland is a decentralized SQL database built on and adjacent to EVM chains. It enables developers to permissionlessly scale web3 application data storage with low costs and query features, which aren't possible with existing solutions.

This workshop walks through the very basics for setting up a smart contract, developing with Local Tableland, and deploying to Filecoin Hyperspace.

### Project structure

If you're following along, the following outlines steps needed to recreate the structure in this repository. These steps are not needed if you simply clone or fork this repo.

First, set up a Hardhat project by creating a directory, `cd` into it, and then run the following:

```bash
npx hardhat
```

You'll also need the following dependencies:

- `@tableland/evm`
- `@tableland/sdk`
- `@tableland/hardhat`
- `dotenv`

Do this will the following command:

```bash
npm i @tableland/evm @tableland/sdk @tableland/hardhat dotenv
```

And development dependency of `@tableland/local`:

```bash
npm i -D @tableland/local
```

From there, the `contracts/Lock.sol` (and the contract name) should be changed to `contracts/FVM.sol`, and four scripts should be created in the `scripts` directory:

- `deploy.js`
- `read.js`
- `setController.js`
- `write.js`

Be sure to also update the `module.exports` object in `hardhat.config.js` with information needed for the Tableland Hardhat plugin as well as Filecoin Hyperspace deployment. This file should also import `@tableland/hardhat` and `dotenv`.

```js
// ...
localTableland: {
  silent: false,
  verbose: false,
},
networks: {
  "filecoin-hyperspace": {
    url: "https://rpc.ankr.com/filecoin_testnet", // No API auth needed.
    accounts: [process.env.PRIVATE_KEY],
  },
},
contract: "",
// ...
```

The workshop itself walks through how these files are altered to get to the code's end state in this repo.

## Usage

First, install dependencies with `npm`:

```bash
npm install
```

You'll also want to ensure you have a private key accessible—create a `.env` and set your private key to the variable `PRIVATE_KEY`.

If you are developing locally, you'll first want to start a local Hardhat and Tableland node:

```bash
npx hardhat node --network local-tableland
```

Then, you can run the deploy script—**be sure to update the `contract`** variable in `hardhat.config.js` with the value logged in the script:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

The following scripts are also available:

- `read.js`: Read data from your table.
- `setController.js`: Set the table's controller.
- `write.js`: Write data to the table.

If you would like to deploy to Filecoin Hyperspace, simply change the `--network` flag:

```bash
npx hardhat run scripts/deploy.js --network filecoin-hyperspace
```
