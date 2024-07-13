let data = require('./zips.json');

module.exports.lookupByZipCode =  (zip) => {
    // print info
    // console.log(`Look up by zip code (${zip})`);
    // create result obejct
    const result = data.find(item => item._id === zip);
    // print result and return
    // console.log(result);
    return result;
};

module.exports.lookupByCityState = (city, state) => {
    // print info
    // console.log(`Look up by city (${city}, ${state})`);
    // create the result obejct for return
    let result = {
        'city': city,
        'state': state,
        'data': []
    }
    // filter by city and state
    const filtered = data.filter(i => i.city === city && i.state === state).map(i => ({zip: i._id, pop: i.pop}));
    // assign filtered data to result
    result.data = filtered;

    // print the result and return
    // console.log(result);
    return result;
};

module.exports.getPopulationByState = (state) => {
    // print info
    // console.log(`Get population by state (${state})`);
    // get total pop by state
    const totalPop = data.reduce((pop, item) => {
        if (item.state === state) {
            return pop + item.pop;
        }
        return pop;
    }, 0);
    // create the result obejct for return
    const result = {
        'state': state,
        'pop': totalPop
    };
    // print the result and return
    // console.log(result);
    return result;
};
