
console.log("------1-------")

// დავალება 1
function recursiveFunc(num, power, cb){

    if(typeof num !=="number") return "Please enter number";
    if(power === 0) return 1;
    let result = num * recursiveFunc(num, power-1, cb);
    cb(result);

    return result;
}

// test
const power = recursiveFunc(5,3, num => console.log(num));
console.log(power);
const power1 = recursiveFunc("5",3, num => console.log(num));
console.log(power1);

console.log("------2-------")
// დავალება 2
// then/ catch
// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(error => console.log(error))


//შევქმნათ პოსტის ქარდი 
function card(title){
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    let h1El = document.createElement('h1');
    h1El.innerText = title;
    wrapper.append(h1El);

    return wrapper;
}

// promise/fetch async/await
async function fetchPost(){
    try{
        const rawData = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!rawData.ok) throw Error('Bad Request')
        const Data = await rawData.json();

        Data.forEach((post) => {
            const postEl = card(post.title);
            document.body.append(postEl);
        })
        // console.log(Data);
    }
    catch (error){
        console.log(error.message);
    }
}
fetchPost();

// დავალება 3
console.log("------3-------")
const person = {
    name: "James",
    address: {
      Tbilisi: {
        District: {
          Street: "Tamarashvili"
        }
      }
    },
    friends: [
      { closeFriend: { name: "Giga" } },
      { closeFriend: { name: "Temo" } }
    ]
  };
  
  async function deepCopyObject(obj) {
    return new Promise((resolve, reject) => {
      if (typeof obj !== 'object' || obj === null) {
        reject('Input is not an object');
      } else {
        try {
          const result = Array.isArray(obj) ? [] : {};
          const promises = [];
  
          for (const key in obj) {
            if (typeof obj[key] === "object") {
              if (Array.isArray(obj[key])) {
                // array
                const copyArray = obj[key].map(el => deepCopyObject(el));
                promises.push(Promise.all(copyArray).then(res => result[key] = res));
              } else {
                // object
                const copyObj = deepCopyObject(obj[key]);
                promises.push(copyObj.then(res => result[key] = res));
              }
            } else {
              // primitive
              result[key] = obj[key];
            }
          }
  
          Promise.all(promises)
            .then(() => resolve(result))
            .catch(error => reject(error));
        } catch (error) {
          reject(error);
        }
      }
    });
  }
  
  // test
  deepCopyObject(person)
    .then(person2 => {
      person2.name = "Temo";
      person2.address.Tbilisi.District.Street = "Rustaveli";
      person2.friends[0].closeFriend.name = "John";
  
      console.log(person);
      console.log(person2);
    })
    .catch(error => console.error('Error:', error));
  