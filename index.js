const fetch = require('node-fetch');

//set proxy as shown in README.md

// number of users you want to create
const numbOfUsers = 10;

// add token (of the corresponding environment)
const token = '';

const url = 'http://localhost:8010/proxy/api/adapter';

const letters = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';

const getRandomString = (length = 7) => Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');

const getRandomPhoneNumber = (length = 9) => `+971${Number(Array.from({ length }, () => Math.floor(Math.random() * 9)).join(''))}`

let counter = 0;

const createUsers = async (index) => {

  const data = {
    firstName: getRandomString(),
    lastName: getRandomString(),
    email: `${getRandomString()}@gmail.com`,
    phoneNumber: getRandomPhoneNumber(),
    name: getRandomString(),
    tenant: 'salama',
    broker: 'dubaiBrokers'
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      counter += 1;
      console.log(`${index} | ${data.email} was created successfully`);
    } else {
      console.log(`❌ ${index} | failed to create ${data.email}`, await response.text());

    }

  } catch (err) {
    console.log(`${index} | something went wrong, err: ${JSON.stringify(err)}`);
  }
}

(async () => {
  const promises = [];

  for (let i = 1; i <= numbOfUsers; i++) {
    promises.push(createUsers(i));
  }

  await Promise.all(promises);
  console.log(`\n🟢🟢🟢 ${counter} out of ${numbOfUsers} users were created successfully 🟢🟢🟢\n`);

})();

