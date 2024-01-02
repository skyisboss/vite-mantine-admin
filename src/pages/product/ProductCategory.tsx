import { Badge, Select, Text } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { IconGripVertical } from '@tabler/icons-react'
import PageHeader from '@/components/PageHeader'
import TextWithTranslate from '@/components/TextWithTranslate'
import TextWithDesc from '@/components/TextWithDesc'
import UploadView from '@/components/UploadView'
interface Props extends WithClassName {}

const data = [
  { position: 6, status: 1, symbol: '全', label: '全部全部全部全部全部全部' },
  { position: 7, status: 0, symbol: 'N', label: 'Nitrogen' },
  { position: 39, status: 0, symbol: 'Y', label: 'Yttrium' },
  { position: 56, status: 0, symbol: 'Ba', label: 'Barium' },
  { position: 58, status: 0, symbol: 'Ce', label: 'Cerium' },
]
const ProductCategoryView = memo((props: Props) => {
  const { className } = props
  const [state, handlers] = useListState(data)
  const [selected, setSelected] = useState(undefined)

  const handleClick = (item: any) => {
    setSelected(item)
  }

  const items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided, _) => (
        <div
          className="itemDragging item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={() => handleClick(item)}
        >
          <div {...provided.dragHandleProps} className="dragHandle">
            <IconGripVertical style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </div>
          <Text className="symbol">{item.symbol}</Text>
          <div>
            <Text>{item.label}</Text>
            <div className="flex items-center space-x-4">
              <Text c="dimmed" size="sm">
                商品数量: {item.position}
              </Text>
              {item.status === 1 && <Badge size="xs">• 默认分类</Badge>}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  ))
  return (
    <div className={className}>
      <div className="md:px-24">
        <PageHeader title={i18n.t('menu.category')} action />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-5">
            <Card shadow="md">
              <DragDropContext
                onDragEnd={({ destination, source }) =>
                  handlers.reorder({ from: source.index, to: destination?.index || 0 })
                }
              >
                <Droppable droppableId="dnd-list" direction="vertical">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {items}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Card>
          </div>
          {selected && (
            <div className="col-span-12 md:col-span-7">
              <Card shadow="md">
                <div className="flex flex-col space-y-8">
                  <Select label="上级分类" placeholder="Pick value" data={['React', 'Angular', 'Vue', 'Svelte']} />
                  <TextInput
                    label={<TextWithTranslate withAsterisk field="title" label="分类名称" />}
                    description=" "
                    placeholder={i18n.t('login.username.placeholder')}
                  />
                  <div className="flex flex-col">
                    <TextWithDesc title="分类图片" />
                    <UploadView maxFile={1} />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

const ProductCategory = styled(ProductCategoryView)`
  .item {
    display: flex;
    align-items: center;
    border-radius: var(--mantine-radius-md);
    border: 1px solid var(--mantine-color-gray-2, --mantine-color-dark-5);
    padding: var(--mantine-spacing-sm) var(--mantine-spacing-xl);
    padding-left: calc(var(--mantine-spacing-xl) - var(--mantine-spacing-md));
    background-color: var(--mantine-color-white, var--mantine-color-dark-5);
    margin-bottom: var(--mantine-spacing-sm);
  }

  .itemDragging {
    cursor: pointer;
    /* box-shadow: var(--mantine-shadow-sm); */
  }

  .symbol {
    font-size: 30px;
    font-weight: 700;
    width: 60px;
  }

  .dragHandle {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(var(--mantine-color-gray-6), var(--mantine-color-dark-1));
    padding-left: var(--mantine-spacing-md);
    padding-right: var(--mantine-spacing-md);
  }
`

ProductCategory.displayName = 'ProductCategory'
ProductCategoryView.displayName = 'ProductCategoryView'
export default ProductCategory
