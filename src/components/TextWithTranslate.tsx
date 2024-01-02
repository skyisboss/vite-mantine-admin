import { Text, ActionIcon, Tooltip, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button } from '@mantine/core'
import { IconWorldPlus } from '@tabler/icons-react'

interface Props extends WithClassName {
  label: string
  icon?: React.ReactElement
  field: string
  type?: 'input' | 'textarea'
  desc?: JSX.Element
  withAsterisk?: boolean
}

/**
 * 标题和多语言
 */
const TextWithTranslateView = memo((props: Props) => {
  const { className, label, icon, field, type, desc, withAsterisk } = props
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
      <div className="flex flex-col mb-1">
        <div className="flex items-center space-x-1">
          <Text size={rem('14px')} fw={500}>
            <span>{label}</span>
            {withAsterisk && <span style={{ color: 'var(--mantine-color-error)' }}> *</span>}
          </Text>
          <Tooltip withArrow label={i18n.t('app.langVersion.title')}>
            <ActionIcon size="sm" variant="default" className="border-none" onClick={open}>
              {icon ? (
                icon
              ) : (
                <IconWorldPlus size="1rem" stroke={1.5} color="var(--mantine-primary-color-light-color)" />
              )}
            </ActionIcon>
          </Tooltip>
        </div>
        {desc}
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
