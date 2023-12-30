import PageHeader from '@/components/PageHeader'
import TableContent from '@/components/TableContent'
import TableHeader from '@/components/TableHeader'
import { TitleByMenu } from '@/layout/Sidebar'
import { IconSend } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'

interface Props extends WithClassName {}

const ContentView = memo((props: Props) => {
  const { className } = props

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
    { key: 'a1', label: '正在发送' },
    { key: 'a2', label: '发送失败' },
  ]

  return (
    <div className={className}>
      <PageHeader
        title={TitleByMenu(location.pathname)}
        action={
          <NavLink to="/content/send">
            <Button
              leftSection={<IconSend size="1rem" stroke={1.5} />}
              size="xs"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            >
              发送贴文
            </Button>
          </NavLink>
        }
      />

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

const Content = styled(ContentView)``

Content.displayName = 'Content'
ContentView.displayName = 'ContentView'
export default Content
