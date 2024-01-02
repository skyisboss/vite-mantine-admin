const Mock = require('mockjs')
const Random = require('mockjs')

module.exports = {
    'POST /api/product': (req, res) => {
    const {page} = req.body
    console.log(page);
    const data = Mock.mock({
    'rows|10': [
      {
        'id|+1': (page * 1 + 10),
        image: '@image(40x40)',
        title: '@csentence',
        category: '@cname',
        price:  '@integer(60, 1000)',
        stock: '@integer(60, 1000)',
        status: '@pick([0,1])',
        created_at: Date.now(),
      },
    ],
  })
    setTimeout(() => {
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
    },500)
  },
}