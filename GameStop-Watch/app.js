var intervalTime = 60;

document.addEventListener('DOMContentLoaded', () => {
    // https://financialmodelingprep.com/developer/docs

    getRequest(
        'https://financialmodelingprep.com/api/v3/quote-short/GME?apikey=14b993a7348de500f9571a5c8e3b020c',
        drawOutput
    );

    setInterval(() => {
        getRequest(
            'https://financialmodelingprep.com/api/v3/quote-short/GME?apikey=14b993a7348de500f9571a5c8e3b020c',
            drawOutput
        );
    }, 1000 * intervalTime);

    function drawOutput(responseText) {

        let resp = JSON.parse(responseText);

        var elements = document.querySelectorAll('.stock-name')[0];

        elements.innerHTML = "$ " + resp[0].price;

        var time = document.querySelectorAll('.time')[0];
        var usaTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
        usaTime = new Date(usaTime);
        time.innerHTML = usaTime;

    }

    function getRequest(url, success) {
        var req = false;
        try {
            req = new XMLHttpRequest();
        } catch (e) {
            try {
                req = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    req = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    return false;
                }
            }
        }
        if (!req) return false;
        if (typeof success != 'function') success = function () { };
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status === 200) {
                    success(req.responseText)
                }
            }
        }
        req.open("GET", url, true);
        req.send(null);
        return req;
    }



})





