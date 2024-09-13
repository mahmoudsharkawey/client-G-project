import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 2000 })])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <img src="https://firebasestorage.googleapis.com/v0/b/hekto-a75a2.appspot.com/o/first-banner.png?alt=media&token=375bdc40-e2eb-44ae-926b-db8aaabf2232" alt="Slide 1" className="w-full h-full object-cover" />
        </div>
        <div className="embla__slide">
          <img src="https://firebasestorage.googleapis.com/v0/b/hekto-a75a2.appspot.com/o/second-banner.png?alt=media&token=ed82b709-32a5-454e-8a97-ea7ec8469f4f" alt="Slide 2" className="w-full h-full object-cover" />
        </div>
        <div className="embla__slide">
          <img src="https://firebasestorage.googleapis.com/v0/b/hekto-a75a2.appspot.com/o/third-banner.png?alt=media&token=f1479f3a-b3dc-48f2-bb44-2def0904debc" alt="Slide 3" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}
