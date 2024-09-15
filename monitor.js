const axios = require("axios");
const puppeteer = require("puppeteer");
const { email, password} = require ("./config.json")

const width = 1920;
const height = 1080;
const path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function launchBrowser() {
  return puppeteer.launch({
    headless: false,
    executablePath: path,
    args: [
      `--window-size=${width}, ${height}`,
      // `--user-agent=${userAgent}`,
      `--no-sandbox`,
      // proxy ? `--proxy-server=${proxy.ip}:${proxy.port}` : '',
    ],
    devtools: false,
    defaultViewport: null,
    slowMo: 10,
  });
}

async function wait(s) {
  return new Promise((res, rej) => {
    setTimeout(() => {
        res()
    }, s*1000)
  })
}

const fetchTimeSlot = async () => {
  const startDate = `2024-09-27`;
  const endDate = `2024-09-27`;
  const party = 4;
  const url = `https://disneyworld.disney.go.com/dine-res/api/availability/${party}/${startDate},${endDate}?facilityId=215686;entityType=restaurant&entityType=restaurant`;
  console.log(url);

  const browser = await launchBrowser();
  const page = await browser.newPage();

  await page.goto(
    "https://disneyworld.disney.go.com/dine-res/restaurant/yak-and-yeti-restaurant"
  );
  console.log(`call1`)

  await wait(3)
  console.log(`waited for 3 sec`)
  await page.waitForSelector("iframe[id=oneid-iframe]",  { timeout: 60000 })

  const iframe = await page.$("iframe[id=oneid-iframe]")

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document

  console.log(`iframed loaded`, iframe)
  await iframeDoc.type('input[id=InputIdentityFlowValue]', email, {delay: 50})

  await wait(3)
  console.log(`waited 3 more sec`)

  // await Promise.all([
  //     page.click('#btnSubmit'),
  //     page.waitForNavigation({ waitUntil: 'networkidle0' })
  //   ]);


  // // Extract cookies
  // const cookies = await page.cookies();
  // const cookieString = cookies
  //   .map((cookie) => `${cookie.name}=${cookie.value}`)
  //   .join("; ");

  // console.log(`Cookie String: ${cookieString}`);

  // // Close Puppeteer
  // // await browser.close();

  // try {
  //   const resp = await axios.get(url, {
  //     headers: {
  //       "User-Agent":
  //         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  //       Accept: "application/json, text/plain, */*",
  //       Cookie: cookieString,
  //     },
  //   });
  //   console.log(`API request successfully`);
  //   const timeSlot = resp;
  //   console.log(timeSlot);
  // } catch (error) {
  //   console.log(`API request failed`, { error });
  // }
};

fetchTimeSlot();
