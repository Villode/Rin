import React from 'react';
import { Helmet } from 'react-helmet';

export const EssayPage = () => {
  return (
    <>
      <Helmet>
        <title>Essay</title>
      </Helmet>
      <div>
        <h1>Essay</h1>
        <p>Welcome to the Essay page. Here you can write or browse essays.</p>
      </div>
    </>
  );
};
