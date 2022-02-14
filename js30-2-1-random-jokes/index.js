// const rth = document.querySelector(".block-2one");
// rth.classList.add("block-one");
// console.log(rth.classList);
// const cort = document.querySelector(".block2one");
// cort.classList.add("blockone");

const container = document.querySelector(".container")
container.classList.add("container-styles");


console.log(container.classList);
const block = document.createElement("span")
block.classList.add("block")
container.append(block)

// const rth = document.createElement("div");
// rth.classList.add("block-one")
// container.append(rth)


const url = 'https://type.fit/api/quotes';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
   
  }
  getData();

  const spanblock = document.querySelector(".spanblock")
  spanblock.classList.add("span");
const read = document.createElement("p");
read.textContent = 'fghjjhhgyyhh5667';
read.classList.add("p");
document.body.append(p);
 
// const keys = Object.keys(data)
//   data[0].text;
 



// const listElement = document.querySelector('ul')
// const listItem = document.createElement("li");
// const listItemCheckbox = document.createElement("input");
// const listItemLabel = document.createElement("label");

// listElement.append(listItem, listItemCheckbox, listItemLabel);