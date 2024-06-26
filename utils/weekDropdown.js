import { last_regular_season_week, leagueID, managers, num_matchups } from "./leagueInfo.mjs";

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
            const matchupMap = processWeeklyMatchupData(data);

            const responseContainer = document.getElementById('responseContainer');
            responseContainer.innerHTML = '';

            displayWeeklyMatchupData(matchupMap);

        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('responseContainer').innerHTML = 'Error: ' + error.message;
        });
}

function processWeeklyMatchupData(data) {
    let returnMap = new Map();

    for (let i = 1; i <= num_matchups; i++) {

        const matchupData = data.filter(matchup => matchup.matchup_id === i);
        if (matchupData) {

            matchupData.forEach(matchup => {

                const participatingManager = managers.find(manager => manager.roster_num === matchup.roster_id);
                if (participatingManager) {
                    appendToKey(i, participatingManager.name, returnMap);
                }

            });

        } else {

            console.log(`No matching matchups found for matchup_id ${i}.`);

        }
    }

    return returnMap;
}

function displayWeeklyMatchupData(matchupMap) {
    const mapContainer = document.createElement('div');

    for (const [key, values] of matchupMap.entries()) {
        const keyElement = document.createElement('h3');
        keyElement.textContent = `Matchup ID: ${key}`;
        mapContainer.appendChild(keyElement);

        const valuesList = document.createElement('ul');
        values.forEach(value => {
            const item = document.createElement('li');
            item.textContent = value;
            valuesList.append(item);
        });

        mapContainer.appendChild(valuesList);

    }
    document.getElementById('responseContainer').appendChild(mapContainer);
}

function appendToKey(key, value, map) {
    if (map.has(key)) {
        map.get(key).push(value);
    } else {
        map.set(key, [value]);
    }
}