import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryList = ({ categories, onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const sliderRef = useRef(null);

  const CustomArrow = ({ onClick, direction }) => (
    <button
      className={`z-10 !flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-4xl focus:outline-none absolute top-1/2 transform -translate-y-1/2 ${
        direction === 'prev' ? 'left-2' : 'right-2'
      }`}
      onClick={onClick}
    >
      {direction === 'prev' ? (
        <ChevronLeft className='w-5 h-5 text-gray-600' />
      ) : (
        <ChevronRight className='w-5 h-5 text-gray-600' />
      )}
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    prevArrow: <CustomArrow direction='prev' />,
    nextArrow: <CustomArrow direction='next' />,
    beforeChange: (current, next) => {
      setIsAtStart(next === 0);
      setIsAtEnd(
        next + settings.slidesToShow >= categories?.categories?.length
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const handleCategoryClick = categoryId => {
    setActiveCategory(categoryId);
    onCategorySelect(categoryId);
  };

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        setIsAtEnd(
          sliderRef.current.innerSlider.state.currentSlide +
            settings.slidesToShow >=
            categories?.categories?.length
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categories]);

  return (
    <div className='relative mb-10'>
      <div className='overflow-hidden'>
        <Slider ref={sliderRef} {...settings}>
          {categories?.categories?.map(category => (
            <div key={category._id} className='px-1'>
              <button
                className={`h-10 inline-flex items-center justify-center w-full text-center py-3 px-4 rounded-full border border-gray-200 text-sm font-semibold transition duration-200 
                  ${
                    activeCategory === category._id
                      ? 'bg-orange-200 text-orange-800'
                      : 'bg-white text-gray-800 hover:bg-gray-50 focus:ring focus:ring-orange-200'
                  }`}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.categoryName} ({category.posts?.length})
              </button>
            </div>
          ))}
        </Slider>
      </div>
      {!isAtStart && (
        <div className='absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none'></div>
      )}
      {!isAtEnd && (
        <div className='absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none'></div>
      )}
    </div>
  );
};

export default CategoryList;
