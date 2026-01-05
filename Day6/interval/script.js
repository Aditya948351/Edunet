document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("getLinkBtn").addEventListener("click", function () {
        let countdown = 15; // seconds
        let timerDisplay = document.getElementById("timer");
        let linkContainer = document.getElementById("linkContainer");
        // Reset display
        timerDisplay.textContent = "Please wait " + countdown + " seconds...";
        linkContainer.innerHTML = "";
        // Update timer every second
        let interval = setInterval(function () {
            countdown--;
            timerDisplay.textContent = "Please wait " + countdown + " seconds...";
            if (countdown <= 0) {
                clearInterval(interval);
            }
        }, 1000);
        // Show link after 15 seconds
        setTimeout(function () {
            timerDisplay.textContent = "Time's up!";
            linkContainer.innerHTML = '<a href="https://www.google.com" >Click here to continue</a>';
        }, 15000);
    });
});