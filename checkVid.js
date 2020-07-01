const fetch = require("node-fetch");

async function check(id) {
    const url = `https://github.com/filiptronicek/STC-intro/raw/master/render/${id}.mp4`;
    let response = await fetch(url);
    return response.ok;
}
module.exports.check = check;