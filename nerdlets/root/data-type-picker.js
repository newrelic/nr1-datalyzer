import { Stack, StackItem, Radio } from 'nr1'

export default function DataTypePicker({ setDataType, dataType }) {
  dataType = dataType || 'event'

  return (
    <div className="data-type-picker">
      <Radio onClick={() => setDataType('event')} checked={dataType=='event'} label="Events" className="data-type-picker-radio" />
      <Radio onClick={() => setDataType('metric')} checked={dataType=='metric'} label="Metrics" className="data-type-picker-radio" />
    </div>
  )
}