import { ActionIcon, AppShell, Tooltip, UnstyledButton } from '@mantine/core'
import { useNavigate, NavLink as NavLinkTo } from 'react-router-dom'
import {
  IconSmartHome,
  IconMessage,
  IconShoppingCart,
  IconBrandTelegram,
  IconSettings,
  IconBrandShopee,
  IconHelpSquareRoundedFilled,
  IconBuildingStore,
  IconDeviceAnalytics,
  IconSettingsFilled,
  IconChartPie,
  IconTableShare,
} from '@tabler/icons-react'

interface Props extends WithClassName {}
interface NavbarItem {
  key: string
  label: string
  icon?: JSX.Element
  iconActive?: JSX.Element
  path?: string
  active?: boolean
  onClick?(): void
  children?: NavbarItem[]
}
export const MenuData: NavbarItem[] = [
  { key: 'Label', label: i18n.t('menu.admin') },
  {
    key: 'home',
    label: i18n.t('menu.home'),
    icon: <IconSmartHome size="1.1rem" stroke={1.5} />,
    path: '/',
  },
  {
    key: 'order',
    label: i18n.t('menu.order'),
    icon: <IconBrandShopee size="1.1rem" stroke={1.5} />,
    path: '/order',
    children: [
      {
        key: 'add-order',
        label: '分类',
        icon: <IconSmartHome size="1.1rem" stroke={1.5} />,
        path: '/order/add',
      },
    ],
  },
  {
    key: 'product',
    label: i18n.t('menu.product'),
    icon: <IconShoppingCart size="1.1rem" stroke={1.5} />,
    path: '/product',
  },
  {
    key: 'content',
    label: i18n.t('menu.content'),
    icon: <IconMessage size="1.1rem" stroke={1.5} />,
    path: '/content',
  },
  {
    key: 'analyse',
    label: i18n.t('menu.analyse'),
    icon: <IconChartPie size="1.1rem" stroke={1.5} />,
    path: '/analyse',
  },
  {
    key: 'marketing',
    label: i18n.t('menu.marketing'),
    icon: <IconTableShare size="1.1rem" stroke={1.5} />,
    path: '/marketing',
    children: [
      {
        key: 'marketing-create',
        label: i18n.t('menu.marketingAdd'),
        icon: <IconSmartHome size="1.1rem" stroke={1.5} />,
        path: '/marketing/create',
      },
    ],
  },
  { key: 'Divider', label: '' },
  { key: 'Label', label: i18n.t('menu.platform') },
  {
    key: 'telegram',
    label: i18n.t('menu.telegram'),
    icon: <IconBrandTelegram size="1.1rem" stroke={1.5} />,
    path: '/telegram',
  },
  {
    key: 'store',
    label: i18n.t('menu.store'),
    icon: <IconBuildingStore size="1.1rem" stroke={1.5} />,
  },
]

export function FindNode(menu: NavbarItem[], search: string): NavbarItem | undefined {
  for (const item of menu) {
    if (item.path === search) {
      return item
    }

    if (item.children) {
      const foundInChildren = FindNode(item.children, search)
      if (foundInChildren) {
        return foundInChildren
      }
    }
  }

  return undefined
}

export const TitleByMenu = (search: string) => FindNode(MenuData, search)?.label ?? ''

const SidebarView = memo((props: Props) => {
  const { className } = props
  const navigate = useNavigate()
  const { collapsed } = useStore((state) => state.layout)
  const [active, setActive] = useState(location.pathname)

  const isActive = (nav: NavbarItem) => {
    if (active === '/' && nav.key === 'home') {
      return true
    }
    return active.indexOf(nav.key) > 0
  }
  const handleClick = useCallback((e: any, nav: NavbarItem) => {
    e.preventDefault()
    if (nav?.path) {
      setActive(nav.path)
      navigate(nav.path)
    }
  }, [])

  const createNavLink = (nav: NavbarItem, index: string | number, smallMode?: boolean) => {
    if (nav.key === 'Divider') {
      return (
        <Menu key={index}>
          <Menu.Divider />
        </Menu>
      )
    }
    if (nav.key === 'Label') {
      return !collapsed ? (
        <Menu key={index}>
          <Menu.Label>{nav.label}</Menu.Label>
        </Menu>
      ) : (
        <></>
      )
    }

    const NavLinkItem = (
      <NavLink
        key={nav.key}
        active={isActive(nav)}
        leftSection={nav.icon}
        label={!collapsed || smallMode ? nav.label : <></>}
        onClick={(e) => handleClick(e, nav)}
        opened={isActive(nav)}
      >
        {nav?.children && nav.children.map((x, index) => createNavLink(x, index))}
      </NavLink>
    )
    if (collapsed) {
      if (nav?.children) {
        return (
          <Menu key={nav.key} position="right" trigger="hover" withArrow width={160}>
            <Menu.Target>
              <NavLink
                active={isActive(nav)}
                leftSection={nav?.icon}
                onClick={(e) => handleClick(e, nav)}
                opened={isActive(nav)}
              />
            </Menu.Target>
            <Menu.Dropdown>{nav.children.map((x, index) => createNavLink(x, index, true))}</Menu.Dropdown>
          </Menu>
        )
      }
      return smallMode ? (
        NavLinkItem
      ) : (
        <Tooltip key={nav.key} label={nav.label} position="right" withArrow transitionProps={{ duration: 0 }}>
          {NavLinkItem}
        </Tooltip>
      )
    }

    return NavLinkItem
  }

  return (
    <div className={className}>
      <AppShell.Section className="px-2 flex-1">{MenuData.map((x, index) => createNavLink(x, index))}</AppShell.Section>
      <AppShell.Section className="px-2">
        {collapsed ? (
          <Tooltip label={i18n.t('menu.help')} position="right" withArrow transitionProps={{ duration: 0 }}>
            <NavLink
              leftSection={
                <IconHelpSquareRoundedFilled size="1.2rem" stroke={1.5} color="var(--mantine-color-gray-6)" />
              }
              onClick={(e) =>
                handleClick(e, {
                  key: 'setting',
                  path: '/setting',
                  label: '',
                })
              }
            />
          </Tooltip>
        ) : (
          <NavLink
            leftSection={<IconSettingsFilled size="1.2rem" stroke={1.5} color="var(--mantine-color-gray-6)" />}
            href="/setting"
            label={i18n.t('menu.setting')}
            onClick={(e) =>
              handleClick(e, {
                key: 'setting',
                path: '/setting',
                label: '',
              })
            }
          />
        )}
      </AppShell.Section>
    </div>
  )
})

const Sidebar = styled(SidebarView)`
  --_nav-link-color: var(--mantine-color-gray-8);
  display: flex;
  flex-direction: column;
  flex: 1;
`

Sidebar.displayName = 'Sidebar'
SidebarView.displayName = 'SidebarView'
export default Sidebar
