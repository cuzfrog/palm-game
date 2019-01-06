function pluck(o, names) {
    return names.map(function (n) { return o[n]; });
}
var person = {
    name: 'Jarid',
    age: 35
};
var strings = pluck(person, ['name', "age"]); // ok, string[]
var nums = pluck([1, 5, 7, 223, 6], [1, 2, 3, 4, 5, 6, 7, 8, 9, 'length']);
console.log(typeof null);
console.log(nums);
