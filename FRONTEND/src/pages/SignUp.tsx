
import { useI18n } from '@/i18n-context'

import '@/styles/pages/signup.scss'

const SighUp = () => {
  const { t } = useI18n()

  return (
    <div className='signup'>
      <h2 className='text-lg'>{t("signup.title")}</h2>
    </div>
  )
}

export default SighUp