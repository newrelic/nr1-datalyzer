import { Stack, StackItem, Radio } from 'nr1'

export default function DataTypePicker({ setDataType, dataType }) {
  dataType = dataType || 'event'

  return <Stack>
    <StackItem>
      <Radio onClick={() => setDataType('event')} checked={dataType=='event'} label="Events" />
    </StackItem>
    <StackItem>
      <Radio onClick={() => setDataType('metric')} checked={dataType=='metric'} label="Metrics" />
    </StackItem>
  </Stack>
}