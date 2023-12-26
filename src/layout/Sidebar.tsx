import { AppShell, UnstyledButton, rem } from '@mantine/core'
import { AiFillDashboard } from 'react-icons/ai'
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconHelpSquareRoundedFilled,
} from '@tabler/icons-react'

interface Props extends WithClassName {}
interface NavbarLinkProps {
  key: string
  label: string
  icon?: JSX.Element
  iconActive?: JSX.Element
  active?: boolean
  onClick?(): void
  child?: NavbarLinkProps[]
}
const SidebarView = memo((props: Props) => {
  const { className } = props

  const menuData: NavbarLinkProps[] = [
    {
      key: 'Dashboard',
      label: 'Dashboard',
      icon: <IconHome2 size="1.1rem" stroke={1.5} />,
    },
    {
      key: 'Dashboard2',
      label: 'Dashboard2',
      icon: <IconHome2 size="1.1rem" stroke={1.5} />,
    },
    {
      key: 'Dashboard2',
      label: 'Dashboard2',
      icon: <IconHome2 size="1.1rem" stroke={1.5} />,
    },
    { key: 'Divider', label: '', icon: undefined },
    { key: 'Label', label: 'Label', icon: undefined },
    {
      key: 'Dashboard2',
      label: 'Dashboard2',
      icon: <IconHome2 size="1.1rem" stroke={1.5} />,
    },
  ]

  return (
    <div className={className}>
      <AppShell.Section className="px-2 flex-1">
        {menuData.map(x => {
          return x.key === 'Divider' ? (
            <Menu>
              <Menu.Divider />
            </Menu>
          ) : x.key === 'Label' ? (
            <Menu>
              <Menu.Label>{x.label}</Menu.Label>
            </Menu>
          ) : (
            <NavLink key={x.key} leftSection={x.icon} label={x.label} />
          )
        })}
      </AppShell.Section>
      <AppShell.Section className="px-2">
        <NavLink
          leftSection={<IconHelpSquareRoundedFilled size="1.2rem" stroke={1.5} color="var(--mantine-color-gray-6)" />}
          label="help"
        />
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
