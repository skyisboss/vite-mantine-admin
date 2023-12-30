import PageHeader from '@/components/PageHeader'
import { MenuData } from '@/layout/Sidebar'
import { Card, UnstyledButton, Text, ActionIcon, Tooltip, Anchor, Breadcrumbs } from '@mantine/core'
import {
  IconListSearch,
  IconFilter,
  IconSquareRoundedPlusFilled,
  IconPencilMinus,
  IconDots,
  IconTrash,
} from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'

interface Props extends WithClassName {}

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
const OrderView = memo((props: Props) => {
  const { className } = props

  const items = [
    { title: '编辑', href: '#' },
    { title: '更多', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))

  return (
    <div className={className}>
      <PageHeader
        title={MenuData.find(x => x.key === 'order')?.label ?? ''}
        action={
          <NavLink to="/order/add">
            <Button
              leftSection={<IconSquareRoundedPlusFilled size="1rem" stroke={1.5} />}
              size="xs"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            >
              新增
            </Button>
          </NavLink>
        }
      />

      <Card shadow="md" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <div className="flex justify-between">
            <div className="flex space-x-1">
              <Button size="xs" variant="light">
                全部
              </Button>
              <Button className="border-none" size="xs" variant="default">
                代付款
              </Button>
              <Button className="border-none" size="xs" variant="default">
                待发货
              </Button>
            </div>
            <div className="flex space-x-2">
              <Tooltip withArrow label="搜索">
                <ActionIcon variant="default">
                  <IconListSearch size="1.2rem" stroke={1.5} />
                </ActionIcon>
              </Tooltip>
              <Tooltip withArrow label="筛选">
                <ActionIcon variant="default">
                  <IconFilter size="1.2rem" stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            </div>
          </div>
        </Card.Section>
        <Card.Section>
          <Table highlightOnHover verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr bg="#f1f3f5">
                <Table.Th>产品</Table.Th>
                <Table.Th>价格</Table.Th>
                <Table.Th>销量</Table.Th>
                <Table.Th>客单价</Table.Th>
                <Table.Th>成交额</Table.Th>
                <Table.Th>操作</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {elements.map((element, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{element.product_name}</Table.Td>
                  <Table.Td>{element.product_price}</Table.Td>
                  <Table.Td>{element.product_sales}</Table.Td>
                  <Table.Td>{element.customer_price}</Table.Td>
                  <Table.Td>{element.total_amount}</Table.Td>
                  <Table.Td>
                    {/* <div className="flex space-x-4">
                      <Tooltip withArrow label="编辑">
                        <ActionIcon variant="default">
                          <IconPencilMinus size="1rem" stroke={1.5} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip withArrow label="删除">
                        <ActionIcon variant="default">
                          <IconTrash size="1rem" stroke={1.5} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip withArrow label="更多">
                        <ActionIcon variant="default">
                          <IconDots size="1rem" stroke={1.5} />
                        </ActionIcon>
                      </Tooltip>
                    </div> */}
                    <Button.Group>
                      <Button size="xs" variant="default">
                        <IconPencilMinus size="1rem" stroke={1.5} />
                      </Button>
                      <Button size="xs" variant="default">
                        <IconTrash size="1rem" stroke={1.5} />
                      </Button>
                      <Button size="xs" variant="default">
                        <IconDots size="1rem" stroke={1.5} />
                      </Button>
                    </Button.Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card.Section>
      </Card>
      <div className="flex justify-center mt-4">
        <Pagination total={10} />
      </div>
    </div>
  )
})

const Order = styled(OrderView)``

Order.displayName = 'Order'
OrderView.displayName = 'OrderView'
export default Order
