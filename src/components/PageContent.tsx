import { Checkbox, LoadingOverlay, Text } from '@mantine/core'
import TableHeader from './TableHeader'

export interface NavItem {
  key: string
  label: string
}
export interface ColItem extends NavItem {
  render?: (record?: NavItem) => JSX.Element
}
export interface PageInfo {
  page: number | undefined
  size: number | undefined
  total: number | undefined
}
interface Props extends WithClassName {
  navs: NavItem[]
  cols: ColItem[]
  data: any[]
  loading?: boolean
  navChange?: (key: NavItem) => void
  withSelection?: boolean
  pageInfo?: PageInfo
  pageChange?: (page: number) => void
  onSelection?: (value: number[]) => void
  onSearch?: (value: string) => void
}

const PageContentView = memo((props: Props) => {
  const {
    className,
    navs,
    cols,
    data,
    navChange,
    withSelection,
    pageInfo,
    pageChange,
    onSearch,
    onSelection,
    loading,
  } = props
  const [selection, setSelection] = useState<number[]>([])

  const keys = Object.keys(cols).map((x) => cols[Number(x)].key)

  const toggleAll = () => {
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)))
  }
  const toggleRow = (id: number) =>
    setSelection((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))

  useEffect(() => {
    selection.length > 0 && setSelection([])
  }, [pageInfo?.page])

  const CheckboxItem = (props?: { record?: any }) => {
    if (withSelection) {
      const record = props?.record
      if (props?.record) {
        return (
          <Table.Td>
            <Checkbox size="xs" checked={selection.includes(record?.id)} onChange={() => toggleRow(record?.id)} />
          </Table.Td>
        )
      }
      return (
        <Table.Th style={{ width: rem(40) }}>
          <Checkbox
            size="xs"
            onChange={toggleAll}
            checked={selection.length === data.length}
            indeterminate={selection.length > 0 && selection.length !== data.length}
          />
        </Table.Th>
      )
    }
  }

  return (
    <div className={className}>
      {loading !== undefined && (
        <LoadingOverlay visible={loading} zIndex={50} overlayProps={{ radius: 'sm', blur: 2 }} />
      )}
      <Card shadow="md" radius="md">
        <Card.Section withBorder inheritPadding py="xs" className="relative">
          <TableHeader navs={navs} navChange={navChange} onSearch={(v) => console.log(v)} />
          {selection.length > 0 && (
            <SelectionBox className="p-4">
              <div className="flex items-center space-x-2">
                <Text size="sm" fw={500}>
                  {i18n.t('common.selected', { count: selection.length })}
                </Text>
                <Button size="xs" onClick={() => onSelection?.(selection)}>
                  删除选中
                </Button>
              </div>
            </SelectionBox>
          )}
        </Card.Section>
        <Card.Section className="min-h-80">
          <Table.ScrollContainer minWidth={440}>
            <Table highlightOnHover verticalSpacing="xs">
              <Table.Thead className="relative">
                <Table.Tr bg="#f1f3f5">
                  <CheckboxItem />
                  {cols.map((x, index) => (
                    <Table.Th key={index}>{x.label}</Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.map((element, index) => {
                  const selected = selection.includes(element.id) ? 'rowSelected' : ''
                  return (
                    <Table.Tr key={index} className={selected}>
                      <CheckboxItem record={element} />
                      {keys.map((x, i) => {
                        if (element?.[x] === undefined) {
                          return <Table.Td key={index + '-' + i}>{cols?.[i]?.render?.(element)}</Table.Td>
                        }
                        const render = cols?.[i]?.render
                        if (render && typeof render === 'function') {
                          return <Table.Td key={x}>{render(element)}</Table.Td>
                        }

                        return <Table.Td key={x}>{element?.[x]}</Table.Td>
                      })}
                    </Table.Tr>
                  )
                })}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Card.Section>
      </Card>
      <div className="flex justify-end mt-4">
        <Pagination total={pageInfo?.total ?? 0} value={pageInfo?.page} onChange={pageChange} />
      </div>
    </div>
  )
})

const PageContent = styled(PageContentView)`
  position: relative;
  .rowSelected {
    background-color: var(--mantine-color-blue-light);
  }
`
const SelectionBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgb(255 251 230 / 70%);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
`
// const ToolBar = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: 10;
// `

PageContent.displayName = 'PageContent'
PageContentView.displayName = 'PageContentView'
export default PageContent
