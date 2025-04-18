const languageSelect = document.getElementById('language-select');
const fetchBtn = document.getElementById('fetch-btn');
const refreshBtn = document.getElementById('refresh-btn');
const statusDiv = document.getElementById('status');
const repoContainer = document.getElementById('repo-container');
const repoName = document.getElementById('repo-name');
const repoDesc = document.getElementById('repo-desc');
const repoStars = document.getElementById('repo-stars');
const repoForks = document.getElementById('repo-forks');
const repoIssues = document.getElementById('repo-issues');

let currentLanguage = '';

async function fetchRandomRepo(language) {
  statusDiv.textContent = 'Loading...';
  repoContainer.style.display = 'none';

  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];

      repoName.textContent = randomRepo.full_name;
      repoDesc.textContent = randomRepo.description || 'No description available';
      repoStars.textContent = randomRepo.stargazers_count;
      repoForks.textContent = randomRepo.forks_count;
      repoIssues.textContent = randomRepo.open_issues_count;

      repoContainer.style.display = 'block';
      statusDiv.textContent = '';
    } else {
      statusDiv.textContent = 'No repositories found for that language.';
    }
  } catch (error) {
    statusDiv.textContent = 'Error fetching data. Please try again.';
    console.error(error);
  }
}

fetchBtn.addEventListener('click', () => {
  const selectedLanguage = languageSelect.value;
  if (!selectedLanguage) {
    statusDiv.textContent = 'Please select a language.';
    return;
  }
  currentLanguage = selectedLanguage;
  fetchRandomRepo(selectedLanguage);
});

refreshBtn.addEventListener('click', () => {
  if (currentLanguage) {
    fetchRandomRepo(currentLanguage);
  }
});
