//file ou banco de dados...

module.exports = {
    logError
};

async function logError(error) {
    let errorObject = {
        error: error,
        date: new Date()
    };

    console.log('salvei o erro');

    //save
}