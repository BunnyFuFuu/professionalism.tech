const { execSync } = require("child_process");


/** @type {APIEndpoint} */
module.exports = function(req, res) {
    /** @type {string} */
    let text = req.query.text;

    if (!text)
        // Bad request
        return void res.sendStatus(400);

    let result = execSync(`aws comprehend detect-sentiment --region us-west-2 ` + 
                          `--language-code "en" --text "${text.replace(/"/g, "\\\"")}"`);

    try {
        let parsed = JSON.parse(result);
        res.json(parsed);
    } catch (_) {
        // Interal server error
        res.sendStatus(500);
    }
}