module.exports = (phase) => {
  const env = {
    MONGODB_URI:
      "mongodb+srv://admin:admin593@cluster0.stfp2.mongodb.net/anat?retryWrites=true&w=majority",

    MONGODB_DB: "anat",

    PROD_URL: "",
  };

  // next.config.js object
  return {
    env,
  };
};
