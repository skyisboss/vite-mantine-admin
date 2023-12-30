import PageHeader from '@/components/PageHeader'
import TableContent from '@/components/TableContent'
import TableHeader from '@/components/TableHeader'
import { TitleByMenu } from '@/layout/Sidebar'

interface Props extends WithClassName {}

const MarketingView = memo((props: Props) => {
  const { className } = props
  const handleAdd = () => {}
  const elements = [
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
  ]
  const rows = ['产品', '价格', '销量', '客单价', '成交额', '操作']
  const navs = [
    { key: 'all', label: '全部' },
    { key: 'a1', label: '进行中' },
    { key: 'a2', label: '已失效' },
  ]

  return (
    <div className={className}>
      <PageHeader title={TitleByMenu(location.pathname)} action onClick={handleAdd} />

      <Card shadow="md" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <TableHeader navs={navs} />
        </Card.Section>
        <Card.Section>
          <TableContent rows={rows} data={elements} />
        </Card.Section>
      </Card>
    </div>
  )
})

const Marketing = styled(MarketingView)``

Marketing.displayName = 'Marketing'
MarketingView.displayName = 'MarketingView'
export default Marketing
