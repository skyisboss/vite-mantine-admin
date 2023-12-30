import GobackButton from '@/components/GoBack'
import TextWithTranslate from '@/components/TextWithTranslate'
import TextWithDesc from '@/components/TextWithDesc'
import Upload from '@/components/Upload'
import {
  Card,
  Input,
  Text,
  MantineProvider,
  Textarea,
  createTheme,
  Flex,
  Switch,
  Checkbox,
  Radio,
  CheckIcon,
  MultiSelect,
  Select,
  Modal,
  Anchor,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

interface Props extends WithClassName {}

const AddOrderView = memo((props: Props) => {
  const { className } = props
  const [opened, { open, close }] = useDisclosure(false)

  const theme = createTheme({
    components: {
      Input: Input.extend({
        defaultProps: {
          variant: 'filled',
        },
      }),

      InputWrapper: Input.Wrapper.extend({
        defaultProps: {
          inputWrapperOrder: ['label', 'input', 'description', 'error'],
        },
      }),
    },
  })

  const [productActive, setProductActive] = useState(-1)
  const productType = [
    { title: '实物商品', desc: '物流配送/同城自提' },
    { title: '虚拟商品', desc: '自动发货,付款可见' },
    { title: '预订商品', desc: '预订类商品' },
    { title: '展示商品', desc: '仅做内容展示' },
  ]
  const elements = [
    { param: '256GB', param_value: 100, price: 200 },
    { param: '512GB', param_value: 300, price: 200 },
  ]

  return (
    <div className={className}>
      <MantineProvider theme={theme}>
        <div className="px-24 mb-20">
          <GobackButton title="添加内容" />

          <Grid>
            <Grid.Col span={8}>
              <Stack>
                <Card withBorder radius="md">
                  <div className="space-y-4">
                    <TextInput label={<TextWithTranslate field="title" label="标题" />} placeholder="" />
                    <Textarea
                      rows={6}
                      label={<TextWithTranslate field="content" label="描述" type="textarea" />}
                      placeholder=""
                    />
                  </div>
                </Card>

                <Card withBorder radius="md">
                  <TextWithDesc title="商品类型" desc="不同的商品类型可显示的内容不同，商品类型一旦发布后将不可更改" />
                  <Grid mt="xs" gutter="xs">
                    {productType.map((x, index) => (
                      <Grid.Col span={12 / productType.length}>
                        <Button
                          fullWidth
                          h={68}
                          variant={productActive === index ? 'light' : 'default'}
                          radius="md"
                          onClick={() => setProductActive(index)}
                        >
                          <div className="flex flex-col">
                            <Text fw={500}>{x.title}</Text>
                            <Text size="xs" c="gray">
                              {x.desc}
                            </Text>
                          </div>
                        </Button>
                      </Grid.Col>
                    ))}
                  </Grid>

                  <MultiSelectStyle>
                    <MultiSelect
                      mt="md"
                      label={<TextWithDesc title="商品分类" desc="可以选择多个分类，为空时使用默认分类" />}
                      data={['默认', '小吃食品', '饮料酒水', '水果', '面食']}
                      clearable
                    />
                  </MultiSelectStyle>

                  <Input.Wrapper
                    mt="md"
                    label={
                      <div className="flex flex-col">
                        <Switch labelPosition="left" label="商品限购" className="" />
                        <Text size="xs" c="gray">
                          设置商品的购买数量
                        </Text>
                      </div>
                    }
                  >
                    <Group>
                      <Select data={['每个账号', '每个订单']} placeholder="请选择" />
                      <Input
                        placeholder="请输入数量"
                        leftSection={<TextWithDesc title="限购" />}
                        rightSection={<TextWithDesc title="件" />}
                      />
                    </Group>
                  </Input.Wrapper>

                  {productActive === 1 && <Textarea mt="md" label="此处内容付款后可见" placeholder="" />}
                </Card>

                <Card withBorder radius="md">
                  <div className="space-y-4">
                    <Grid mt={rem(0)}>
                      <Grid.Col span={6}>
                        <TextInput label="原价" placeholder="" />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput label="售价" placeholder="" />
                      </Grid.Col>
                    </Grid>

                    <Grid>
                      <Grid.Col span={6}>
                        <TextInput
                          className="relative"
                          label={
                            <div className="flex items-center space-x-4">
                              <Text fw={500} size={rem('14px')}>
                                库存数量
                              </Text>
                              <Switch size="xs" labelPosition="left" label="️不限制库存" className="absolute right-0" />
                              {/* <Checkbox size="xs" labelPosition="left" label="️不限制库存" className="absolute right-0" /> */}
                            </div>
                          }
                          placeholder=""
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Select label="库存缺货时" data={['继续销售', '停止销售']} defaultValue="继续销售" />
                      </Grid.Col>
                    </Grid>
                  </div>
                </Card>

                <Card withBorder radius="md">
                  <Card.Section withBorder inheritPadding py="md">
                    <div className="flex justify-between">
                      <TextWithDesc title="商品规格" desc="为不同规格设置对应的价格" />
                      <Button size="xs" variant="default" onClick={open}>
                        新增规格
                      </Button>
                    </div>
                  </Card.Section>
                  <Card.Section withBorder>
                    <Table highlightOnHover verticalSpacing="xs" horizontalSpacing="xl">
                      <Table.Thead>
                        <Table.Tr bg="#f1f3f5">
                          <Table.Th>规格</Table.Th>
                          <Table.Th>售价</Table.Th>
                          <Table.Th>操作</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {elements.map((element, index) => (
                          <Table.Tr key={index}>
                            <Table.Td>{element.param}</Table.Td>
                            <Table.Td>{element.price}</Table.Td>
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
                  </Card.Section>

                  <Modal
                    opened={opened}
                    onClose={close}
                    size="md"
                    title={i18n.t('app.langVersion.title')}
                    centered
                    overlayProps={{
                      backgroundOpacity: 0.55,
                      blur: 3,
                    }}
                  >
                    <form className="space-y-4">
                      <TextInput label="规格名称" placeholder="" />
                      <TextInput label="库存数量" placeholder="" />
                      <TextInput label="售价" placeholder="" />

                      <Group justify="flex-end" mt="md">
                        <Button type="submit">{i18n.t('app.button.save')}</Button>
                      </Group>
                    </form>
                  </Modal>
                </Card>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Card withBorder radius="md">
                <Text size={rem('14px')} fw={500}>
                  商品图
                </Text>
                <div className="flex flex-col">
                  <Upload className="mt-3" />
                  <Grid className="mt-2" gutter="xs">
                    <Grid.Col span={4}>
                      <Upload mini />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Upload mini />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Upload mini />
                    </Grid.Col>
                  </Grid>
                </div>
              </Card>
            </Grid.Col>
          </Grid>
        </div>
      </MantineProvider>
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderTop: '1px solid var(--mantine-color-gray-3)',
        }}
      >
        <div className="flex justify-center space-x-6 py-4">
          <Button variant="default">退出</Button>
          <Button variant="gradient" gradient={{ from: '#295fff', to: '#2BD0FE', deg: 20 }}>
            保存
          </Button>
        </div>
      </div>
    </div>
  )
})

const AddOrder = styled(AddOrderView)``
const MultiSelectStyle = styled.div`
  span.mantine-MultiSelect-pill {
    background-color: #fff;
  }
`

AddOrder.displayName = 'AddOrder'
AddOrderView.displayName = 'AddOrderView'
export default AddOrder
