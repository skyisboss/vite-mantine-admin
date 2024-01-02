import {
  IconSmartHome,
  IconMessage,
  IconShoppingCart,
  IconBrandTelegram,
  IconBrandShopee,
  IconBuildingStore,
  IconChartPie,
  IconTableShare,
  IconBooks,
  IconListDetails,
  TablerIconsProps,
  IconSettingsFilled,
} from '@tabler/icons-react'
import { Text, NavLink, Tooltip } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useViewportSize } from '@mantine/hooks'

interface NavbarItem {
  key: string
  label: string
  icon?: (props: TablerIconsProps) => JSX.Element
  path?: string
  active?: boolean
  onClick?(): void
  children?: NavbarItem[]
}

// eslint-disable-next-line react-refresh/only-export-components
export const menus: NavbarItem[] = [
  { key: 'Title', label: i18n.t('menu.admin') },
  {
    key: 'home',
    label: i18n.t('menu.home'),
    icon: IconSmartHome,
    path: '/',
  },
  {
    key: 'order',
    label: i18n.t('menu.order'),
    icon: IconBrandShopee,
    path: '/order',
    children: [
      {
        key: 'add-order',
        label: '分类',
        icon: IconSmartHome,
        path: '/order/add',
      },
    ],
  },
  {
    key: 'product',
    label: i18n.t('menu.product'),
    icon: IconShoppingCart,
    path: '/product',
    children: [
      {
        key: 'category',
        label: i18n.t('menu.category'),
        icon: IconListDetails,
        path: '/product/category',
      },
    ],
  },
  {
    key: 'marketing',
    label: i18n.t('menu.marketing'),
    icon: IconTableShare,
    path: '/marketing',
    children: [
      {
        key: 'marketing-create',
        label: i18n.t('menu.marketingAdd'),
        icon: IconSmartHome,
        path: '/marketing/create',
      },
    ],
  },
  {
    key: 'content',
    label: i18n.t('menu.content'),
    icon: IconMessage,
    path: '/content',
  },
  {
    key: 'analyse',
    label: i18n.t('menu.analyse'),
    icon: IconChartPie,
    path: '/analyse',
  },

  { key: 'Divider', label: '' },
  { key: 'Title', label: i18n.t('menu.platform') },
  {
    key: 'telegram',
    label: i18n.t('menu.telegram'),
    icon: IconBrandTelegram,
    path: '/telegram',
  },
  {
    key: 'store',
    label: i18n.t('menu.store'),
    icon: IconBuildingStore,
  },
  {
    key: 'setting',
    label: i18n.t('menu.setting'),
    icon: IconSettingsFilled,
    path: '/setting',
  },
]

export const SideMenu = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState(location.pathname)
  const { layout, setCollapsed } = useStore()
  const { collapsed } = layout
  const { width } = useViewportSize()
  const isMobile = width <= 640

  const onClick = (e: any, nav: NavbarItem) => {
    e.preventDefault()
    if (nav?.path) {
      setActive(nav.path)
      navigate(nav.path)
      if (isMobile) {
        setCollapsed()
      }
    }
  }
  const isActive = (nav: NavbarItem, isOpen?: boolean) => {
    if (active === '/' && nav.key === 'home') {
      return true
    }
    // return active === nav.path
    return isOpen ? active.indexOf(nav.key) > 0 : active === nav.path
  }

  const makeMenu = (x: NavbarItem, index: number, smallMode?: boolean) => {
    switch (x.key) {
      case 'Divider':
        return <Menu.Divider key={index} />
      case 'Title':
        return !collapsed && <Menu.Label key={index}>{x.label}</Menu.Label>
    }

    const Icon = x?.icon && <x.icon size={collapsed ? '1.3rem' : `1.1rem`} stroke={1.5} />
    const Label = (!collapsed || smallMode || isMobile) && x.label
    let NavItem = (
      <NavLink
        data-item={x.key}
        key={x.key}
        active={isActive(x)}
        leftSection={Icon}
        label={Label}
        onClick={(e) => onClick(e, x)}
        opened={isActive(x, true)}
        href={x?.path}
      >
        {x?.children && x.children.map((x, index) => makeMenu(x, index))}
      </NavLink>
    )

    if (isMobile) {
      return NavItem
    }

    if (collapsed) {
      if (x?.children) {
        NavItem = (
          <Menu key={x.key} position="right" trigger="hover" withArrow width={160}>
            <Menu.Target>
              <NavLink active={isActive(x)} leftSection={Icon} onClick={(e) => onClick(e, x)} opened={isActive(x)} />
            </Menu.Target>
            <Menu.Dropdown>{x?.children && x.children.map((x, index) => makeMenu(x, index, true))}</Menu.Dropdown>
          </Menu>
        )
      } else {
        NavItem = smallMode ? (
          NavItem
        ) : (
          <Tooltip key={x.key} label={x.label} position="right" withArrow>
            {NavItem}
          </Tooltip>
        )
      }
    }

    return NavItem
  }

  return <Menu>{menus.map((x, i) => makeMenu(x, i))}</Menu>
}

// eslint-disable-next-line react-refresh/only-export-components
export const PageNav: {
  [k: string]: NavbarItem
} = {}
menus.map((x) => {
  if (['Title', 'Divider'].includes(x.key)) {
    return
  }

  if (x?.children) {
    const tmp = { ...x }
    delete tmp.children
    PageNav[x.key] = tmp
    x.children.map((x) => (PageNav[x.key] = x))
  } else {
    PageNav[x.key] = x
  }
})
