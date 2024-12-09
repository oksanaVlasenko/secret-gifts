import { useRef, useState } from 'react'

import { Swiper, SwiperSlide, SwiperClass  } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';

import { CameraIcon, TrashIcon, PhotoIcon } from '@heroicons/react/16/solid';

import FileInput from '@/components/file-input/FileInput';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import 'swiper/css/zoom';
import './gallery.scss'
import GalleryPopup from '../gallery-popup/GalleryPopup';

interface GalleryProps {
  images: string[],
  onDeleteImage: (index: number) => void,
  onAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  onAddImage,
  onDeleteImage
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>()
  const [thumbsSwiperModal, setThumbsSwiperModal] = useState<SwiperClass>()

  const [openModal, setOpenModal] = useState<boolean>(false)

  const swiperRef = useRef(null);
  const swiperRefModal = useRef(null)

  const closeModal = () => {
    if (thumbsSwiperModal) {
      thumbsSwiperModal.destroy(true, false); // Примусово знищити інстанс
      setThumbsSwiperModal(undefined); // Очистити стан
    }
    setOpenModal(false);
  }

  return (
    <>
      <div className='swiper-container'>
        {
          !images.length ? (
            <PhotoIcon className='empty' />
          ) : (
            <>
              <Swiper
                ref={swiperRef}
                style={
                  {
                    '--swiper-navigation-color': '#9B0D0F',
                    '--swiper-pagination-color': '#9B0D0F',
                    '--swiper-navigation-size': '1.5rem'
                  } as React.CSSProperties
                } 
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {
                  images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img} onClick={() => setOpenModal(true)}/>
                      
                      <div className='delete-bg'>
                        <TrashIcon 
                          className='icon-bg-upload'
                          onClick={() => onDeleteImage(index)}
                        />
                      </div>
                      
                    </SwiperSlide>
                  ))
                }
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                loop={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {
                  images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img} />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </>
          )
        }     

        <FileInput 
          triggerElement={
            <button 
              className={`btn-outline-red with-icon ml-0 mt-4 sm:mt-0`}
            >
              <CameraIcon className='w-4 h-4 mr-2 mb-1 text-[#9B0D0F]' />
              Add photo
            </button>                  
          }
          onFileSelect={onAddImage}
        />
      </div>

      {
        openModal && 
        <GalleryPopup onClose={closeModal}>
          <Swiper
            ref={swiperRefModal}
            //ey={`gallery-swiper-${Date.now()}`}
            style={
              {
                '--swiper-navigation-color': '#9B0D0F',
                '--swiper-pagination-color': '#9B0D0F',
                '--swiper-navigation-size': '1.5rem'
              } as React.CSSProperties
            } 
            loop={true}
            spaceBetween={10}
            navigation={true}
            zoom={{ maxRatio: 3 }}
            thumbs={{ swiper: thumbsSwiperModal }}
            modules={[FreeMode, Navigation, Thumbs, Zoom]}
            className="mySwiperModal"
          >
            {
              images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <img src={img} onClick={() => setOpenModal(true)}/>
                  </div>
                  
                  
                  <div className='delete-bg'>
                    <TrashIcon 
                      className='icon-bg-upload'
                      onClick={() => onDeleteImage(index)}
                    />
                  </div>
                  
                </SwiperSlide>
              ))
            }
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiperModal}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            loop={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {
              images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </GalleryPopup>
      }
    </>
    
  )
}

export default Gallery