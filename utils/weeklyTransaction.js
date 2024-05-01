import { last_regular_season_week, leagueID, managers } from './leagueInfo.mjs';

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

            const weekly_transactions = processWeeklyTransactions(data).join('<br>');

            const responseContainer = document.getElementById('responseContainer');
            responseContainer.innerHTML = weekly_transactions;
        })
        .catch(error => {
            console.error('Fetch error: ', error);
            document.getElementById('responseContainer').innerHtml = 'Error: ' + error.message;
        });
}

function processWeeklyTransactions(data) {
    let returnList = [];

    data.forEach(transaction => {
        const type = transaction.type;
        const status = transaction.status;
        const roster_ids = transaction.roster_ids;

        switch(type) {
            case "trade":
                acquireTradeDetails(transaction);
                break;
            case "free_agent":
                const freeAgentDetails = acquireFreeAgentDetails(transaction);
                break;
            default:
                break;
        }

        let participatingManagerNames = [];

        roster_ids.forEach(roster_id => {
            const participatingManager = managers.find(manager => manager.roster_num === roster_id);
            participatingManagerNames.push(participatingManager.name);
        })

        const managerNames = participatingManagerNames.join(', ');

        console.log(`Transaction type: ${type}, Status: ${status}, Players involved: ${managerNames}`);
        console.log(`-------------------------------------------------------------------------------------------`);

        returnList.push(`Transaction type: ${type}, Status: ${status}, Players involved: ${managerNames}`);
        if(freeAgentDetails[0] != []) {
            returnList.push(`Adds: ${freeAgentDetails[0]}`);
        }
        if(freeAgentDetails[1] != []) {
            returnList.push(`Drops: ${freeAgentDetails[1]}`);
        }
        returnList.push(`-------------------------------------------------------------------------------------------`);
    });

    return returnList;
}

function acquireTradeDetails(trade) {
    console.log(trade.type);
}

function acquireFreeAgentDetails(transaction) {
    const dropSize = Object.entries(transaction.drops).length;
    const addSize = Object.entries(transaction.adds).length;

    let dropList = [];
    let addList = [];

    if (dropSize) {
        dropList.push("Dropped: ");
        transaction.drops.forEach(drop => {
            dropList.push(drop[0], ", ");
        });
    }

    if (addSize) {
        addList.push("Added: ");
        transactions.adds.forEach(add => {
            addList.push(add[0], ", ");
        });
    }

    return addList, dropList;

}