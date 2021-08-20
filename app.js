const https =  require('https');

let runApp = true;

const checkBinanceSystem = () => {
    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'api.binance.com',
            path: '/sapi/v1/system/status',
            method: 'GET'
        }, (res) => {
            if (res.statusCode === 200) {
                res.on('data', (data) => {
                    const dataJson = JSON.parse(data.toString());
                    if (dataJson.status === 0 && dataJson.msg === 'normal') {
                        resolve('OK');
                    } else {
                        resolve('NOT OKAY');
                    }
                })
            }
        });

        req.on('error', error => {
            console.log(error);
            reject('API CALL ERROR');
        });

        req.end();
    });
}

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const ProgramLoop = async () => {
    while (runApp) {
        console.log('Checking Binance System Status');
        const systemStatus = await checkBinanceSystem();
        console.log(systemStatus);
        if (systemStatus === 'OK') {
            // Main trade loop
            while (true) {
                console.log('main program loop');
                await sleep(1000);
            }
        } else {
            continue;
        }
    }
}

ProgramLoop();
