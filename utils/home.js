

document.addEventListener('DOMContentLoaded', function() {
    const weeklyMatchupBtn = document.getElementById('week_match_btn');

    weeklyMatchupBtn.addEventListener('click', function() {
        redirectWeeklyMatchupBtn();
    });
});

function redirectWeeklyMatchupBtn() {
    var weeklyMatchupPage = 'weekly_matchup.html';
    window.location.href = weeklyMatchupPage;
}