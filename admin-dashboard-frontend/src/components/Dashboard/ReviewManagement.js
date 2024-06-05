import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Filter from 'bad-words';  // Importing bad-words
import { FETCH_REVIEW_LIST } from '../../graphql/queries/fetchReviewList';
import { UPDATE_REVIEW_VISIBILITY } from '../../graphql/mutations/updateReviewVisibility';
import additionalProfanities from '../../assets/additionalProfanities';

const filter = new Filter(); // Creating an instance of the filter
filter.addWords(...additionalProfanities); // Adding the custom words to the filter

const ReviewManagement = () => {
  const { data, loading, error } = useQuery(FETCH_REVIEW_LIST);
  const [updateVisibility] = useMutation(UPDATE_REVIEW_VISIBILITY, {
    refetchQueries: [{ query: FETCH_REVIEW_LIST }], // Refetch reviews after update
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const toggleVisibility = (id, isVisible) => {
    updateVisibility({ variables: { id, isVisible: !isVisible } });
  };

  const isProfane = (text) => filter.isProfane(text); // Check for profanity

  return (
    <div>
      <h1>Review Management</h1>
      {data && data.reviews.map(review => (
        <div key={review.review_id} style={{ background: isProfane(review.content) ? '#ffdddd' : 'transparent', margin: '10px', padding: '10px' }}>
          <p>{review.content} (Rating: {review.rating})</p>
          {isProfane(review.content) && <p style={{ color: 'red' }}>Review flagged for moderation</p>}
          <button onClick={() => toggleVisibility(review.review_id, review.is_visible)}>
            {review.is_visible ? 'Hide' : 'Show'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewManagement;
