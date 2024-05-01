

document.addEventListener('DOMContentLoaded', function() {
    const weeklyMatchupBtn = document.getElementById('week_match_btn');
    const weeklyTransactionsBtn = document.getElementById('week_transaction_btn');

    weeklyMatchupBtn.addEventListener('click', function() {
        redirectWeeklyMatchupBtn();
    });

    weeklyTransactionsBtn.addEventListener('click', function() {
        redirectWeeklyTransactionBtn();
    });
});

function redirectWeeklyMatchupBtn() {
    var weeklyMatchupPage = 'weekly_matchup.html';
    window.location.href = weeklyMatchupPage;
}

function redirectWeeklyTransactionBtn() {
    var weeklyTransactionPage = 'weekly_transactions.html';
    window.location.href = weeklyTransactionPage;
}