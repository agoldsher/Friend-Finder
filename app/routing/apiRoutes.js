var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var currentBestMatch = {
            name: "",
            photo: "",
            difference: Infinity
        };

        var userScores = req.body.scores;

        var totalDifference;

        for (var i = 0; i < friends.length; i++) {

            totalDifference = 0;
            var friend = friends[i];
            for (var j = 0; j < friend.scores.length; j++) {
                var num = Math.abs(parseInt((userScores[j]) - parseInt(friend.scores[j])));
                totalDifference += num;
            }
            console.log(totalDifference);
            if (totalDifference <= currentBestMatch.difference) {

                currentBestMatch.name = friend.name;
                currentBestMatch.photo = friend.photo;
                currentBestMatch.difference = totalDifference;
            }
        }
        friends.push(req.body);

        res.json(currentBestMatch);
    });
};