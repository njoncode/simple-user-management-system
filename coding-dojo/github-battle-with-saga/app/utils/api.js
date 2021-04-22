import axios from 'axios';

const id = '921c08c9c1f6fda1af20';

const sec = '6e4926e19d75d81e0719713ad557202ec598cc91';

const params = `?client_id=${id}&client_secret=${sec}`;

export function fetchPopularRepos(language) {
  const endpoint = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`;
  return axios
    .get(endpoint)
    .then(res => res)
    .catch(error => error);
}

export function getProfile(username) {
  return axios
    .get(`https://api.github.com/users/${username}${params}`)
    .then(profile => profile)
    .catch(error => console.log(error));
}

export function calculateTotalStargazersCount(repos) {
  const starCount = repos.data.reduce(
    (accumulator, { stargazers_count }) => accumulator + stargazers_count,
    0,
  );
  return starCount;
  console.log(`Total Stargazers Count`, starCount);
}

export function calculateScore(followers, repos) {
  return followers + calculateTotalStargazersCount(repos);
}

// export function calculateTotalStargazersCount(repos) {
//     const starCount = repos.data.reduce(
//         (accumulator, { stargazers_count }) => accumulator + stargazers_count,
//         0,
//     );
//     return starCount;
//     console.log(`Total Stargazers Count`, starCount);
// }

// export function calculateScore(followers, repos) {
//     return followers + calculateTotalStargazersCount(repos);
// }

export function getRepos(username) {
  return axios
    .get(`https://api.github.com/users/${username}/repos${params}$per_page=100`)
    .then(repos => repos)
    .catch(error => console.log(error));
}

export function getUser(player) {
  return Promise.all([getProfile(player), getRepos(player)])
    .then(([profile, repos]) => ({
      profile,
      score: calculateScore(profile.data.followers, repos),
    }))
    .catch(error => console.log(error.message));
}

// function sortPlayers(a, b) {
//     b.score > a.score;
// }

// [playerOne, playerTwo].sort(() => { });

export function battlePlayers(player1, player2) {
  return Promise.all([getUser(player1), getUser(player2)])
    .then(([playerOne, playerTwo]) =>
      [playerOne, playerTwo].sort(
        (playerOne, playerTwo) => playerTwo.score - playerOne.score,
      ),
    )
    .catch(error => error);
}

// export function battlePlayers(player1, player2) {
//     return Promise.all([getUser(player1), getUser(player2)])
//         .then(([playerOne, playerTwo]) => ({
//             playerOne,
//             playerTwo,
//         }))
//         .catch(error => error);
// }

// arr = [
//     { name: 'John', age: '15', email: 'john@gm.com' },
//     { name: 'Sam', age: '20', email: 'sam@gm.com' },
// ];

// console.log(arr);

// const sorted = arr.sort((a, b) => b.age - a.age);

// console.log(sorted);

// export function battlePlayers(player1, player2) {
//     return Promise.all([getUser(player1), getUser(player2)])
//         .then(([playerOne, playerTwo]) => ({
//             player1: playerOne.profile,
//             player2: playerTwo.profile,
//             scorePlayer1: playerOne.score,
//             scorePlayer2: playerTwo.score,
//         }))
//         .catch(error => error);
// }
