import PageHeader from '@/components/PageHeader'
import TextWithDesc from '@/components/TextWithDesc'
import TextWithTranslate from '@/components/TextWithTranslate'
// import Upload from '@/components/Upload'
import { PageNav } from '@/layout/menu'
import {
  createTheme,
  Input,
  MantineProvider,
  Select,
  Textarea,
  Text,
  MultiSelect,
  Anchor,
  Modal,
  Radio,
  Checkbox,
  Transition,
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'

import PageFooter from '@/components/PageFooter'
import UploadView from '@/components/UploadView'

interface Props extends WithClassName {}

const ProductEditView = memo((props: Props) => {
  const { className } = props
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      hidden_content: '',
      images: [],
      params_type: 'single',
      params_list: [
        {
          name: 'Size',
          price_origina: '11',
          price_current: '22',
          stock_count: '11',
          stock_unlimit: false,
          stock_out_status: '继续销售',
          stock_out_warning: false,
        },
      ],
      price_origina: '',
      price_current: '',
      stock_count: '',
      stock_unlimit: false,
      stock_out_status: '继续销售',
      stock_out_warning: false,
      status: true,
      buy_limit: false,
      buy_limit_type: '',
      buy_limit_count: '',
      goods_type: '1',
      category: [],
    },

    validate: {
      title: (value) => (/^\S+$/.test(value) ? null : ' '),
      // description: (value) => (/^\S+$/.test(value) ? null : ' '),
      // buy_limit: (value) => (/^\S+$/.test(value) ? null : ' '),
      // type: (value) => (/^\S+$/.test(value) ? null : ' '),
    },
  })

  const theme = createTheme({
    components: {
      Input: Input.extend({
        defaultProps: {
          variant: 'filled',
        },
      }),

      // InputWrapper: Input.Wrapper.extend({
      //   defaultProps: {
      //     inputWrapperOrder: ['label', 'input', 'description', 'error'],
      //   },
      // }),
    },
  })

  const BasicView = (
    <Card withBorder radius="md">
      <div className="space-y-4">
        <TextInput
          label={<TextWithTranslate field="title" label="标题" />}
          placeholder=""
          {...form.getInputProps('title')}
        />
        <Textarea
          rows={6}
          label={<TextWithTranslate field="content" label="描述" type="textarea" />}
          placeholder=""
          {...form.getInputProps('description')}
        />

        <Transition mounted={form.values.goods_type === '2'} transition="pop" duration={300} timingFunction="ease">
          {(styles) => (
            <Textarea
              style={styles}
              rows={6}
              label={
                <TextWithTranslate
                  field="content"
                  label="自动发货"
                  desc={
                    <Text size="xs" c="orange">
                      此处内容仅在用户付款后可以看到
                    </Text>
                  }
                  type="textarea"
                />
              }
              placeholder=""
              {...form.getInputProps('hidden_content')}
            />
          )}
        </Transition>
      </div>
    </Card>
  )
  const StatusView = (
    <Card withBorder radius="md" className="space-y-6">
      <Checkbox
        label={
          <Text size="sm" fw={500}>
            立即上架销售
          </Text>
        }
        description="只有上架商品才能购买"
        defaultChecked={form.values.status}
        {...form.getInputProps('status')}
      />
      <div className="flex flex-col">
        <Checkbox
          label={
            <Text size="sm" fw={500}>
              设置商品限购
            </Text>
          }
          description="设置不同的购买策略"
          defaultChecked={form.values.buy_limit}
          {...form.getInputProps('buy_limit')}
        />
        {form.values.buy_limit && (
          <div className="flex space-x-2 mt-2">
            <Select data={['每个账号', '每个订单']} placeholder="请选择" {...form.getInputProps('buy_limit_type')} />
            <Input
              placeholder="请输入数量"
              leftSection={<TextWithDesc title="限购" />}
              rightSection={<TextWithDesc title="件" />}
              {...form.getInputProps('buy_limit_count')}
            />
          </div>
        )}
      </div>
    </Card>
  )
  const TypeView = (
    <Card withBorder radius="md" className="space-y-6">
      <Radio.Group
        name="favoriteFr1amework1"
        label="商品类型"
        description="不同的商品类型可显示的内容不同"
        defaultValue={form.values.goods_type}
        {...form.getInputProps('goods_type')}
      >
        <Stack mt="sm">
          <Radio value="1" label="普通商品" description={<span>物流配送/同城自提</span>} />
          <Radio value="2" label="虚拟商品" description={<span>自动发货,付款可见</span>} />
          <Radio value="3" label="预定商品" description={<span>可预约预订的商品</span>} />
        </Stack>
      </Radio.Group>
      <MultiSelect
        label={<TextWithDesc title="商品分类" desc="可以选择多个分类，为空时使用默认分类" />}
        data={['默认', '小吃食品', '饮料酒水', '水果', '面食']}
        clearable
        {...form.getInputProps('category')}
      />
    </Card>
  )

  const PriceView = (
    <div className="space-y-4 mt-4">
      <Grid mt={rem(0)}>
        <Grid.Col span={6}>
          <TextInput
            label="原价"
            description="显示划线价格，例如$25"
            placeholder=""
            {...form.getInputProps('price_origina')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="售价"
            description="商品的当前售价"
            placeholder=""
            {...form.getInputProps('price_current')}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <TextInput
            className="relative"
            label={
              <div className="flex items-center space-x-4">
                <Text fw={500} size="sm">
                  库存数量
                </Text>
                <Checkbox
                  size="xs"
                  labelPosition="left"
                  label="️无限"
                  className="absolute right-0"
                  defaultChecked={form.values.stock_unlimit}
                  {...form.getInputProps('stock_unlimit')}
                />
              </div>
            }
            placeholder=""
            disabled={form.values.stock_unlimit}
            {...form.getInputProps('stock_count')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            className="relative"
            label={
              <div className="flex items-center space-x-4">
                <Text fw={500} size="sm">
                  库存缺货时
                </Text>
                <Checkbox
                  size="xs"
                  labelPosition="left"
                  label="️报警"
                  className="absolute right-0"
                  {...form.getInputProps('stock_out_warning')}
                />
              </div>
            }
            data={['继续销售', '停止销售']}
            {...form.getInputProps('stock_out_status')}
          />
        </Grid.Col>
        {form.values.params_type === 'multiple' && (
          <>
            <Grid.Col span={6}>
              <TextInput label="规格名称" placeholder="" />
            </Grid.Col>
            <Grid.Col span={6} className="flex items-end">
              <Button fullWidth>添加</Button>
            </Grid.Col>
          </>
        )}
      </Grid>
    </div>
  )

  const ParamsView = (
    <Card>
      <Radio.Group
        defaultValue="single"
        name="goods_params_type"
        label="商品规格参数"
        description="不同的商品类型可显示的内容不同"
        {...form.getInputProps('params_type')}
      >
        <Group mt="xs">
          <Radio value="single" label="单一规格" />
          <Radio value="multiple" label="多种规格" />
        </Group>
      </Radio.Group>

      {PriceView}
    </Card>
  )

  const ParamsList = form.values.params_type === 'multiple' && (
    <Card>
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr bg="#f1f3f5">
            <Table.Th>规格名称</Table.Th>
            <Table.Th>原价</Table.Th>
            <Table.Th>售价</Table.Th>
            <Table.Th>库存</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {form.values.params_list.map((item: any, index) => (
            <Table.Tr key={index}>
              <Table.Td>{item.name}</Table.Td>
              <Table.Td>{item.price_origina}</Table.Td>
              <Table.Td>{item.price_current}</Table.Td>
              <Table.Td>{item.stock_count}</Table.Td>
              <Table.Td>
                <div className="flex space-x-2">
                  <Anchor size="xs">编辑</Anchor>
                  <Anchor size="xs">移除</Anchor>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  )

  const ImagesView = (
    <Card withBorder radius="md">
      <TextWithDesc title="商品图片" />
      <UploadView
        maxFile={4}
        onChange={(f) => {
          form.setValues({ images: f as any })
        }}
        imageList={form.values.images as any}
      />
    </Card>
  )

  return (
    <div className={className}>
      <MantineProvider theme={theme}>
        <div className="md:px-24 mb-20">
          <PageHeader
            title={`${PageNav?.product?.label}/${i18n.t('common.add')}`}
            goback={() => navigate('/product')}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <Stack>
                {BasicView}
                {ImagesView}
                {ParamsView}
                {ParamsList}
              </Stack>
            </div>
            <div className="col-span-12 md:col-span-4 space-y-4">
              {StatusView}
              {TypeView}
            </div>
          </div>
        </div>
      </MantineProvider>
      <PageFooter onComfirm={form.onSubmit(console.log)} />
    </div>
  )
})

const ProductEdit = styled(ProductEditView)``
ProductEdit.displayName = 'ProductEdit'
ProductEditView.displayName = 'ProductEditView'
export default ProductEdit
