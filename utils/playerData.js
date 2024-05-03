function getPlayerData(playerId) {
    return fetch('./data_files/playerInfo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data[playerId])
        .catch(error => {
            console.error('Fetch error: ', error);
            document.getElementById('responseContainer').innerHTML = 'Error: ' + error.message;
        });
}

export function getPlayerName(playerId) {
    const player = getPlayerData(playerId);
    return player.full_name;
}