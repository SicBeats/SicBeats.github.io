import { last_regular_season_week, leagueID } from './leagueInfo.mjs';

document.addEventListener('DOMContentLoaded', function() {
    const weekDropdown = document.getElementById('week_num');

    for (let i = 1; i <= last_regular_season_week; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.text = 'Week ' + i;
        weekDropdown.appendChild(option);
    }

    weekDropdown.addEventListener('change', function() {
        getWeeklyTransactionData();
    });
});

function getWeeklyTransactionData() {
    const selectedWeek = document.getElementById('week_num').value;
    const url = 'https://api.sleeper.app/v1/league/' + leagueID + '/transactions/' + selectedWeek;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            const responseContainer = document.getElementById('responseContainer');
            responseContainer.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Fetch error: ', error);
            document.getElementById('responseContainer').innerHtml = 'Error: ' + error.message;
        });
}