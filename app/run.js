const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  recognition.onresult = function (event) {
    const query = event.results[0][0].transcript.toLowerCase();
    console.log("User's query: ", query);

    const resultDiv = document.getElementById("result");
    if (resultDiv) {
      resultDiv.innerHTML = `You said: ${query}`;
    }

    handleCommand(query);
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
  };

  document.getElementById("start").addEventListener("click", function () {
    recognition.start();
  });

  function handleCommand(command) {
    if (command.includes("open google")) {
      window.location.href = "https://www.google.com/";
    } else if (command.includes("change background color")) {
      document.body.style.backgroundColor = "lightblue";
    } else if (command.includes("say hello")) {
      alert("Hello, how can I assist you today?");
    } else if (command.includes("search")) {
      const searchQuery = command.replace("search", "").trim();
      window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    } else {
      console.log("Command not recognized");
    }
  }
} else {
  console.error("Speech Recognition is not supported in this browser.");
}
