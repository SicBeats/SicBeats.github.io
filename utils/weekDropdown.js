import { last_regular_season_week, leagueID } from "./leagueInfo.mjs";

document.addEventListener('DOMContentLoaded', function() {
    const weekDropdown = document.getElementById('week_num');

    for (let i = 1; i <= last_regular_season_week; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.text = 'Week ' + i;
        weekDropdown.appendChild(option);
    }

    weekDropdown.addEventListener('change', function() {
        getWeeklyMatchupData();
    });
});

function getWeeklyMatchupData() {
    const selectedWeek = document.getElementById('week_num').value;
    const url = 'https://api.sleeper.app/v1/league/' + leagueID + '/matchups/' + selectedWeek;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            processWeeklyMatchupData(data);
            document.getElementById('responseContainer').innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('responseContainer').innerHTML = 'Error: ' + error.message;
        });
}

function processWeeklyMatchupData(data) {
    const NUM_MATCHUPS = 5;

    for (let i = 1; i < NUM_MATCHUPS; i++) {
        const matchupData = data.filter(matchup => (i == matchup.matchup_id));
        if (matchupData.length > 0) {
            console.log("Matchup ID: ", matchupData.matchup_id);
            matchupData.forEach(matchup => {
                console.log("Roster ID: ", matchupData.roster_id);
            });
        } else {
            console.log("No matching matchups found...");
        }
    }
}