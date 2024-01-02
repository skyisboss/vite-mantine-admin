const delay = require('mocker-api/lib/delay');
// const secured = require('./secured.mock');
// import Mock from 'mockjs';
const Mock = require('mockjs');
// 是否禁用代理

const product = require('./product');

const proxy = {
  ...product,
  'POST /api/order': (req, res) => {
    const {page} = req.body
    console.log(page);
    const data = Mock.mock({
    'rows|10': [
      {
        'id|+1': (page * 1 + 10),
        tx: '@string("lower", 12)',
        from: '@string("lower", 32)',
        to: '@string("lower", 32)',
        amount: 100,
        type: '@pick([0,1])',
        created_at: Date.now(),
      },
    ],
  })
    return res.json({
      err: 0,
      msg: '123',
      data: {
        total: 20,
        size: 20,
        page: page,
        rows: data.rows,
      },
      
    })
  },

  'POST /api/upload': (req, res) => {
    const {page} = req.body
    setTimeout(() => {
      return res.json({
        err: 0,
        msg: '',
        data: {
          uid: '2',
          name: 'image.png',
          status: 'error',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      })
    }, 5000);
    
  },
}
module.exports = (delay(proxy, 0));
