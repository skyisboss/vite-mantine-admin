import { Avatar, Card, Grid, List, Text } from '@mantine/core'
import { IconUserPlus, IconDiscount2 } from '@tabler/icons-react'
interface Props extends WithClassName {}

const SalesCountView = memo((props: Props) => {
  const { className } = props

  const elements = [
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
    { product_name: 'Carbon', product_price: 100, product_sales: 200, customer_price: 11, total_amount: 5000 },
  ]
  return (
    <div className={className}>
      <Grid>
        <Grid.Col span={4}>
          <Card withBorder shadow="sm" radius="md">
            <Card.Section inheritPadding py="xs">
              <Text fw={500} size="sm">
                最新订单
              </Text>
            </Card.Section>
            <Card.Section mt="sm" pb="sm">
              {[1, 2, 3, 4, 5].map(x => (
                <NavLink
                  key={x}
                  className="w-full"
                  leftSection={
                    <Avatar color="cyan" radius="xl">
                      MK
                    </Avatar>
                  }
                  rightSection={
                    <Text size="xs" c="gray">
                      ¥ 500.00
                    </Text>
                  }
                  label="Dashboard"
                  description="Item with description"
                />
              ))}
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col span={8}>
          <Card withBorder shadow="sm" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
              <Text fw={500} size="sm">
                销售排行
              </Text>
            </Card.Section>
            <Card.Section inheritPadding mt="sm" pb="sm">
              <Table highlightOnHover verticalSpacing="sm">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>产品</Table.Th>
                    <Table.Th>价格</Table.Th>
                    <Table.Th>销量</Table.Th>
                    <Table.Th>客单价</Table.Th>
                    <Table.Th>成交额</Table.Th>
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
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
              <Text size="xs" c="gray" className="text-center">
                最新统计时间：2022-12-20 15:20:36
              </Text>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  )
})

const SalesCount = styled(SalesCountView)``

SalesCount.displayName = 'SalesCount'
SalesCountView.displayName = 'SalesCountView'
export default SalesCount
