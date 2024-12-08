import { useRef, useState } from 'react'

import { Swiper, SwiperSlide, SwiperClass  } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { CameraIcon, TrashIcon, PhotoIcon } from '@heroicons/react/16/solid';

import FileInput from '@/components/file-input/FileInput';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import './gallery.scss'

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

  const swiperRef = useRef(null);
  
  return (
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
              <img src={img} />
              
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
  )
}

export default Gallery