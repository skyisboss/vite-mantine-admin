import TextWithDesc from '@/components/TextWithDesc'
import { Anchor, Modal } from '@mantine/core'

interface Props extends WithClassName {}

const SettingStaffView = memo((props: Props) => {
  const { className } = props
  const [opened, { open, close }] = useDisclosure(false)
  const elements = [
    { param: '256GB', param_value: 100, price: 200 },
    { param: '512GB', param_value: 300, price: 200 },
  ]
  const form = useForm({
    initialValues: {
      zh: '',
      en: '',
      vi: '',
    },
  })
  const onSubmit = (value: any) => {
    close()
  }

  return (
    <div className={className}>
      <div className="m-4 mx-8 flex items-center justify-between">
        <TextWithDesc title="员工管理" desc="设置店铺员工和权限" titleSize="1rem" />
        <Button size="xs" variant="default" onClick={open}>
          添加员工
        </Button>
      </div>
      <Table highlightOnHover verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr bg="#f1f3f5">
            <Table.Th className="text-center">账号</Table.Th>
            <Table.Th>角色</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {elements.map((element, index) => (
            <Table.Tr key={index}>
              <Table.Td>{element.param}</Table.Td>
              <Table.Td>{element.price}</Table.Td>
              <Table.Td>
                <span className="space-x-2">
                  <Anchor size="xs">编辑</Anchor>
                  <Anchor size="xs">移除</Anchor>
                </span>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Modal
        opened={opened}
        onClose={close}
        size="md"
        title={i18n.t('app.langVersion.title')}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form className="space-y-4" onSubmit={form.onSubmit(onSubmit)}>
          <TextInput label={i18n.t('app.langVersion.zhField')} placeholder="" {...form.getInputProps('zh')} />
          <TextInput label={i18n.t('app.langVersion.enField')} placeholder="" {...form.getInputProps('en')} />
          <TextInput label={i18n.t('app.langVersion.viField')} placeholder="" {...form.getInputProps('vi')} />

          <Group justify="flex-end" mt="md">
            <Button type="submit">{i18n.t('app.button.save')}</Button>
          </Group>
        </form>
      </Modal>
    </div>
  )
})

const SettingStaff = styled(SettingStaffView)`
  .mantine-Table-th,
  .mantine-Table-td {
    text-align: center;
  }
`

SettingStaff.displayName = 'SettingStaff'
SettingStaffView.displayName = 'SettingStaffView'
export default SettingStaff
