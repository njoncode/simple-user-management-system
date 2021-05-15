/**
 *
 * PopularPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa';

import '../../styles/components/popular.css';

function PopularPage({ repos }) {
  return (
    <>
      <div className="grid">
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
            <ul className="list-container">
              <li key={id} className="list-items">
                <li className="index">{`#${index + 1}`}</li>
                <br />
                <li>
                  <img src={owner.avatar_url} className="avatar" />
                </li>
                {/* <pre /> */}
                <li>
                  <a href={html_url} className="html-url">
                    {owner.login}
                  </a>
                </li>
                <pre />
                <li>
                  <FaUser color="rgb(255,191,116)" size={22} />
                  <a href={owner.html_url}>{owner.login}</a>
                </li>
                <li>
                  <FaStar color="rgb(255,191,116)" size={22} />
                  {`${stargazers_count} stars`}
                </li>
                <li>
                  <FaCodeBranch color="rgb(255,191,116)" size={22} />
                  {`${forks_count} forks`}
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(255,191,116)" size={22} />
                  {`${open_issues} open issues`}
                </li>
              </li>
            </ul>
          ),
        )}
      </div>
    </>
  );
}

PopularPage.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default PopularPage;
