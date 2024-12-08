import Input from "@/components/input/Input"
import { Tooltip } from 'react-tooltip'
import { useI18n } from '@/i18n-context'

import { validateUrl } from '@/utils/validator'

import 'react-tooltip/dist/react-tooltip.css'
import { useState } from "react"

interface SearchUrlProps {
  url: string | number | null | undefined,
  onUrlChange: (value: string | number | null | undefined ) => void
  onFetchData?: () => void
}

const SearchUrl: React.FC<SearchUrlProps> = ({
  url,
  onUrlChange,
  onFetchData
}) => {
  const { t } = useI18n()

  const [urlErrors, setUrlErrors] = useState<string | number | null | undefined>('')

  const handleInput = (e: string | number | null | undefined) => {
    const isUrlValid = e ? validateUrl(String(e)) : true

    if (!isUrlValid) {
      setUrlErrors(t('system.invalidUrl'))
    } else {
      setUrlErrors('')
    }

    onUrlChange(e)
  }

  return (
    <div className='search'>
      <Input 
        value={url}
        placeholder={t('product.urlPlaceholder')}
        errorText={urlErrors}
        onChange={handleInput}
      />

      <button 
        data-tooltip-id="my-tooltip" 
        data-tooltip-content={t('product.autofillTooltip')}
        className={`btn-outline-red ml-0 sm:mt-0 ${!url || urlErrors ? 'disabled' : ''}`}
        onClick={onFetchData}
      >
        { t('product.autofill') }
      </button>

      <Tooltip id="my-tooltip" className="tooltip" opacity={0.6} />
    </div>
  )
}

export default SearchUrl