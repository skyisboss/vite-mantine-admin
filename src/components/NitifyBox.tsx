import { Avatar, Card, Divider, List, Text, ThemeIcon } from '@mantine/core'
import { AiOutlineTranslation, AiOutlineUser, AiOutlineBell } from 'react-icons/ai'

interface Props extends WithClassName {
  child: JSX.Element
}

const NitifyBoxView = memo((props: Props) => {
  const { className, child } = props
  return (
    <Popover
      classNames={className}
      width={360}
      position="bottom"
      withArrow
      shadow="md"
      offset={{ mainAxis: 10, crossAxis: -32 }}
    >
      <Popover.Target>{child}</Popover.Target>
      <Popover.Dropdown>
        <Card>
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text fw={500}>{i18n.t('notify.title')}</Text>
              <Text size="sm" c="blue" className="cursor-pointer">
                {i18n.t('notify.read')}
              </Text>
            </Group>
          </Card.Section>
          <Card.Section py="xs">
            {[1, 2, 3, 4, 5].map(x => (
              <NavLink
                key={x}
                className="w-full"
                leftSection={
                  <Avatar color="cyan" radius="xl">
                    MK
                  </Avatar>
                }
                rightSection={
                  <Text size="xs" c="gray" className="mt-[-14px]">
                    5h ago
                  </Text>
                }
                label="Dashboard"
                description="Item with description"
              />
            ))}
          </Card.Section>
          <Card.Section inheritPadding py="xs">
            <Button fullWidth variant="light">
              {i18n.t('notify.all')}
            </Button>
          </Card.Section>
        </Card>
      </Popover.Dropdown>
    </Popover>
  )
})

const NitifyBox = styled(NitifyBoxView)``

NitifyBox.displayName = 'NitifyBox'
NitifyBoxView.displayName = 'NitifyBoxView'
export default NitifyBox
