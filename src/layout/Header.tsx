import NitifyBox from '@/components/NitifyBox'
import SelectLang from '@/components/SelectLang'
import { Badge, Text, Burger, Group, Popover, NavLink, Menu, ActionIcon, Avatar } from '@mantine/core'
import { IconMenu2 } from '@tabler/icons-react'
import { AiOutlineTranslation, AiOutlineUser, AiOutlineBell } from 'react-icons/ai'
import { IconChevronRight, IconSettings, IconLogout, IconUserSquareRounded } from '@tabler/icons-react'

interface Props extends WithClassName {}

const HeaderView = memo((props: Props) => {
  const { className } = props
  const { layout, setCollapsed } = useStore()

  const data = [
    {
      label: 'Dashboard',
    },
    {
      label: 'Security',
    },
    { label: 'Activity' },
  ]
  return (
    <Group h="100%" px="md" className={className}>
      <Burger
        opened={!layout.collapsed}
        onClick={() => {
          setCollapsed()
          // toggle()
          //   onCollapsed(!opened)
        }}
        hiddenFrom="sm"
        size="sm"
        color="#fff"
      />
      <div className="flex flex-1 justify-between h-full">
        <div className="flex items-center">
          <div className="hidden md:block w-[203px]">{i18n.t('app.title')}</div>
        </div>
        <div className="w-full h-full flex justify-between items-center">
          <NavItem className="flex items-center" onClick={setCollapsed}>
            <IconMenu2 size="1.5rem" stroke={1.5} />
          </NavItem>

          <div className="flex space-x-2 items-center h-full">
            <NitifyBox
              child={
                <NavItem className="flex items-center relative">
                  <AiOutlineBell />
                  <Badge
                    className="absolute top-[10px] right-[2px]"
                    size="xs"
                    variant="filled"
                    color="red"
                    w={16}
                    h={16}
                    p={0}
                  >
                    99
                  </Badge>
                </NavItem>
              }
            />
            <SelectLang
              child={
                <NavItem className="flex items-center">
                  <AiOutlineTranslation />
                </NavItem>
              }
            />

            <Menu withArrow position="bottom-end" transitionProps={{ transition: 'pop' }} withinPortal>
              <Menu.Target>
                <NavItem className="flex items-center space-x-1">
                  <IconUserSquareRounded size="1.2rem" stroke={1.5} />
                  <div>admin</div>
                </NavItem>
              </Menu.Target>
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
                  {i18n.t('user.setting')}
                </Menu.Item>
                <Menu.Item leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                  {i18n.t('user.logout')}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
    </Group>
  )
})

const Header = styled(HeaderView)`
  color: #ffffff;
`
const NavItem = styled.div`
  height: 100%;
  padding: 0 10px;
  :hover {
    background: #252a3d;
    cursor: pointer;
  }
`

Header.displayName = 'Header'
HeaderView.displayName = 'HeaderView'
export default Header
