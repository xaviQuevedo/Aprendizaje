const {
    VillageState,
    roadGraph,
    routeRobot,
    goalOrientedRobot,
    findRoute
} = require("./robotLib");

const { compareRobots } = require("./compareRobots");
const { lazyRobot } = require("./lazyRobot");
const { PGroup } = require("./pgroup");

console.log("Comparing robots...");
compareRobots(routeRobot, [], goalOrientedRobot, [], VillageState);
compareRobots(goalOrientedRobot, [], (state, mem) => lazyRobot(state, mem, roadGraph, findRoute), [], VillageState);

console.log("\n Probando PGroup");
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log("b tiene 'b':", b.has("b"));
console.log("a tiene 'b':", a.has("b"));
console.log("b tiene 'a':", b.has("a"));

