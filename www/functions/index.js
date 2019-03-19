const functions = require('firebase-functions');

exports.myCloudTimer = functions.database.instance('codehort').ref('/timer/').onUpdate((event) => {
  console.log("executed timer");
    return db.ref('timer/timeInMs').once('value', snap => {
        if (!snap.exists()) {
            return Promise.reject('time is not defined in the database.');
        }

        let timeInSeconds = snap.val() / 1000;
        console.log('Cloud Timer was Started: ' + timeInSeconds);

        return functionTimer(timeInSeconds,
            elapsedTime => {
                db.ref('cloudTimer/observableTime').set(elapsedTime);
            })
            .then(totalTime => {
                console.log('Timer of ' + totalTime + ' has finished.');
            })
            .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
            .then(() => event.data.ref.remove())
            .catch(error => console.error(error));
    });
});

function functionTimer (seconds, call) {
    return new Promise((resolve, reject) => {
        if (seconds > 300) {
            reject('execution would take too long...');
            return;
        }
        let interval = setInterval(onInterval, 1000);
        let elapsedSeconds = 0;

        function onInterval () {
            if (elapsedSeconds >= seconds) {
                clearInterval(interval);
                call(0);
                resolve(elapsedSeconds);
                return;
            }
            call(seconds - elapsedSeconds);
            elapsedSeconds++;
        }
    });
}
