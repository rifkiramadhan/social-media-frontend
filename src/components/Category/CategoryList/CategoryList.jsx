import Slider from 'react-slick';

const CategoryList = ({ categories, onCategorySelect }) => {
  //! Slider categories settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className='mb-10 '>
      {/* Dynamic Categories - Carousel */}
      <Slider {...settings}>
        {categories?.categories?.map(category => (
          <button
            key={category._id}
            className='h-10 inline-flex items-center justify-center w-full sm:w-auto text-center py-3 px-4 rounded-full bg-white border border-gray-200 text-sm font-semibold hover:bg-gray-50 focus:ring focus:ring-orange-200 transition duration-200'
            onClick={() => onCategorySelect(category._id)}
          >
            {category.categoryName} ({category.posts?.length})
          </button>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryList;
