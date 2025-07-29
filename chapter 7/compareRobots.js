/* function countSteps(state, robot, memory) {
    for (let steps = 0; ; steps++) {
        if (state.parcels.length === 0) return steps;
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}
 */

function countSteps(state, robot, memory) {
    for (let steps = 0; ; steps++) {
        if (steps > 1000) {
            console.log("⛔ Bucle infinito detectado, saliendo...");
            return steps;
        }

        if (state.parcels.length === 0) return steps;

        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

function compareRobots(robot1, memory1, robot2, memory2, VillageState) {
    let total1 = 0, total2 = 0;
    for (let i = 0; i < 100; i++) {
        let task = VillageState.random(3);
        total1 += countSteps(task, robot1, memory1);
        total2 += countSteps(task, robot2, memory2);
    }
    console.log("Average robot 1:", total1 / 100);
    console.log("Average robot 2:", total2 / 100);
}
module.exports = { compareRobots };