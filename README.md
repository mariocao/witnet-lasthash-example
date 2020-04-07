# witnet-lasthash-example

`witnet-lasthash-example` is a price feed example that aims to illustrate how to build data feeds by using Witnet and their development tools. It was developed following the steps described in the [Witnet documentation](https://docs.witnet.io/tutorials/bitcoin-price-feed/introduction/).

DISCLAIMER: This code is experimental and APIs are subject to change. Use it at your own risk!


## How is the price feed designed?

The last hash feed included in this example:

- Queries 3 different APIs for the last block hash of Bitcoin.
- Defines how to aggregate the values from both APIs and report the result.
- Defines how to tally the results reported by the different nodes into a single data point that can be trustlessly consumed by an Ethereum smart contract.


## How decentralized is this example?

None of the parties involved in the process of deploying, updating and using the price feed will have any power to tamper with the integrity of the data points it provides:

- Once deployed, no one will be able to prevent the price feed from being updated or queried.
- Nobody can set the price directly. The only way to update it is through a Witnet request.
- The price is averaged from different public APIs, thus mitigating their influence in the final price.
- The data is relayed by different Witnet nodes, whose reported data points get aggregated and averaged, filtering out any outliers so as to cancel any malicious reporter who may try to leverage a slight drift of the data point.


## Understanding the project

In this project you will find the following structure:

```
witnet-goldprice-example
├── contracts       // Where your Solidity contracts will be
│   └── requests    // Where Witnet requests end up after compilation
├── migrations      // Deployment scripts
├── requests        // Witnet request source code (.js files)
└── test            // Scripts for testing your contracts
```

In the `requests` folder, you will find the code that defines how data is retrieved, aggregated and tallied. More information is available at:

- [Choose and add data sources](https://docs.witnet.io/tutorials/bitcoin-price-feed/sources/)
- [Define the aggregator and tally functions](https://docs.witnet.io/tutorials/bitcoin-price-feed/aggregations/)
- [Fine-tune the Witnet request](https://docs.witnet.io/tutorials/bitcoin-price-feed/fine-tuning/)


## Compile Witnet Requests

First, you need to compile the Witnet requests as follows:

```console tab="npm"
npm run compile-requests
```

```console tab="yarn"
yarn compile-requests
```

It will compile the requests into Witnet bytecode and write for you the Truffle migrations scripts.


## Compile PriceFeed contract

Second, you need to compile the `PriceFeed` solidity smart contract. This contract inherits `UsingWitnet` and provides functions to request and complete price feed updates.

```console tab="npm"
npm run compile-contracts
```

```console tab="yarn"
yarn compile-contracts
```


## Deploy contracts

Finally, you could deploy the previous smart contract and Witnet request by using Truffle `migrate`. Be sure to configure properly `truffle-config.js`.

For example, the following commands will migrate the contracts into the development network:

```console tab="npm"
npm run migrate
```

```console tab="yarn"
yarn migrate
```
