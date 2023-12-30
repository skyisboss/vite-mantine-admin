import CheckLinkBox from '@/components/CheckLinkBox'
import TextWithDesc from '@/components/TextWithDesc'
import { Avatar, Radio, Select, Text } from '@mantine/core'

interface Props extends WithClassName {}

const SettingPaymentView = memo((props: Props) => {
  const { className } = props

  return (
    <div className={className}>
      <div className="m-2 space-y-8">
        <div className="space-y-2">
          <TextWithDesc title="付款方式" desc="设置付款和货币信息" titleSize="1rem" />

          <div className="grid grid-cols-12 gap-2">
            <CheckLinkBox
              className="col-span-3"
              label="现金支付"
              desc="使用现金付款"
              icon={
                <Avatar color="cyan" radius="xl">
                  MK
                </Avatar>
              }
            />
            <CheckLinkBox
              className="col-span-3"
              label="芒果钱包"
              desc="数字货币支付"
              icon={
                <Avatar color="cyan" radius="xl">
                  MK
                </Avatar>
              }
            />
            <CheckLinkBox
              className="col-span-3"
              label="支付宝"
              desc="支付宝扫码"
              icon={
                <Avatar color="cyan" radius="xl">
                  MK
                </Avatar>
              }
            />
            <CheckLinkBox
              className="col-span-3"
              label="微信"
              desc="微信扫码"
              icon={
                <Avatar color="cyan" radius="xl">
                  MK
                </Avatar>
              }
            />
            <CheckLinkBox
              className="col-span-3"
              label="GCash"
              desc="菲律宾GCash"
              icon={
                <Avatar color="cyan" radius="xl">
                  MK
                </Avatar>
              }
            />
          </div>
        </div>

        <Radio.Group name="favoriteFramework" label="默认显示的货币" description="">
          <Group mt="xs">
            <Stack>
              <Radio value="react" label="CNY/¥" />
              <Radio value="svelte" label="USD/$" />
              <Radio value="ng" label="PHP/₱" />
            </Stack>
          </Group>
        </Radio.Group>
      </div>
    </div>
  )
})

const SettingPayment = styled(SettingPaymentView)``

SettingPayment.displayName = 'SettingPayment'
SettingPaymentView.displayName = 'SettingPaymentView'
export default SettingPayment
