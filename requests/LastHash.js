import * as Witnet from "witnet-requests"

const hash1 = new Witnet.Source("https://api-r.bitcoinchain.com/v1/status")
  .parseMapJSON()
  .getString("hash")

const hash2 = new Witnet.Source("https://api.blockchair.com/bitcoin/stats")
  .parseMapJSON()
  .getMap("data")
  .getString("best_block_hash")

const hash3 = new Witnet.Source("https://api.blockcypher.com/v1/btc/main")
  .parseMapJSON()
  .getString("hash")

// Filters out any value that is not in the mode
const aggregator = new Witnet.Aggregator({
  filters: [[0x08]], // mode (not yet implemented in witnet-requests-js)
  reducer: Witnet.Types.REDUCERS.mode,
})

// Filters out any value that is not in the mode
const tally = new Witnet.Tally({
  filters: [[0x08]], // mode (not yet implemented in witnet-requests-js)
  reducer: Witnet.Types.REDUCERS.mode,
})

// This is the Witnet.Request object that needs to be exported
const request = new Witnet.Request()
  .addSource(hash1) // Use source 1
  .addSource(hash2) // Use source 2
  .addSource(hash3) // Use source 3
  .setAggregator(aggregator) // Set the aggregator function
  .setTally(tally) // Set the tally function
  .setQuorum(20, 10, 2, 5, 70) // Set witnesses, backup witnesses, extra commit rounds, extra reveals rounds, minimum consensus percentage
  .setFees(10, 1, 1, 1) // Set economic incentives
  .schedule(0) // Make this request immediately solvable

// Do not forget to export the request object
export { request as default }
