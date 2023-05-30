const axios = require("axios");
const { API_KEY } = process.env;

const getPlataforms = async () => {
  try {
    let apiplataforms = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    apiplataforms = apiplataforms.data.results;
    apiplataforms = apiplataforms.map((plataform) => {
      return {
        name: plataform.name,
      };
    });
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getPlataforms,
};
