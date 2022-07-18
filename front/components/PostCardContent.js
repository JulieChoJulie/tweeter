import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postContent }) => {
  return (
    <div>
      {postContent.split(/(#[^\s#]+)/g).map((v, i) => {
        if (/(#[^\s#]+)/.test(v)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              <a>{v}</a>
            </Link>
          );
        } else {
          return v;
        }
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postContent: PropTypes.string.isRequired,
};

export default PostCardContent;
