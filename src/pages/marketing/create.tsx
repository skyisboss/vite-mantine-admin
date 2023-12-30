import PageHeader from '@/components/PageHeader'
import { TitleByMenu } from '@/layout/Sidebar'
import { Avatar, Text, Accordion, Paper, NavLinkProps } from '@mantine/core'
import BillImg from '@/assets/images/purchase-order-100.png'
import GoodsImg from '@/assets/images/buy-100.png'
import TruckImg from '@/assets/images/truck-100.png'
import UserImg from '@/assets/images/simpson-100.png'
import MarketingImg from '@/assets/images/marketing-100.png'
import FromPage from './FromPage'

interface Props extends WithClassName {}
interface AccordionLabelProps {
  id: string
  label: string
  image: string
  description: string
  content: EventProps[]
}
export interface EventProps {
  id?: number
  label: string
  desc: string
  icon?: string
}
const eventList: AccordionLabelProps[] = [
  {
    id: 'bender',
    image: BillImg,
    label: '订单折扣',
    description: 'Fascinated with cooking, though has no sense of taste',
    content: [
      {
        id: 1,
        label: '秒杀活动',
        desc: '限时限量/低价引流',
        icon: MarketingImg,
      },
      { id: 2, label: '满减券', desc: '如:满100减10元', icon: MarketingImg },
    ],
  },

  {
    id: 'carol',
    image: GoodsImg,
    label: '商品折扣',
    description: 'One of the richest people on Earth',
    content: [
      { id: 3, label: '买X送Y', desc: '如:满两件送一件', icon: MarketingImg },
      { id: 4, label: '第X件折扣', desc: '如:第二件8折', icon: MarketingImg },
      { id: 5, label: '一口价打包', desc: '如:100元任选两件', icon: MarketingImg },
    ],
  },

  {
    id: 'homer',
    image: TruckImg,
    label: '运费折扣',
    description: 'Overweight, lazy, and often ignorant',
    content: [
      { id: 6, label: '运费抵扣券', desc: '减免运费/配送费', icon: MarketingImg },
      { id: 7, label: '包邮商品', desc: '指定商品包邮', icon: MarketingImg },
    ],
  },

  {
    id: 'homer2',
    image: UserImg,
    label: '专享折扣',
    description: 'Overweight, lazy, and often ignorant',
    content: [
      { id: 8, label: '新用户专享', desc: '拉新引流', icon: MarketingImg },
      { id: 9, label: '老用户专享', desc: '维护老客户', icon: MarketingImg },
    ],
  },
]
function AccordionLabel({ label, image, description }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <Avatar src={image} radius="xl" size="lg" />
      <div>
        <Text fw={500}>{label}</Text>
        {/* <Text size="sm" c="dimmed" fw={400}>
          {description}
        </Text> */}
      </div>
    </Group>
  )
}

export const EventBox = memo((props: EventProps & Props & { onClick?: () => void }) => {
  const { className, label, desc, icon, onClick } = props
  return (
    <NavLinkStyle
      h={80}
      className={className}
      leftSection={<Avatar size="lg" radius="xl" src={icon} />}
      label={typeof label === 'string' ? <Text fw={500}>{label}</Text> : label}
      description={desc}
      onClick={onClick}
    />
  )
})

const MarketingCreateView = memo((props: Props) => {
  const { className } = props
  const [selected, setSelected] = useState<any>({ id: 2, label: '满减券', desc: '如:满100减10元', icon: MarketingImg })
  useEffect(() => {}, [selected])

  return (
    <div className={className}>
      <div className="md:px-24">
        <PageHeader
          title={TitleByMenu(location.pathname)}
          goback={!selected ? undefined : () => setSelected(undefined)}
        />

        <Paper className={`md:w-[30rem] ${selected ? 'hidden' : ''}`} radius="lg">
          <Accordion radius="lg" chevronPosition="right" variant="contained">
            {eventList.map((item) => (
              <Accordion.Item value={item.id} key={item.label}>
                <Accordion.Control>
                  <AccordionLabel {...item} />
                </Accordion.Control>
                <Accordion.Panel>
                  {/* <Text size="sm">{item.content}</Text> */}

                  <div className="grid grid-cols-12 gap-4">
                    {item.content.map((x, i) => (
                      <EventBox
                        key={i}
                        className="col-span-12 md:col-span-6"
                        label={x.label}
                        desc={x.desc}
                        icon={x.icon}
                        onClick={() => setSelected(x)}
                      />
                    ))}
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Paper>

        {selected && <FromPage data={selected} />}
      </div>
    </div>
  )
})

const NavLinkStyle = styled(NavLink)<NavLinkProps>`
  border-radius: var(--mantine-radius-md);
  background-color: var(--mantine-color-white);
  transition: background-color 150ms ease, border-color 150ms ease;
  box-shadow: var(--mantine-shadow-xs);
  cursor: default;
  &:not(.event-item) {
    cursor: pointer;
    box-shadow: none;
    border: 1px solid var(--mantine-color-gray-3);
    &:hover {
      border-color: var(--mantine-color-blue-filled);
      background-color: var(--mantine-color-blue-light);
    }
  }
`
const MarketingCreate = styled(MarketingCreateView)``

MarketingCreate.displayName = 'MarketingCreate'
MarketingCreateView.displayName = 'MarketingCreateView'
export default MarketingCreate
