import { Checkbox, List, Paper, Radio } from '@mantine/core'
import { EventBox, EventProps } from './create'
import TextWithDesc from '@/components/TextWithDesc'
import { DatePicker, TimePicker, Space } from 'antd'

interface Props extends WithClassName {
  data: EventProps
}

const FromPageView = memo((props: Props) => {
  const { className, data } = props
  const form = useForm({
    initialValues: {
      zh: '',
      en: '',
      vi: '',
    },
  })

  return (
    <div className={className}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <EventBox className="event-item" label={data?.label} desc={data?.desc} icon={data?.icon} onClick={() => {}} />
          <div className="mt-4 space-y-2"></div>
          <Card>
            <TextWithDesc title="概览" />
            <ul className="mt-4 -ml-6 mb-0 list-disc text-sm space-y-1 text-gray-500">
              <li>自动领取</li>
              <li>适用所有用户</li>
              <li>2023-12-20 15:30:00开始</li>
            </ul>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-8">
          <form className="space-y-4">
            <Card shadow="xs" radius="md" className="space-y-4">
              <TextInput
                label="活动标题"
                description="客户将在活动落地页、购物车中和在结账时看到此标题"
                placeholder=""
                {...form.getInputProps('vi')}
              />
              <Radio.Group name="favoriteFramework" label="发放方式">
                <Group mt="xs">
                  <Radio value="react" label="自动领取" />
                  <Radio value="svelte" label="用户领取" />
                </Group>
              </Radio.Group>

              <Radio.Group name="favoriteFramework2" label="适用用户">
                <Group mt="xs">
                  <Radio value="react" label="所有用户" />
                  <Radio value="svelte" label="指定用户" />
                </Group>
              </Radio.Group>
            </Card>

            <Card shadow="xs" radius="md" className="space-y-4">
              <div className="space-y-2">
                <TextWithDesc title="活动开始时间" />
                <div className="flex space-x-4">
                  <DatePicker onChange={() => {}} />
                  <TimePicker onChange={() => {}} />
                </div>
              </div>
              <div className="space-y-2">
                <TextWithDesc title="活动结束时间" />
                <div className="flex space-x-4">
                  <DatePicker onChange={() => {}} />
                  <TimePicker onChange={() => {}} />
                </div>
              </div>
              <Checkbox value="react" label="永不过期" />
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
})

const FromPage = styled(FromPageView)``

FromPage.displayName = 'FromPage'
FromPageView.displayName = 'FromPageView'
export default FromPage
