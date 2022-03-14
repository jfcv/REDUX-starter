const person = {
  name: "John",
  address: {
    country: "USA",
    city: "San Francisco",
  },
};

console.log(person);

const updated = {
  ...person,
  address: {
    ...person.address,
    city: "New York",
  },
  name: "Bob",
};

console.log(updated);

console.log(person);
