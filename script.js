const mbtiColors = {
    ISTJ: ["#4682B4", "#5F9EA0", "#6495ED", "#4169E1", "#1E90FF"],
    ISFJ: ["#5F9EA0", "#20B2AA", "#48D1CC", "#40E0D0", "#00CED1"],
    INFJ: ["#6A5ACD", "#483D8B", "#7B68EE", "#9370DB", "#8A2BE2"],
    INTJ: ["#483D8B", "#4B0082", "#8B008B", "#9400D3", "#9932CC"],
    ISTP: ["#008080", "#008B8B", "#00CED1", "#00FFFF", "#E0FFFF"],
    ISFP: ["#3CB371", "#2E8B57", "#00FA9A", "#00FF7F", "#98FB98"],
    INFP: ["#9370DB", "#BA55D3", "#DA70D6", "#EE82EE", "#DDA0DD"],
    INTP: ["#4169E1", "#0000FF", "#0000CD", "#00008B", "#191970"],
    ESTP: ["#FF4500", "#FF6347", "#FF7F50", "#FFA07A", "#FA8072"],
    ESFP: ["#FF6347", "#FF7F50", "#FFA500", "#FFD700", "#FFDAB9"],
    ENFP: ["#FF69B4", "#FF1493", "#DB7093", "#FFC0CB", "#FFB6C1"],
    ENTP: ["#FF1493", "#FF00FF", "#FF00FF", "#8B008B", "#9932CC"],
    ESTJ: ["#DC143C", "#B22222", "#8B0000", "#800000", "#A52A2A"],
    ESFJ: ["#CD5C5C", "#F08080", "#FA8072", "#E9967A", "#FFA07A"],
    ENFJ: ["#8B0000", "#800000", "#A52A2A", "#B22222", "#DC143C"],
    ENTJ: ["#B22222", "#A52A2A", "#8B0000", "#800000", "#DC143C"]
};

let currentExpression = '';
let lastResult = null;

function showCalculator() {
    const mbti = document.getElementById('mbti-select').value;
    if (mbti) {
        const colorIndex = Math.floor(Math.random() * 5);
        document.body.style.backgroundColor = mbtiColors[mbti][colorIndex];
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
    currentExpression = '';
    lastResult = null;
    updateDisplay();
    document.getElementById('history').innerHTML = '';
}

function updateDisplay() {
    document.getElementById('display').value = currentExpression;
}

function appendToDisplay(value) {
    currentExpression += value;
    updateDisplay();
    vibrateOnMobile();
}

function clearDisplay() {
    currentExpression = '';
    lastResult = null;
    updateDisplay();
    vibrateOnMobile();
}

function backspace() {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
    vibrateOnMobile();
}

function calculateSquareRoot() {
    try {
        const result = Math.sqrt(eval(currentExpression));
        addToHistory(`√(${currentExpression}) = ${result}`);
        currentExpression = result.toString();
        updateDisplay();
    } catch (error) {
        currentExpression = '오류';
        updateDisplay();
    }
    vibrateOnMobile();
}

function calculate() {
    try {
        const result = eval(currentExpression);
        addToHistory(`${currentExpression} = ${result}`);
        currentExpression = result.toString();
        updateDisplay();
    } catch (error) {
        currentExpression = '오류';
        updateDisplay();
    }
    vibrateOnMobile();
}

function addToHistory(entry) {
    let history = document.getElementById('history');
    history.innerHTML = entry + '<br>' + history.innerHTML;
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