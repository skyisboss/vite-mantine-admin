import SelectLang from '@/components/SelectLang'
import { Card, Title } from '@mantine/core'
import Bg from '@/assets/bg.png'
import { FcGoogle } from 'react-icons/fc'
import { SiTelegram } from 'react-icons/si'

interface Props extends WithClassName {}

const LoginView = memo((props: Props) => {
  const { className } = props

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      authcode: '',
    },

    validate: {
      username: value => (/^\S+$/.test(value) ? null : i18n.t('login.username.placeholder')),
      password: value => (/^\S+$/.test(value) ? null : i18n.t('login.password.placeholder')),
      authcode: value => (/^\d+$/.test(value) ? null : i18n.t('login.authcode.placeholder')),
    },
  })

  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <div className={className}>
      <div className="fw-full mx-auto md:w-[440px] p-4">
        <div style={{ paddingTop: 'calc(12%)' }}>
          <Card padding="xl" className="p-10">
            <div className="mb-8 flex justify-between items-center">
              <Title order={3}>{i18n.t('login.pageTitle')}</Title>
              <SelectLang />
            </div>
            <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                withAsterisk
                label={i18n.t('login.username.label')}
                placeholder={i18n.t('login.username.placeholder')}
                {...form.getInputProps('username')}
              />
              <TextInput
                withAsterisk
                label={i18n.t('login.password.label')}
                placeholder={i18n.t('login.password.placeholder')}
                {...form.getInputProps('password')}
              />
              <TextInput
                withAsterisk
                label={i18n.t('login.authcode.label')}
                placeholder={i18n.t('login.authcode.placeholder')}
                {...form.getInputProps('authcode')}
              />
              <Group className="pt-6" justify="flex-end" mt="md">
                <Button
                  fullWidth
                  size="md"
                  type="submit"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                  //   rightSection={<MdArrowRightAlt />}
                >
                  {i18n.t('login.button')}
                </Button>
              </Group>
            </form>
            <Divider mt="xl" mb="md" label={i18n.t('login.loginWith')} labelPosition="center" />
            <Group justify="center">
              <Button leftSection={<FcGoogle size={14} />} variant="default">
                Google
              </Button>
              <Button leftSection={<SiTelegram size={14} />} variant="default">
                Telegram
              </Button>
            </Group>
          </Card>
        </div>
      </div>
    </div>
  )
})

const Login = styled(LoginView)`
  background: url(${Bg}) 0 0 no-repeat;
  background-size: cover;
  height: 100vh;
`

Login.displayName = 'Login'
LoginView.displayName = 'LoginView'
export default Login
