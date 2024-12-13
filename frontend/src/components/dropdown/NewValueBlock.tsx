import { useState } from 'react'
import { useDropdownContext } from '@/context/dropdownContext';

import './newValueBlock.scss'

import { useI18n } from '@/i18n-context'
import { PlusIcon } from '@heroicons/react/16/solid'
import Input from '@/components/input/Input'
import TransparentLoader from '@/components/loader/TransparentLoader';

const NewValueBlock: React.FC = () => {
  const { t } = useI18n()

  const [createNewOption, setCreateNewOption] = useState<boolean>(false)
  const [newValue, setNewValue] = useState<string | number | null | undefined>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [newValueError, setNewValueError] = useState<string | number | null | undefined>('')

  const { onCreateNewValue } = useDropdownContext()

  const handleInput = (value: string | number | null | undefined) => {
    setNewValue(value)
    setNewValueError('')
  }
 
  const handleCancel = () => {
    setNewValue(null)
    setCreateNewOption(false)
    setLoading(false)
    setNewValueError('')
  }

  const handleAdd = async () => {
    setLoading(true)
    const result = await onCreateNewValue?.(newValue)
      
    setLoading(false);

    if (result?.success) {
      console.log('end');
      handleCancel();
    } else {
      console.log(result?.error);
      setNewValueError(result?.error)
    }
  }

  return (
    <div className="dropdown-footer">
      {
        !createNewOption ? (
          <button 
            className='btn-outline-red small-btn with-icon text-xs min-w-40 w-full my-3 mx-auto' 
            onClick={() => setCreateNewOption(true)}
          >
            <PlusIcon className='w-4 h-4 mr-2 text-[#9B0D0F]' />
            
            { t('system.openCreationBlock') }
          </button>
        ) : (
          <div className='new-option-container'>
            { loading && <TransparentLoader />}

            <Input 
              value={newValue ?? ''}
              errorText={newValueError}
              placeholder={t('system.newValuePlaceholder')}
              onChange={handleInput}
            />

            <div className='flex justify-center gap-4 mt-4 z-10'>
              <button 
                className='btn-outline-red small-btn w-32' 
                onClick={handleCancel}
              >
                { t('system.cancel') }
              </button>

              <button 
                className={`btn-filled-red small-btn w-32 ${!newValue ? 'disabled' : ''}`}
                onClick={handleAdd}
              >
                { t('system.add') }
              </button>
            </div>
          </div>
          
        )
      }
      </div>
  )
}

export default NewValueBlock