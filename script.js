// Wait for the DOM to fully load before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the DOM elements
    const submitButton = document.getElementById("submit");
    const nameInput = document.getElementById("name");
    const loader = document.getElementById("loader");

    // Add click event listener to the submit button
    if (submitButton && nameInput) {
        submitButton.addEventListener("click", function () {
            const userName = nameInput.value;

            if (userName) {
                // Show the loader
                loader.style.display = "flex";

                // Save the name to localStorage
                localStorage.setItem("userName", userName);

                // Simulate a delay (to keep the loader visible for 2 seconds)
                setTimeout(function () {
                    // Redirect to index_1.html after the loader has been displayed for 2 seconds
                    window.location.href = "index_1.html";
                }, 3000); // 2 seconds delay
            } else {
                alert("Please enter your name!");
            }
        });
    }

    // Handle greeting logic for index_1.html
    const userName = localStorage.getItem("userName");
    const greetingElement = document.getElementById("greeting");

    if (greetingElement) {
        if (userName) {
            greetingElement.textContent = `Hi, ${userName.toUpperCase()}`;

        } else {
            greetingElement.textContent = "Hello, Guest!";
        }
    }
});


//ai logic

let btn = document.querySelector("#speak");
let content = document.querySelector("#transcript");
let voicegif= document.querySelector("#voice-img")

function speak(text) {
    let jarvis_speak = new SpeechSynthesisUtterance(text);
    jarvis_speak.rate = 0.75
    jarvis_speak.pitch = 1.8
    jarvis_speak.volume = 2
    window.speechSynthesis.speak(jarvis_speak)
}

function greet() {
    const userName = localStorage.getItem("userName");
    if (userName) {
        let day = new Date()
        let hours = day.getHours()

        if (hours >= 0 && hours < 12) {
            const speak_hour = `Good Morning ${userName}, be something, be someone today`
            speak(speak_hour)
        }
        else if (hours >= 12 && hours < 16) {
            const speak_hour = `Good afternoon ${userName}, have fun.`
            speak(speak_hour)
        }
        else if (hours >= 16 && hours < 18) {
            const speak_hour = `Good evening ${userName}, it's a wonderful evening, make it memorable`
            speak(speak_hour)
        }
        else {
            const speak_hour = `it's a wonderful night make it productive${userName}`
            speak(speak_hour)
        }
    }
    else {
        console.log("No user name found in localStorage. Greeting skipped.");
    }
}

if (document.title === "AI Assistant(1)") { // Replace with the actual title of index_1.html
    window.addEventListener("load", () => {
         setTimeout(() => {
            greet();
        }, 1000);
    });
}

let speech = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speech();
recognition.onresult = (event) => {
    let currentResult = event.resultIndex
    let transcript = event.results[currentResult][0].transcript
    content.innerText = transcript

    takeCommand(transcript)
}


btn.addEventListener("click", function () {
    recognition.start()
    btn.style.display= "none";
    voicegif.style.display = "block";
})


function takeCommand(voice_cmd) {
    btn.style.display= "flex";
    voicegif.style.display = "none";
    const userName = localStorage.getItem("userName");
    const speak_reply = `Hello ${userName}, how are you doing, how may i assist you today.`
    // Normalize input
    voice_cmd = voice_cmd.toLowerCase().trim();
    console.log("Received voice command:", voice_cmd); // Debugging log

    // Check for greetings or general interactions
    if (userName) {
        if (
            voice_cmd.includes("hello") ||
            voice_cmd.includes("hey") ||
            voice_cmd.includes("good night jarvis") ||
            voice_cmd.includes("aur jarvis bhai kya haal")
        ) {
            speak(speak_reply);
        }
        else if(
            voice_cmd.includes("thank you")
        ){
            speak(`"welcome ${userName}, i'm happy to assist you more."`)
        }
        else if(
            voice_cmd.includes("what's my name") ||
            voice_cmd.includes("who am i")
        ){
            speak(`"your name is ${userName}, nice to meet you."`)
        }
        else if (
            voice_cmd.includes("who are you") ||
            voice_cmd.includes("what are you?") ||
            voice_cmd.includes("who are you, Jarvis") ||
            voice_cmd.includes("Jarvis, who are you?")
        ) {
            speak("hello i am jarvis, a virtual assistant made for you, made by suman das");
        }
        else if(
            voice_cmd.includes("wassup")||
            voice_cmd.includes("whatsup")||
            voice_cmd.includes("how are you")
        ){
           speak(`"i'm good thank you" ${userName}`)
        }
        else if(
            voice_cmd.includes("open youtube")
        ){
            speak("opening youtube")
            window.open("https://www.youtube.com/", "_blank")
        }
        else if(
            voice_cmd.includes("open google")
        ){
             speak("opening google, here you go")
             window.open("https://www.google.com/", "_blank")
        }
        else if(
           voice_cmd.includes("open instagram")
        ){
            speak("opening instagram..")
            window.open("https://www.instagram.com/","_blank")
        }
        else if(
            voice_cmd.includes("open facebook")
        ){
            speak("opening facebook..")
            window.open("https://www.facebook.com/","_blank") 
        }
        else if(
            voice_cmd.includes("open linkedin")
        ){
            speak("opening instagram..")
            window.open("https://www.linkedin.com/","_blank")
        }
        else if(
            voice_cmd.includes("open calculator")
        ){
          speak("opening calculator..")
          window.open("calculator://")
        }
        else if(
            voice_cmd.includes("open whatsapp")
        ){
          speak("opening whatsapp..")
          window.open("whatsapp://")
        }
        else if(
            voice_cmd.includes("open spotify")
        ){
          speak("opening spotify..")
          window.open("spotify://")
        }
        else if(
            voice_cmd.includes("open steam")
        ){
          speak("opening steam..")
          window.open("steam://")
        }
        else if(
            voice_cmd.includes("time")
        ){
          let time =new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
          time= time.replace(":","")
          speak(`"the time is"${time}`)
        }
        else{
            speak(`"this is what i found on the internet regarding" ${voice_cmd.replace("jarvis","")}`)
            window.open(`https://www.google.com/search?q=${voice_cmd.replace("jarvis","")}`,"_blank")||
            window.open(`https://www.bing.com/search?q=${voice_cmd.replace("jarvis","")}`,"_blank")
        }
        
    }
    
}

let tl= gsap.timeline()

tl.from(".page1 #greeting",{
    opacity:0,
    y:-150,
    duration:0.6,
    stagger:0.5
})

gsap.from(".page1 h3",{
    opacity:0,
    y:-550,
    duration:1,
    stagger:0.5

})

tl.from(".jarvis img",{
    opacity:0,
    duration:0.7,
    x:-200,
    stagger:0.5

})

tl.from(".jarvis h2",{
    opacity:0,
    duration:0.4

})

tl.from(".jarvis span",{
    opacity:0,
    duration:1.5,
    x:-100,
    stagger:0.7
})

tl.from(".jarvis button",{
    opacity:0,
    duration:5,
    stagger:0.4
})

