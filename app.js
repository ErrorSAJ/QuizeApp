let body = document.getElementsByTagName('body');
let showtime = document.querySelector('#time-counter');
let showQuestion = document.querySelector('.question');
let showAllOptions = document.querySelectorAll('#ans-option');
let solveCoundown = document.querySelector('.solveCount');
let lossMsg = document.querySelector('.AtLoss');
let WonMsg  = document.querySelector('.AtWon');
let WrongMsg = document.querySelector('.AtWrong');


function displaydatas(data) {
    let mcqQuestion = data.results[0].question;
    let wrongOption = data.results[0].incorrect_answers;
    let correcOption = data.results[0].correct_answer;
    let diffeculty = data.results[0].difficulty;
    let allOptions = `${wrongOption} ,${correcOption}`;
    let allOptionsArr = allOptions.split(",");

    shuffleArr(allOptionsArr);
    solvetime();
    diffecult(diffeculty);

    function selectAnsBtn(e) {
        let selectedBtn = e.target;
        let isCorrect = selectedBtn.innerHTML === correcOption;

        coundownStart();

        if (isCorrect) {
            selectedBtn.classList.add("correct");
            WonMsg.style.display = 'block';
        }
        else {
            selectedBtn.classList.add("wrong");
            WrongMsg.style.display = 'block'

        }
        Array.from(showAllOptions).forEach(button => {
            if (button.innerHTML === correcOption) {
                button.classList.add("correct")
            }
            button.disabled = true;
        });

        setInterval(() => {
            location.reload();
        }, 2500);

    }


    showQuestion.innerHTML = mcqQuestion;
    showAllOptions.forEach((ele, i) => {
        ele.innerHTML = allOptionsArr[i];
        ele.addEventListener("click", selectAnsBtn);
    })

}


function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function coundownStart() {
    let count = 3;

    function updateCount() {
        showtime.innerHTML = count;
        count--;
        setTimeout(updateCount, 1000);
    }

    updateCount();
}

function solvetime(num) {
   
    return setInterval(() => {
        solveCoundown.innerHTML = num;
        num--;
        if (num == -1) {
            num++
            lossMsg.style.display = 'block'
        }
    }, 1000)


}

function diffecult(dif) {
    if (dif === 'hard') {
        let num = 15;
        solvetime(num)
    }
    else if (dif === 'easy') {
        let num = 5;
        solvetime(num)
    }
    else {
        let num = 10;
        solvetime(num)
    }
}


async function apifetched() {
    let respons = await fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple')
    let data = await respons.json()
    displaydatas(data);
}
apifetched();



window.onerror = function (msg, url, line, col, error) {
    // Reload the page on error
    location.reload(true);
  
    // Optional: Log the error details to the console
    console.error('Error:', msg, 'URL:', url, 'Line:', line, 'Column:', col, 'Error object:', error);
  
    // Return false to prevent the default browser error handling
    return false;
  };
  
