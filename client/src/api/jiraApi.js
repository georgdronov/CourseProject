export async function createJiraTicket(issueData) {
    const jiraUrl = 'https://course-project-rust-seven.atlassian.net/rest/api/3/issue';

    try {
        const response = await fetch(jiraUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_JIRA_TOKEN}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(issueData)
        });

        if (!response.ok) {
            throw new Error(`Error to create ticket: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Ticket create!:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}
