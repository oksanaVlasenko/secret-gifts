import './galleryPopup.scss'

interface GalleryPopupProps {
  children: React.ReactNode;
  onClose: () => void;
}

const GalleryPopup: React.FC<GalleryPopupProps> = ({ children, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        
        {children}
      </div>
    </div>
  );
};

export default GalleryPopup;
