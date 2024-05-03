import playerData from './data_files/playerInfo.json';

function getPlayerData(playerId) {
    const player = playerData.get(playerId);
    return player;
}

function getPlayerName(playerId) {
    const player = getPlayerData(playerId);
    return player.full_name;
}