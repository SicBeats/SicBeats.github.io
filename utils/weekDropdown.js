import { last_regular_season_week, leagueID } from "./leagueInfo";

document.addEventListener('DOMContentLoaded', function() {
    console.log("reched here 1");
    const weekDropdown = document.getElementById('week_num');

    for (let i = 1; i <= last_regular_season_week; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.text = 'Week ' + i;
        weekDropdown.appendChild(option);
    }
    console.log("reched here 2");

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
            document.getElementById('responseContainer').innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('responseContainer').innerHTML = 'Error: ' + error.message;
        });
}