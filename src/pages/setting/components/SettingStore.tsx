import PickerTime from '@/components/PickerTime'
import { Input, Radio, Switch, Text } from '@mantine/core'

interface Props extends WithClassName {}

const SettingStoreView = memo((props: Props) => {
  const { className } = props
  const form = useForm({
    initialValues: {
      zh: '',
      en: '',
      vi: '',
    },
  })
  const onSubmit = (value: any) => {}
  return (
    <div className={className}>
      <form className="space-y-4" onSubmit={form.onSubmit(onSubmit)}>
        {/* <TextInput label={i18n.t('app.langVersion.viField')} placeholder="" {...form.getInputProps('vi')} /> */}
        <TextInput label="店铺名称" placeholder="" {...form.getInputProps('vi')} />
        <TextInput label="所在地址" placeholder="" {...form.getInputProps('vi')} />
        <TextInput label="客服电话" placeholder="" {...form.getInputProps('vi')} />
        <Radio.Group name="favoriteFramework" label="店铺状态" description="休息中状态买家将无法下单消费">
          <Group mt="xs">
            <Radio value="react" label="营业中" />
            <Radio value="svelte" label="休息中" />
          </Group>
        </Radio.Group>
        <Radio.Group name="favoriteFramework2" label="营业时间">
          <Group mt="xs">
            <Radio value="react" label="全天" />
            <Radio value="svelte" label="自定义" />
          </Group>
          <div className="flex flex-col mt-4 space-y-2">
            {[1, 2, 3, 4, 5, 6, 7].map(x => (
              <div key={x} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 text-right">
                  <Text>{`星期${x}`}</Text>
                </div>
                <div className="col-span-5 flex space-x-4">
                  <PickerTime className="flex-1" />
                  <PickerTime className="flex-1" />
                </div>
                <div className="col-span-5">
                  <Switch defaultChecked />
                </div>
              </div>
            ))}
          </div>
        </Radio.Group>

        <Group justify="flex-end" mt="md">
          <Button type="submit">{i18n.t('app.button.save')}</Button>
        </Group>
      </form>
    </div>
  )
})

const SettingStore = styled(SettingStoreView)``

SettingStore.displayName = 'SettingStore'
SettingStoreView.displayName = 'SettingStoreView'
export default SettingStore
