// A robot that picks the best route with priority on deliveries
function lazyRobot({ place, parcels }, route, roadGraph, findRoute) {
    if (route.length === 0) {
        let routes = parcels.map(parcel => {
            if (parcel.place !== place) {
                return {
                    route: findRoute(roadGraph, place, parcel.place),
                    pickUp: true
                };
            } else {
                return {
                    route: findRoute(roadGraph, place, parcel.address),
                    pickUp: false
                };
            }
        });

        function score({ route, pickUp}){
            return (pickUp ? 0.5 : 0)- route.length;
        }
        route = routes.reduce((a,b) => score(a) > score(b) ? a: b).route;
    }
    return { direction: route[0], memory: route.slice(1)};
}

module.exports = { lazyRobot };