import { ActionIcon, Tooltip } from '@mantine/core'
import { IconListSearch, IconFilter } from '@tabler/icons-react'

interface Nav {
  key: string
  label: string
}
interface Props extends WithClassName {
  navs?: Nav[]
  onChange?: (key: string) => void
}

const TableHeaderView = memo((props: Props) => {
  const { className, navs, onChange } = props
  const [active, setActive] = useState(0)
  const handleNavClick = (key: string, index: number) => {
    setActive(index)
    onChange?.(key)
  }
  return (
    <div className={className}>
      <div className="flex justify-between">
        <div className="flex space-x-1">
          {navs?.map((x, index) => (
            <Button
              key={index}
              size="xs"
              variant={index === active ? 'light' : 'default'}
              className={index === active ? '' : 'border-none'}
              onClick={() => handleNavClick(x.key, index)}
            >
              {x.label}
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          <Tooltip withArrow label={i18n.t('page.search')}>
            <ActionIcon variant="default">
              <IconListSearch size="1.2rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip withArrow label={i18n.t('page.filter')}>
            <ActionIcon variant="default">
              <IconFilter size="1.2rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
    </div>
  )
})

const TableHeader = styled(TableHeaderView)``

TableHeader.displayName = 'TableHeader'
TableHeaderView.displayName = 'TableHeaderView'
export default TableHeader
