import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../../APIServices/posts/postsAPI';

const PostDetails = () => {
  //! Get the post id
  const { postId } = useParams();

  //! User Query
  const { isError, isLoading, isSuccess, data, error } = useQuery({
    queryKey: ['post-details'],
    queryFn: () => fetchPost(postId),
  });

  console.log(data);

  return (
    <div>
      <h1>{data?.postFound.title}</h1>
      <p>{data?.postFound.description}</p>
    </div>
  );
};

export default PostDetails;
