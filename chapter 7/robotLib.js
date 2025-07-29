// Class that represents the state of the town and the parcels
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) return this;
        let parcels = this.parcels.map(p =>
            p.place !== this.place ? p : { place: destination, address: p.address }
        ).filter(p => p.place !== p.address);
        return new VillageState(destination, parcels);
    }

    static random(parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(roadGraph));
            let place;
            do {
                place = randomPick(Object.keys(roadGraph));
            } while (place === address);
            parcels.push({ place, address });
        }
        return new VillageState("Post Office", parcels);
    }
}

// Pick a random element from an array
function randomPick(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Simplified village map graph
const roadGraph = {
    "Post Office": ["Alice's House", "Bob's House"],
    "Alice's House": ["Post Office", "Cabin"],
    "Cabin": ["Alice's House"],
    "Bob's House": ["Post Office", "Town Hall"],
    "Town Hall": ["Bob's House"]
};

// Robot with a fixed route
/* function routeRobot(state, memory) {
    const route = ["Alice's House", "Cabin", "Alice's House", "Post Office", "Bob's House", "Town Hall", "Post Office"];
    if (memory.length === 0) memory = route;
    return { direction: memory[0], memory: memory.slice(1) };
} */

function routeRobot(state, memory) {
    const route = [
        "Alice's House",
        "Cabin",
        "Alice's House",
        "Post Office",
        "Bob's House",
        "Town Hall",
        "Post Office"
    ];

    if (memory.length === 0) {
        memory = route;
    }

    return { direction: memory[0], memory: memory.slice(1) };
}


// Robot goal oriented
function goalOrientedRobot({ place, parcels }, route) {
    if (route.length === 0) {
        let parcel = parcels[0];
        if (parcel.place !== place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

// Find the shortest route between two places
/* function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place === to) return route.concat(place);
            if (!work.some(w => w.at === place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
} */
function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place === to) return route.concat(place);
            if (!work.some(w => w.at === place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }

    // Si no encontró ruta
    console.log(`❗No se encontró ruta de ${from} a ${to}`);
    return []; // devuelve ruta vacía (esto causará que el robot no se mueva, pero evita cuelgue)
}

module.exports = {
    VillageState,
    roadGraph,
    randomPick,
    routeRobot,
    goalOrientedRobot,
    findRoute
};