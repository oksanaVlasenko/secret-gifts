import { useState } from 'react'
import { useDropdownContext } from '@/context/dropdownContext';

import './newValueBlock.scss'

import { useI18n } from '@/i18n-context'
import { PlusIcon } from '@heroicons/react/16/solid'
import Input from '@/components/input/Input'

const NewValueBlock: React.FC = () => {
  const { t } = useI18n()

  const [createNewOption, setCreateNewOption] = useState<boolean>(false)
  const [newValue, setNewValue] = useState<string | number | null | undefined>(null)

  const { onCreateNewValue } = useDropdownContext()

  const handleCancel = () => {
    setNewValue(null)
    setCreateNewOption(false)
  }

  const handleAdd = () => {
    onCreateNewValue?.(newValue)

    handleCancel()
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
            <Input 
              value={newValue ?? ''}
              placeholder={t('system.newValuePlaceholder')}
              onChange={setNewValue}
            />

            <div className='flex justify-center gap-4 mt-4'>
              <button 
                className='btn-outline-red small-btn w-32' 
                onClick={handleCancel}
              >
                { t('system.cancel') }
              </button>

              <button 
                className='btn-filled-red small-btn w-32' 
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