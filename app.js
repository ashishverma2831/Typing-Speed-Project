
// const input = document.querySelectorAll('#input');
const paragraphText = document.getElementById('paragraph-text');
const time = document.getElementById('time');
const mistakes = document.getElementById('mistakes');
const wpm = document.getElementById('wpm');
const cpm = document.getElementById('cpm');
const tryAgainButton = document.getElementById('try-again-btn');


// Variables
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakesCount = 0;
let isTyping = false;


const loadParagraph = () => {
    const paragraph = [
        "Life is a journey of constant discovery, where every twist and turn reveals new lessons waiting to be learned. Embrace the unknown, for therein lies the beauty of growth and self-discovery.",
        "In the tapestry of existence, each individual thread contributes to the intricate pattern of humanity. Embrace diversity, for it is the harmonious interplay of differences that enriches the fabric of society.",
        "Courage is not the absence of fear, but the triumph over it. It is the willingness to confront adversity head-on, to persevere in the face of uncertainty, and to emerge stronger on the other side.",
        "Kindness is a language that transcends barriers, a beacon of light in a world often shrouded in darkness. It has the power to heal wounds, mend broken spirits, and ignite the flames of hope in the hearts of others.",
        "Success is not merely the attainment of wealth or status, but the fulfillment of one's true potential and the realization of one's dreams. It is the journey of self-discovery, fueled by passion, perseverance, and unwavering determination.",
        "Love is the most potent force in the universe, capable of transcending time and space, binding souls together in a tapestry of emotions that defy explanation. It is the essence of our humanity, the source of our greatest joys and deepest sorrows.",
        "Wisdom is not confined to age or experience but is born from the crucible of life's lessons. It is the ability to discern truth from falsehood, to navigate the complexities of existence with clarity and insight.",
        "Hope is the guiding light that leads us through the darkest of nights, illuminating the path to a brighter tomorrow. It is the unwavering belief that, despite the challenges we face, a better future awaits us if we dare to dream and persevere.",
        "Forgiveness is the balm that soothes the wounds of the past, freeing us from the shackles of resentment and bitterness. It is the act of releasing ourselves from the burdens of anger and hurt, allowing us to embrace peace and move forward with renewed purpose.",
        "Dreams are the whispers of the soul, urging us to reach beyond the confines of reality and explore the boundless possibilities of our imagination. They are the seeds of greatness, waiting to be cultivated with passion, perseverance, and unwavering faith."
    ]
      
    const randomIndex = Math.floor(Math.random() * paragraph.length);
    // paragraphText.textContent = paragraph[randomIndex];

    paragraphText.innerHTML = '';
    for(const char of paragraph[randomIndex]) {
        console.log(char);
        paragraphText.innerHTML += `<span>${char}</span>`;
    }
    paragraphText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    paragraphText.addEventListener('click',()=>input.focus());
}


//  Handle User Input
function initTyping(){
    const char = paragraphText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if(charIndex < char.length && timeLeft > 0) {

        if(!isTyping) {
            timer = setInterval(countdown, 1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
            console.log('correct');
        }else{
            char[charIndex].classList.add('incorrect');
            mistakesCount++;
            console.log('Incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistakesCount;
        cpm.innerText = charIndex-mistakesCount;
    }else{
        clearInterval(timer);
        input.value = '';
    }
}



function countdown(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        let wpmValue = Math.round((charIndex-mistakesCount)/5 / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmValue;
    }else{
        clearInterval(timer);
    }
}

tryAgainButton.addEventListener('click',()=>{
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakesCount = 0;
    isTyping = false;
    time.innerText = timeLeft;
    mistakes.innerText = mistakesCount;
    wpm.innerText = 0;
    cpm.innerText = 0;
    loadParagraph();
    input.value = '';
    input.focus();
})
input.addEventListener("input", initTyping);
loadParagraph();