export default getPlayerName;

function getPlayerData(playerId) {

    function readPlayerJSON() {
        fetch('./data_files/playerInfo.json')
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                console.error('Fetch error: ', error);
                document.getElementById('responseContainer').innerHtml = 'Error: ' + error.message;
            });
    }

    const playerData = readPlayerJSON();
    const player = playerData.get(playerId);
    return player;
}

function getPlayerName(playerId) {
    const player = getPlayerData(playerId);
    return player.full_name;
}