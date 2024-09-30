import '../PostCss.css';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchAllPosts } from '../../../APIServices/posts/postsAPI';
import { Link } from 'react-router-dom';
import NoDataFound from '../../Alert/NoDataFound/NoDataFound';
import AlertMessage from '../../Alert/AllertMessage/AllertMessage';
import CategoryList from '../../Category/CategoryList/CategoryList';
import { fetchCategoriesAPI } from '../../../APIServices/categories/categoriesAPI';
import { FaSearch } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import truncateString from '../../../utils/truncateString';

const PostList = () => {
  //! Filtering State
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  //! User Query
  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ['lists-posts', { ...filters, page }],
    queryFn: () =>
      fetchAllPosts({ ...filters, title: searchTerm, page, limit: 10 }),
  });

  //! Category Filter Handler
  const handleCategoryFilter = categoryId => {
    setFilters({ ...filters, category: categoryId });
    setPage(1);
    refetch();
  };

  //! Handle Search Handler
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  //! Handle Submit Search Term Handler
  const handleSearchSubmit = e => {
    e.preventDefault();
    setFilters({ ...filters, title: searchTerm });
    setPage(1);
    refetch();
  };

  //! Handle Page Change Handler
  const handlePageChange = newPage => {
    setPage(newPage);
    refetch();
  };

  //! Handler Clear Filters Handler
  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setPage(1);
    refetch();
  };

  //! Fetch Categories
  const { data: categoriesData } = useQuery({
    queryKey: ['category-lists'],
    queryFn: fetchCategoriesAPI,
  });

  return (
    <section className='overflow-hidden'>
      <div className='container px-4 mx-auto'>
        <h1 className='text-4xl lg:text-6xl font-bold font-heading mb-6 mt-16'>
          Satgasnas News
        </h1>
        {/* featured post */}
        {/* <FeaturedPost post={featuredPost} /> */}
        <h2 className='text-4xl font-bold font-heading mb-10'>
          Latest articles
        </h2>
        {/* Searching Feature */}
        <form
          onSubmit={handleSearchSubmit}
          className='flex flex-grid items-center gap-2 mb-4'
        >
          <div className='flex-grow flex items-center border border-gray-300 rounded-lg overflow-hidden'>
            <input
              type='text'
              placeholder='Search posts...'
              value={searchTerm}
              onChange={handleSearchChange}
              className='flex-grow p-2 text-sm focus:outline-none'
            />
            <button
              type='submit'
              className='whitespace-nowrap p-2 text-white bg-orange-500 hover:bg-blue-600 rounded-r-lg'
            >
              <FaSearch className='h-5 w-5' />
            </button>
          </div>
          <button
            onClick={clearFilters}
            className='p-2 text-sm text-orange-500 border border-blue-500 rounded-lg hover:bg-blue-100 flex items-center gap-1'
          >
            <MdClear className='h-4 w-4' />
            Clear Filters
          </button>
        </form>
        {/* Post category */}
        <CategoryList
          categories={categoriesData}
          onCategorySelect={handleCategoryFilter}
          onClearFilters={clearFilters}
        />
        {/* Show Alert */}
        {data?.posts?.length <= 0 && <NoDataFound text='No Post Found' />}
        {isError && <AlertMessage type='error' message='Something happened!' />}
        {isLoading && (
          <AlertMessage type='loading' message='Loading please wait...' />
        )}
        <div className='flex flex-wrap mb-32 -mx-4'>
          {/* Posts */}
          {data?.posts?.map(post => (
            <div key={post._id} className='w-full md:w-1/2 lg:w-1/3 p-4'>
              <Link to={`/posts/${post._id}`}>
                <div className='bg-white border border-gray-100 hover:border-orange-500 transition duration-200 rounded-2xl h-full p-3'>
                  <div className='relative' style={{ height: 240 }}>
                    <div className='absolute top-0 left-0 z-10'></div>
                    <div className='absolute bottom-0 right-0 z-10'></div>
                    <img
                      className='absolute inset-0 w-full h-full object-cover rounded-2xl'
                      src={post?.image?.path}
                      alt={post?._id}
                    />
                  </div>
                  <div className='pt-3 pb-3 px-2'>
                    <div className='inline-flex font-bold pt-3 pb-3 gap-2 justify-center items-center'>
                      {post?.author?.profilePicture ? (
                        <img
                          src={post?.author?.profilePicture?.path}
                          alt={post?.author?.profilePicture?.fieldname}
                          className='h-10 w-10 object-cover rounded-full'
                        />
                      ) : (
                        <button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500'>
                          <span className='sr-only'>Open user menu</span>
                          <AiOutlineUser className='h-10 w-10 text-gray-400' />
                        </button>
                      )}
                      <span className='text-gray-600 text-md'>
                        {post?.author?.username}
                      </span>
                    </div>
                    <div
                      className='rendered-html-content mb-2'
                      dangerouslySetInnerHTML={{
                        __html: truncateString(post?.description, 200),
                      }}
                    />
                    <div className='flex flex-wrap items-center gap-3'>
                      <p className='text-gray-500 text-sm'>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={4}
                        height={4}
                        viewBox='0 0 4 4'
                        fill='none'
                      >
                        <circle cx={2} cy={2} r={2} fill='#B8B8B8' />
                      </svg>
                      <div className='py-1 rounded-md border border-gray-100 text-sm font-medium text-gray-700 inline-block'>
                        {post?.category?.categoryName}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className='flex justify-center items-center my-8 space-x-4'>
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className='px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
          >
            Previous
          </button>
        )}

        <span className='text-sm font-semibold'>
          Page {page} of {data?.totalPages}
        </span>

        {page < data?.totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className='px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default PostList;
