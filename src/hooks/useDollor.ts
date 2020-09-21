import { useContext } from 'react'
import { Context } from '../contexts/DollorProvider'

const useDollor = () => {
  const { dollor } = useContext(Context)
  return dollor
}

export default useDollor
