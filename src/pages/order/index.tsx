import PageContent from '@/components/PageContent'
import PageHeader from '@/components/PageHeader'
import { PageNav } from '@/layout/menu'
import { Anchor } from '@mantine/core'
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'

interface Props extends WithClassName {}

const OrderView = memo((props: Props) => {
  const { className } = props
  const [page, setPage] = useState(1)

  const navs = [
    { key: 'all', label: '全部' },
    { key: 'a1', label: '待发货' },
    { key: 'a2', label: '已取消' },
    { key: 'a3', label: '已完成' },
  ]
  const cols = [
    {
      label: '交易',
      key: 'tx',
    },
    {
      label: '来自',
      key: 'from',
    },
    {
      label: '发到',
      key: 'to',
    },
    {
      label: '金额',
      key: 'amount',
    },
    {
      label: '类型',
      key: 'type',
    },
    {
      label: '操作',
      key: 'action',
      render: () => {
        return (
          <div className="space-x-2">
            <Anchor size="xs" onClick={() => {}}>
              编辑
            </Anchor>
            <Anchor size="xs">移除</Anchor>
          </div>
        )
      },
    },
  ]
  const { data: res } = useRequest(() => orderAPI.index({ page: page }), {
    refreshDeps: [page],
  })
  const data = res?.data?.rows ?? []
  const pageInfo = {
    page: res?.data?.page,
    size: res?.data?.size,
    total: res?.data?.total,
  }

  return (
    <div className={className}>
      <PageHeader
        title={PageNav?.order?.label}
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

      <PageContent
        withSelection
        navs={navs}
        cols={cols}
        data={data}
        pageInfo={pageInfo}
        pageChange={(page) => setPage((x) => page)}
        navChange={(v) => {
          console.log(v)
        }}
      />
    </div>
  )
})

const Order = styled(OrderView)``

Order.displayName = 'Order'
OrderView.displayName = 'OrderView'
export default Order
