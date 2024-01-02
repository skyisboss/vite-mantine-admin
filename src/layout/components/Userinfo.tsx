import { Badge, Text, Burger, Group, Popover, NavLink, Menu, ActionIcon, Avatar } from '@mantine/core'
import { IconChevronRight, IconSettings, IconLogout, IconUserSquareRounded } from '@tabler/icons-react'
import { modals } from '@mantine/modals'
import { useNavigate } from 'react-router-dom'

interface Props extends WithClassName {
  child: React.JSX.Element
}

const UserinfoView = memo((props: Props) => {
  const { className, child } = props
  const navigate = useNavigate()

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      size: 'xs',
      title: <Text fw={500}>{i18n.t('user.logoutConfirmTitle')}</Text>,
      labels: { confirm: i18n.t('app.button.confirm'), cancel: i18n.t('app.button.cancel') },
      onConfirm: () => {
        navigate('/login')
      },
    })
  return (
    <Menu classNames={className} withArrow position="bottom-end" transitionProps={{ transition: 'pop' }} withinPortal>
      <Menu.Target>{child}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <div>
            <Text fw={500}>admin</Text>
            <Text size="xs" c="dimmed">
              neggshaker@mantine.dev
            </Text>
          </div>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
          {i18n.t('user.help')}
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
          {i18n.t('user.bill')}
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
          {i18n.t('user.setting')}
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          onClick={openModal}
        >
          {i18n.t('user.logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
})

const Userinfo = styled(UserinfoView)``

Userinfo.displayName = 'Userinfo'
UserinfoView.displayName = 'UserinfoView'
export default Userinfo
