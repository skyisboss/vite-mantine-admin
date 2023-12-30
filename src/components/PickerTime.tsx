import { ActionIcon } from '@mantine/core'
import { IconClock } from '@tabler/icons-react'
import { TimeInput } from '@mantine/dates'

interface Props extends WithClassName {
  label?: React.ReactElement
  leftSection?: React.ReactElement | string
  rightSection?: React.ReactElement | string
  disabled?: boolean
}

const PickerTimeView = memo((props: Props) => {
  const { className, label, leftSection, rightSection, disabled } = props
  const ref = useRef<HTMLInputElement>(null)

  const pickerControl = (
    <ActionIcon size="xs" variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  )

  return (
    <TimeInput
      disabled={disabled}
      leftSection={leftSection}
      rightSection={rightSection}
      size="xs"
      className={className}
      label={label}
    />
  )
})

const PickerTime = styled(PickerTimeView)``

PickerTime.displayName = 'PickerTime'
PickerTimeView.displayName = 'PickerTimeView'
export default PickerTime
