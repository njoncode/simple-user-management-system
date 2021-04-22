/**
 *
 * PopularPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/containers/popular.css';

function PopularPage({ repos }) {
  return (
    <>
      {repos.map(
        (
          {
            id,
            html_url,
            name,
            git_url,
            stargazers_count,
            open_issues,
            owner,
            forks_count,
          },
          index,
        ) => (
          <ul>
            <li key={id}>
              <h1>{`#${index + 1}`}</h1>
              <a href={html_url}>{owner.login}</a>
              <br />
              <a href={owner.html_url}>{name}</a>
              <img src={owner.avatar_url} />
              <p>{`${stargazers_count} stars`}</p>
              <p>{`${forks_count} forks`}</p>
              <p>{`${open_issues} open issues`}</p>
            </li>
          </ul>
        ),
      )}
    </>
  );
}

PopularPage.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default PopularPage;
