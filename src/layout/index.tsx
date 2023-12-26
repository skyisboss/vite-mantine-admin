import { AppShell } from '@mantine/core'
import { useMatches, Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

interface Props extends WithClassName {}

const LayoutBaseView = memo((props: Props) => {
  const { className } = props
  const matches = useMatches()
  const { layout } = useStore()
  useEffect(() => {
    const title = (matches[1].handle as any)?.title
    if (typeof title === 'string' && title) {
      document.title = i18n.t(title)
    }

    // if (!isLogin && matches[1].pathname !== "/login") {
    //   navigate("/login", { replace: true });
    // }
  }, [matches])

  return (
    <AppShell
      header={{ height: 52 }}
      navbar={{
        width: layout.collapsed ? 60 : 220,
        breakpoint: 'sm',
        collapsed: { mobile: !layout.collapsed },
      }}
      padding="md"
    >
      <AppShell.Header bg="#001529">
        <Header />
      </AppShell.Header>
      <AppShell.Navbar p="md" className="!px-0">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main bg="#fbfdfe">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
})

const LayoutBase = styled(LayoutBaseView)``

LayoutBase.displayName = 'LayoutBase'
LayoutBaseView.displayName = 'LayoutBaseView'
export default LayoutBase
