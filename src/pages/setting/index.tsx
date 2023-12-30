import PageHeader from '@/components/PageHeader'
import { IconTableShare } from '@tabler/icons-react'
import SettingStore from './components/SettingStore'
import SettingStaff from './components/SettingStaff'
import SettingPayment from './components/SettingPayment'
import SettingLogs from './components/SettingLogs'
import useUrlState from '@ahooksjs/use-url-state'

interface Props extends WithClassName {}
const navRows = [
  {
    key: 'store',
    page: <SettingStore className="p-4" />,
    label: i18n.t('system.store'),
    icon: <IconTableShare size="1.2rem" stroke={1.5} />,
  },
  {
    key: 'staff',
    page: <SettingStaff className="-mx-4" />,
    label: i18n.t('system.staff'),
    icon: <IconTableShare size="1.2rem" stroke={1.5} />,
    right: <IconTableShare size="1.2rem" stroke={1.5} />,
  },
  {
    key: 'payment',
    page: <SettingPayment />,
    label: i18n.t('system.payment'),
    icon: <IconTableShare size="1.2rem" stroke={1.5} />,
  },
  {
    key: 'logs',
    page: <SettingLogs className="-mx-4" />,
    label: i18n.t('system.logs'),
    icon: <IconTableShare size="1.2rem" stroke={1.5} />,
  },
]
const SettingView = memo((props: Props) => {
  const { className } = props
  const [state, setState] = useUrlState<{ view?: string }>()
  const view = state?.view || 'store'

  return (
    <div className={className}>
      <div className="md:px-24">
        <PageHeader title={i18n.t('menu.setting')} />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <Card shadow="xs" radius="lg" className="space-y-1">
              {navRows.map(x => (
                <NavStyle key={x.key}>
                  <NavLink
                    active={x.key === view}
                    leftSection={x.icon}
                    label={x.label}
                    onClick={() => setState({ view: x.key })}
                  />
                </NavStyle>
              ))}
            </Card>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Card shadow="xs" radius="lg">
              {navRows.find(x => x.key === view)?.page}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
})

const Setting = styled(SettingView)``
const NavStyle = styled.span`
  .mantine-NavLink-root {
    border-radius: var(--mantine-radius-lg);
  }
`

Setting.displayName = 'Setting'
SettingView.displayName = 'SettingView'
export default Setting
