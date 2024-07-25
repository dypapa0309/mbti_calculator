const mbtiColors = {
    ISTJ: "#4682B4", ISFJ: "#5F9EA0", INFJ: "#6A5ACD", INTJ: "#483D8B",
    ISTP: "#008080", ISFP: "#3CB371", INFP: "#9370DB", INTP: "#4169E1",
    ESTP: "#FF4500", ESFP: "#FF6347", ENFP: "#FF69B4", ENTP: "#FF1493",
    ESTJ: "#DC143C", ESFJ: "#CD5C5C", ENFJ: "#8B0000", ENTJ: "#B22222"
};

function showCalculator() {
    const mbti = document.getElementById('mbti-select').value;
    if (mbti) {
        document.body.style.backgroundColor = mbtiColors[mbti];
        document.getElementById('mbti-selector').classList.add('hidden');
        document.getElementById('calculator-container').classList.remove('hidden');
        resetCalculator();
    } else {
        alert('MBTI를 선택해주세요.');
    }
}

function showMBTISelector() {
    document.getElementById('calculator-container').classList.add('hidden');
    document.getElementById('mbti-selector').classList.remove('hidden');
    resetCalculator();
}

function resetCalculator() {
    document.getElementById('display').value = '';
    document.getElementById('history').innerHTML = '';
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
    vibrateOnMobile();
}

function clearDisplay() {
    document.getElementById('display').value = '';
    vibrateOnMobile();
}

function backspace() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
    vibrateOnMobile();
}

function calculateSquareRoot() {
    let display = document.getElementById('display');
    try {
        let result = Math.sqrt(eval(display.value));
        display.value = result;
        addToHistory(`√(${display.value}) = ${result}`);
    } catch (error) {
        display.value = '오류';
    }
    vibrateOnMobile();
}

function calculate() {
    let display = document.getElementById('display');
    try {
        let expression = display.value;
        let result = eval(expression);
        display.value = result;
        addToHistory(`${expression} = ${result}`);
    } catch (error) {
        display.value = '오류';
    }
    vibrateOnMobile();
}

function addToHistory(entry) {
    let history = document.getElementById('history');
    history.innerHTML += entry + '<br>';
    history.scrollTop = history.scrollHeight;
}

function vibrateOnMobile() {
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

// PC에서 키보드 입력 처리
document.addEventListener('keydown', function(event) {
    if (document.getElementById('calculator-container').classList.contains('hidden')) return;
    
    const key = event.key;
    if (/[0-9+\-*/.()]/.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// 모바일에서 터치 이벤트 처리
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.click();
    });
});