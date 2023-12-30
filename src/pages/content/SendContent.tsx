import PageHeader from '@/components/PageHeader'
import { TitleByMenu } from '@/layout/Sidebar'
import { BackgroundImage, Paper, PaperProps } from '@mantine/core'
import BrImg from '@/assets/images/chat-br.png'
import BgImg from '@/assets/images/chat-bg.png'
import { IconChevronLeft } from '@tabler/icons-react'

interface Props extends WithClassName {}

const SendContentView = memo((props: Props) => {
  const { className } = props
  return (
    <div className={className}>
      <div className="md:px-24">
        <PageHeader title={TitleByMenu(location.pathname)} goback={() => history.back()} />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <Paper radius="md" className="overflow-hidden relative">
              <PaperBox>
                <div className="header">
                  <div className="flex items-center p-2">
                    <IconChevronLeft size="1.5rem" stroke={1.5} />
                    <span>Chats</span>
                  </div>
                </div>
              </PaperBox>
              <div>adasd</div>
            </Paper>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Card>
              <ul className="mt-4 -ml-6 mb-0 list-disc text-sm space-y-1 text-gray-500">
                <li>自动领取</li>
                <li>适用所有用户</li>
                <li>2023-12-20 15:30:00开始</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
})

const PaperBox = styled.div`
  position: relative;
  height: 500px;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url(${BrImg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url(${BgImg});
    background-position: top right;
    background-size: 510px auto;
    background-repeat: repeat;
    mix-blend-mode: overlay;
  }

  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 44px;
    background: #fff;
  }
`
const SendContent = styled(SendContentView)``

SendContent.displayName = 'SendContent'
SendContentView.displayName = 'SendContentView'
export default SendContent
