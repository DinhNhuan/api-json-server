const { date } = require("faker");
const faker = require("faker");
const fs = require("fs");

// set locate to use vietnamese
faker.locale = 'vi';

const randomCategoryList = (n) => {
    if (n <= 0) return [];
    const categoryList = []

    // loop and push category
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.number(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }

        categoryList.push(category)
    })
    return categoryList;
};

const randomProductList = (categoryList, numberProducts) => {
    if (numberProducts <= 0) return [];
    const productList = [];
    // console.log(categoryList);
    // random data 
    for (const category of categoryList) {
        Array.from(new Array(numberProducts)).forEach(() => {
            // console.log(category)
            const product = {
                categoryId: category.id,
                id: faker.datatype.number(),
                name: faker.commerce.productName(),
                price: parseFloat(faker.commerce.price(), 10),
                description: faker.commerce.productDescription(),
                image: `https://picsum.photos/id/${Math.ceil(Math.random()*1000)}/300/300`,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
            productList.push(product);
        })
    }
    return productList
}


// IFFE
(() => {
    // ramdom data 
    categoryList = randomCategoryList(10);
    productList = randomProductList(categoryList, 10);

    // prepare db object
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "abcd"
        },
    };

    // write bd object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('generate data successfully!!!')
    });
})()