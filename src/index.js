import axios from "axios";

async function getIssues({ organization, projectKeys, token }) {
  try {
    const apiUrl = `https://sonarcloud.io/api/issues/search?organization=${organization}&projectKeys=${projectKeys}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return await axios.get(apiUrl, { headers });
  } catch (error) {
    throw new Error(`Error fetching SonarCloud issues: ${error.message}`);
  }
}

export { getIssues };
