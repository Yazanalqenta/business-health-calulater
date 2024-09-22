function showTab(index) {
    const tabs = document.querySelectorAll('.tab');
    const buttons = document.querySelectorAll('.tab-button');
    tabs.forEach((tab, i) => {
        tab.classList.remove('active');
        buttons[i].classList.remove('active');
    });
    tabs[index].classList.add('active');
    buttons[index].classList.add('active');
}

function nextTab(nextIndex) {
    const currentTab = document.querySelector('.tab.active');
    const answeredAll = currentTab.querySelectorAll('.option.selected').length === currentTab.querySelectorAll('.question').length;

    if (answeredAll) {
        document.querySelectorAll('.tab-button')[nextIndex].disabled = false;
        showTab(nextIndex);
    } else {
        alert('Please answer all questions before proceeding.');
    }
}

function selectOption(element) {
    const options = element.parentElement.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');
}

function calculateScores() {
    const timeTab = document.getElementById('timeTab');
    const teamTab = document.getElementById('teamTab');
    const moneyTab = document.getElementById('moneyTab');
    const systemsTab = document.getElementById('systemsTab');

    const timeScore = calculateTabScore(timeTab);
    const teamScore = calculateTabScore(teamTab);
    const moneyScore = calculateTabScore(moneyTab);
    const systemsScore = calculateTabScore(systemsTab);

    document.getElementById('timeScore').innerText = timeScore;
    document.getElementById('teamScore').innerText = teamScore;
    document.getElementById('moneyScore').innerText = moneyScore;
    document.getElementById('systemsScore').innerText = systemsScore;

    // Prepare the data to be sent
    const scores = {
        timeScore: timeScore,
        teamScore: teamScore,
        moneyScore: moneyScore,
        systemsScore: systemsScore
    };

    // Send the data to the external application (make)
    sendScoresToMake(scores);

    // Display overall health of the business based on the score
    // Add further logic here to categorize the business health
}


function sendScoresToMake(scores) {
    fetch('https://hook.eu2.make.com/5nggy9k9aktavha1geqgg69ob43j2uun', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scores)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Scores successfully sent:', data);
    })
    .catch(error => {
        console.error('Error sending scores:', error);
    });
}


function calculateTabScore(tab) {
    let score = 0;
    const selectedOptions = tab.querySelectorAll('.option.selected');
    selectedOptions.forEach(option => {
        score += parseInt(option.getAttribute('data-score'));
    });
    return score;
}
