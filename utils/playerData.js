function getPlayerData(playerId) {

    function readPlayerJSON() {
        fetch('./data_files/playerInfo.json')
            .then(response => response.json())
            .catch(error => {
                console.error('Fetch error: ', error);
                document.getElementById('responseContainer').innerHtml = 'Error: ' + error.message;
            });
    }

    return readPlayerJSON()
        .then(playerData => playerData.get(playerId));
}

export function getPlayerName(playerId) {
    return getPlayerData(playerId)
        .then(player => player.full_name);
}