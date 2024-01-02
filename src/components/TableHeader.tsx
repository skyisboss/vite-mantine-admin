import { ActionIcon, Input, Tooltip, CloseButton } from '@mantine/core'
import { IconListSearch, IconFilter, IconDotsVertical } from '@tabler/icons-react'

interface Nav {
  key: string
  label: string
}
interface Props extends WithClassName {
  navs?: Nav[]
  navChange?: (nav: Nav) => void
  onSearch?: (value: string) => void
  onClose?: (value: boolean) => void
}

const TableHeaderView = memo((props: Props) => {
  const { className, navs, navChange, onSearch, onClose } = props
  const [active, setActive] = useState<Nav>()
  const [searbar, setSearchbar] = useState(false)
  const [value, setValue] = useState('')
  const onClick = (nav: Nav) => {
    setActive(nav)
    navChange?.(nav)
  }

  useEffect(() => {
    if (navs && navs?.length > 0) {
      setActive(navs[0])
    }
  }, [navs])

  useEffect(() => {
    onClose?.(searbar)
  }, [searbar])

  const form = useForm({})

  return (
    <div className={className}>
      <div className="flex justify-between">
        <div className="flex flex-1 space-x-1 overflow-x-auto">
          <div className="overflow-hidden">
            <div className="wrapper">
              {navs?.map((x, index) => (
                <Button
                  key={index}
                  size="xs"
                  variant={active?.key === x.key ? 'light' : 'default'}
                  className={active?.key === x.key ? '' : 'border-none'}
                  onClick={() => onClick(x)}
                >
                  {x.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex space-x-2 pl-3 md:pl-0 ">
          {searbar && (
            <form onSubmit={form.onSubmit(() => onSearch?.(value))}>
              <Input
                placeholder="输入搜索内容..."
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                rightSectionPointerEvents="all"
                size="xs"
                rightSection={
                  <CloseButton
                    aria-label="Clear input"
                    onClick={() => setValue('')}
                    style={{ display: value ? undefined : 'none' }}
                  />
                }
              />
            </form>
          )}
          <Tooltip withArrow label={i18n.t('common.search')} onClick={() => setSearchbar((x) => !x)}>
            <ActionIcon variant={searbar ? 'filled' : 'default'}>
              <IconListSearch size="1.2rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip withArrow label={i18n.t('common.filter')}>
            <ActionIcon variant="default">
              <IconFilter size="1.2rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
    </div>
  )
})

const TableHeader = styled(TableHeaderView)`
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    button {
      flex-shrink: 0;
    }
  }
`

TableHeader.displayName = 'TableHeader'
TableHeaderView.displayName = 'TableHeaderView'
export default TableHeader
