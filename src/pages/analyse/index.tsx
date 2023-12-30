import PageHeader from '@/components/PageHeader'
import { TitleByMenu } from '@/layout/Sidebar'
import { SegmentedControl } from '@mantine/core'
import { DatePicker } from 'antd'

interface Props extends WithClassName {}

const { RangePicker } = DatePicker
const AnalyseView = memo((props: Props) => {
  const { className } = props
  const [ctrl, setCtrl] = useState('1')

  const dateList = [
    { value: '1', label: '今日' },
    { value: '2', label: '昨日' },
    { value: '3', label: '本周' },
    { value: '4', label: '本月' },
    { value: '5', label: '其他' },
  ]
  const onChange = (value: string) => {
    console.log(value)
    setCtrl(value)
    // if ('5' === value) {}
  }
  return (
    <div className={className}>
      <PageHeader title={TitleByMenu(location.pathname)} />
      <div className="flex mb-4 flex-col md:flex-row">
        <SegmentedControl bg="var(--mantine-color-gray-3)" data={dateList} defaultValue={ctrl} onChange={onChange} />
        {ctrl === '5' && <RangePicker className="md:ml-4" />}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <Card>
            <Card.Section inheritPadding p="md">
              basd
            </Card.Section>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-4">
          <Card>
            <Card.Section inheritPadding p="md">
              basd
            </Card.Section>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-4">
          <Card>
            <Card.Section inheritPadding p="md">
              basd
            </Card.Section>
          </Card>
        </div>
      </div>
    </div>
  )
})

const Analyse = styled(AnalyseView)``

Analyse.displayName = 'Analyse'
AnalyseView.displayName = 'AnalyseView'
export default Analyse
