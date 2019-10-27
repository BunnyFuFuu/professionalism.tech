const { execSync } = require("child_process");


/** @type {APIEndpoint} */
module.exports = function(req, res) {
    /** @type {string} */
    let text = req.query.text;
    if (text)
        text = text.replace(/"/g, "\\\"").trim();

    if (!text)
        // Bad request
        return void res.sendStatus(400);

    let command = `aws comprehend detect-sentiment --region us-west-2 ` + 
                  `--language-code "en" --text "${text}"`;

    let start = Date.now();
    if (process.platform != "win32") command = "sudo " + command;
    let result = execSync(command);

    console.log(`Requesting text ${text}, ` + 
                `time elapsed: ${((Date.now() - start) / 1000).toFixed(2)}s`);

    try {
        let parsed = JSON.parse(result);
        res.json(parsed);
    } catch (_) {
        // Interal server error
        res.sendStatus(500);
    }
}