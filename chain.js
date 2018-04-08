let coins = require('coins')
const Gun = require('gun')

const gun = Gun()
const videogramChannel = gun.get('videogram')

const lotionOptions =
{
  devMode: true,       // set this true to wipe blockchain data between runs
//  initialState: {},     // initial blockchain state
//  keys: '',             // path to keys.json. generates own keys if not specified.
//  genesis: '',          // path to genesis.json. generates new one if not specified.
//  peers: [],            // array of '<host>:<p2pport>' of initial tendermint nodes to connect to. does automatic peer discovery if not specified.
  logTendermint: true, // if true, shows all output from the underlying tendermint process
  createEmptyBlocks: true, // if false, Tendermint will not create empty blocks which may result in a reduced blockchain file size
  p2pPort: 46658,       // port to use for tendermint peer connections
  tendermintPort: 46657 // port to use for tendermint rpc
}

let lotion = require('lotion')
lotion(lotionOptions)

const judd = 'F6bWG3T8YGMzz89C12uhgWnYkS9b9Dgq6'
const matt = '5x5kfVezERDty5DJQMXCHz8rdy5feYGS7'

let app = lotion({})

const isNotValid = (val) => {
    return false
}

app.use(coins({
    name: 'usrcoin',
    initialBalances: {
      judd : 1111,
      matt : 2222
    },
    handlers: {
      'my-module': {
        onInput(input, tx, state) {
          console.log('1', input)
          console.log('2', tx)
          console.log('3', state)
          // this function is called when coins of
          // this type are used as a transaction input.

          // if the provided input isn't valid, throw an error.
          if(isNotValid(input)) {
            console.log('4', input)
            throw Error('this input isn\'t valid!')
          }

          // if the input is valid, update the state to
          // reflect the coins having been spent.
          state[input.senderAddress] -= input.amount
          console.log('5', state)
        },

        onOutput(output, tx, state) {
          console.log('6', output)
          console.log('7', tx)
          console.log('8', state)
          // here's where you handle coins of this type
          // being received as a tx output.

          // usually you'll just want to mutate the state
          // to increment the balance of some address.
          state[output.receiverAddress] = (state[output.receiverAddress] || 0) + output.amount
          console.log('9', state)
        }
      }
    }
  }
))

app.listen(8080).then(({ GCI }) => {
 videogramChannel.put({"APPGCI": GCI})
 console.log('App GCI:', GCI)
})

