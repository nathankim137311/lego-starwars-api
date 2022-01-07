const puppeteer = require('puppeteer'); 

async function fetchProducts(url) {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto(url);
    // wait for pop up window and click 'continue' button
    await page.waitForSelector('button[class="Button__Base-sc-1jdmsyi-0 eLFkVi AgeGatestyles__StyledButton-xudtvj-12 hycfPw"]');
    await page.click('button[class="Button__Base-sc-1jdmsyi-0 eLFkVi AgeGatestyles__StyledButton-xudtvj-12 hycfPw"]')

    // wait for another pop-up and click 'Accept All' button 
    await page.waitForSelector('button[class="Button__Base-sc-1jdmsyi-0 aKFCv CookieModalstyles__PrimaryButton-sc-19wlthm-7 fzEDYJ"]');
    await page.click('button[class="Button__Base-sc-1jdmsyi-0 aKFCv CookieModalstyles__PrimaryButton-sc-19wlthm-7 fzEDYJ"]');

    await page.waitForSelector('a[data-test="product-leaf-title-link"]');

    const linksArr = await page.evaluate(() => {
        return [...document.querySelectorAll('a[data-test="product-leaf-title-link"]')].map(link => link.href);
    });

    const productsArr = [];

    const productDetails = async (link) => {
        await page.goto(link);
        
        const productName = await page.evaluate(async () => {
            // scroll to the bottom of the page
            const distance = 300;
            const delay = 50;
            while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
                document.scrollingElement.scrollBy(0, distance);
                await new Promise(resolve => { setTimeout(resolve, delay); });
            }

            return {
                product_name: document.querySelector('h1.Text__BaseText-sc-178efqu-0 > span').textContent,
                item_id: document.querySelector('span[data-test="product-details__product-code"]').textContent,
                reviews: document.querySelector('button[data-test="product-overview-reviews"]') === null ? '0' : document.querySelector('button[data-test="product-overview-reviews"]').textContent,
                rating: document.querySelector('span[class="Reviewsstyles__Microdata-bzbdaf-0 iAUoUt"] > span[itemprop="ratingValue"]') === null ? 'none' : document.querySelector('span[class="Reviewsstyles__Microdata-bzbdaf-0 iAUoUt"] > span[itemprop="ratingValue"]').textContent,
                availability: document.querySelector('p[data-test="product-overview-availability"] > span').textContent,
                price: document.querySelector('.hviDue').textContent.replace(/[A-Za-z\$]/g, ''), 
                images: [...document.querySelectorAll('img[class="Imagestyles__Img-m2o9tb-0 jyexzd Thumbnail__StyledImage-e7z052-1 vTyKJ"]')].map(image => image.src),
                ages: document.querySelector('span.Text__BaseText-sc-178efqu-0.cMNVBC.ProductDetailsstyles__ProductAttributeValue-sc-16lgx7x-6.iLLHZh > span.Markup__StyledMarkup-ar1l9g-0.hlipzx').textContent, 
                pieces: document.querySelector('span[data-test="product-details__piece-count"]') === null ? 'n/a' : document.querySelector('span[data-test="product-details__piece-count"]').textContent,   
            }
        });

        console.log(productName);
        productsArr.push(productName);
    }

    for (let i = 0; i < linksArr.length; i++) {
        await productDetails(linksArr[i]);
        console.log(`extracting product detail page ${i}...`); 
    }

    console.log(productsArr);
    console.log(productsArr.length);
    await browser.close();
}

const url = 'https://www.lego.com'
fetchProducts('https://www.lego.com/en-us/themes/star-wars');