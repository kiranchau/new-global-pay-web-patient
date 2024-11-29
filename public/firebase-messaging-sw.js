self.addEventListener('notificationclick', function (event) {
    let url = "https://gppdyn.realtime-host01.com/";

    event.notification.close();
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(clientList => {
            // Check if there is already a window/tab open with the target URL
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                let clientUrl = new URL(client.url)
                let weburl = clientUrl.protocol + "//" + clientUrl.host


                // If so, just focus it.
                if (weburl === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    )
})

// 23-12-2021 : Service worker for firebase notification
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCc-Re-rejZY3W9e2NYsciKiBa7gXeHsMo",
    authDomain: "globalpaypushnotifications.firebaseapp.com",
    projectId: "globalpaypushnotifications",
    storageBucket: "globalpaypushnotifications.appspot.com",
    messagingSenderId: "427638007232",
    appId: "1:427638007232:web:4e661725c94d7c3ff99425",
    measurementId: "G-7H2FM513JH"
});


const messaging = firebase.messaging();


if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        const registration = await navigator.serviceWorker.register('firebase-messaging-sw.js', {
            scope: "firebase-cloud-messaging-push-scope"
        });

        // Function called when app is in background
        messaging.onBackgroundMessage(function (payload) {

            if (payload.notification.title == "Logout") {
                // when user changes emial we are calling logut function
                sessionStorage.setItem("email_changed", "yes")
            }

            // Customize notification here
            let notificationTitle = payload.notification.title;
            let notificationOptions = {
                body: payload.notification.body,
            };

            registration.showNotification(notificationTitle,
                notificationOptions);
        });
    });
}