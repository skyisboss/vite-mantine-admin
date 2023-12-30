import { Text, ActionIcon, Tooltip, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'

interface Props extends WithClassName {
  label: string
  icon?: React.ReactElement
  field: string
  type?: 'input' | 'textarea'
}

/**
 * 标题和多语言
 */
const TextWithTranslateView = memo((props: Props) => {
  const { className, label, icon, field, type } = props
  const [opened, { open, close }] = useDisclosure(false)

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
      <div className="flex items-center space-x-1 mb-1">
        <Text size={rem('14px')} fw={500}>
          {label}
        </Text>
        <Tooltip withArrow label={i18n.t('app.langVersion.title')}>
          <ActionIcon variant="default" className="border-none" onClick={open}>
            {icon ? icon : <IconLanguage size="1rem" stroke={2} />}
          </ActionIcon>
        </Tooltip>
      </div>
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
          {type === 'textarea' ? (
            <>
              <Textarea label={i18n.t('app.langVersion.zhField')} placeholder="" {...form.getInputProps('zh')} />
              <Textarea label={i18n.t('app.langVersion.enField')} placeholder="" {...form.getInputProps('en')} />
              <Textarea label={i18n.t('app.langVersion.viField')} placeholder="" {...form.getInputProps('vi')} />
            </>
          ) : (
            <>
              <TextInput label={i18n.t('app.langVersion.zhField')} placeholder="" {...form.getInputProps('zh')} />
              <TextInput label={i18n.t('app.langVersion.enField')} placeholder="" {...form.getInputProps('en')} />
              <TextInput label={i18n.t('app.langVersion.viField')} placeholder="" {...form.getInputProps('vi')} />
            </>
          )}

          <Group justify="flex-end" mt="md">
            <Button type="submit">{i18n.t('app.button.save')}</Button>
          </Group>
        </form>
      </Modal>
    </div>
  )
})

const TextWithTranslate = styled(TextWithTranslateView)``

TextWithTranslate.displayName = 'TextWithTranslate'
TextWithTranslateView.displayName = 'TextWithTranslateView'
export default TextWithTranslate
