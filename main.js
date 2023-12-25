
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
        console.log(Data);
    }
    catch (error){
        console.log(error.message);
    }
}
fetchPost();

// დავალება 3
console.log("------3-------")