import { Text } from '@mantine/core'

interface Props extends WithClassName {}

const HomeView = memo((props: Props) => {
  const { className } = props
  return (
    <div className={className}>
      <Text fw={700}>Semibold</Text>
    </div>
  )
})

const Home = styled(HomeView)``

Home.displayName = 'Home'
HomeView.displayName = 'HomeView'
export default Home
