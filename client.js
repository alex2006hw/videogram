let lotion = require('lotion')
const Gun = require('gun')

const gun = Gun()
const videogramChannel = gun.get('videogram')
videogramChannel.get('APPGCI').val((APPGCI, index) => {
  console.log('APPGCI', APPGCI)

  const YOUR_APP_GCI = APPGCI
  const judd = 'F6bWG3T8YGMzz89C12uhgWnYkS9b9Dgq6'
  const matt = '5x5kfVezERDty5DJQMXCHz8rdy5feYGS7'

  const clientChain = async () => {
    const client = await lotion.connect(YOUR_APP_GCI)
    const result = await client.send({
      from: [
        // tx inputs. each must include an amount:
        { amount: 4, type: 'my-module', senderAddress: judd }
      ],
      to: [
        // tx outputs. sum of amounts must equal sum of amounts of inputs.
        { amount: 4, type: 'my-module', receiverAddress: matt }
      ]
    })
    console.log('1',result)
  }
  clientChain()
});

// { ok: true, height: 42 }
