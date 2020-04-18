import React from "react";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="row">
      {posts.map(post => (
        <div className="col-md-2">
          <img src={post.urls.small} alt={post.id} />
        </div>
      ))}
      {/* <ul className="list-group mb-4"> */}
      {/* {posts.map(post => {
        <div className="col-md-2">
          <img src={post.urls.small} alt={post.id} />
        </div>;
      })} */}
      {/* </ul> */}
    </div>
  );
};

export default Posts;
