import { productAPI } from '@/api/api'
import PageContent from '@/components/PageContent'
import PageHeader from '@/components/PageHeader'
import { PageNav } from '@/layout/menu'
import { Anchor, Badge, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Image, Space } from 'antd'

interface Props extends WithClassName {}

const ProductView = memo((props: Props) => {
  const { className } = props
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  const navs = [
    { key: 'all', label: '全部' },
    { key: 'a1', label: '已上架' },
    { key: 'a2', label: '已下架' },
    { key: 'a3', label: '库存预警' },
  ]
  const cols = [
    {
      label: '商品',
      key: 'title',
      render: (item: any) => {
        return (
          <div className="flex space-x-2 items-center">
            <div className="rounded overflow-hidden">
              <Image
                width={40}
                height={40}
                src={item?.image}
                preview={{
                  src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }}
              />
            </div>
            <Text size="sm">{item?.title}</Text>
          </div>
        )
      },
    },
    {
      label: '分类',
      key: 'category',
    },
    {
      label: '售价',
      key: 'price',
    },
    {
      label: '库存',
      key: 'stock',
    },
    {
      label: '状态',
      key: 'status',
      render: (item: any) => {
        return <Badge color={item.status ? 'green' : 'gray'}>{item.status ? '正常' : '下架'}</Badge>
      },
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
  const { data: res, loading } = useRequest(() => productAPI.index({ page: page }), {
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
      <PageHeader title={PageNav?.product?.label} action onClick={() => navigate('/product/add')} />

      <PageContent
        withSelection
        loading={loading}
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

const Product = styled(ProductView)``

Product.displayName = 'Product'
ProductView.displayName = 'ProductView'
export default Product
