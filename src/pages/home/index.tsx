import PageHeader from '@/components/PageHeader'
import StatsGrid from '@/components/StatsGrid'
import { SimpleGrid } from '@mantine/core'
import { IconUserPlus, IconDiscount2 } from '@tabler/icons-react'
import SalesCount from './components/SalesCount'
import { MenuData } from '@/layout/Sidebar'

interface Props extends WithClassName {}

const HomeView = memo((props: Props) => {
  const { className } = props
  return (
    <div className={className}>
      <PageHeader title={MenuData.find(x => x.key === 'home')?.label ?? ''} />
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
        {[1, 2, 3, 4].map(x => (
          <StatsGrid
            key={x}
            title="交易金额"
            value="100"
            diff={40}
            icon={<IconUserPlus size="1.4rem" stroke={1.5} color="var(--mantine-color-gray-6)" />}
          />
        ))}
      </SimpleGrid>
      <SalesCount className="mt-8" />
    </div>
  )
})

const Home = styled(HomeView)``

Home.displayName = 'Home'
HomeView.displayName = 'HomeView'
export default Home
