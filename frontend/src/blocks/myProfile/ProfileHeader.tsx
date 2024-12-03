import { useI18n } from '@/i18n-context'

type ProfileHeaderProps = {
  children: React.ReactNode; 
  avatarUrl: string | '',
  name: string | number | null | undefined
};

const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/); 

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  const initials = words.slice(0, 2)  
    .map(word => word.charAt(0).toUpperCase()) 
    .join('');

  return initials;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ children, avatarUrl, name }) => {
  const { t } = useI18n()

  const initials = getInitials(String(name))

  return (
    <div className="profile-header">
      <div className="general-info">
        {
          avatarUrl ? (
            <img
              className={`profile-img`}
              src={avatarUrl}
              alt="Profile"
            />
          ) : (
            <div className="not-avatar">
              <p>{initials}</p>
            </div>
          )
        }

        <div>
          <h3 className="text-xl font-semibold text-[#3A412C]">
            {t('myProfile.profile')}
          </h3>
          <p className="text-sm text-[#6B8063]">
            {t('myProfile.updateDetails')}
          </p>
        </div>
      </div>

      {children}
    </div>
  )
}

export default ProfileHeader