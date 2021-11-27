// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    RESTURL_SPEAKERS: (() => {
      if (isDev) return "http://localhost:4000/speakers";
      if (isProd) {
        return "https://www.siliconvalley-codecamp.com/rest/speakers/ps";
      }
      if (isStaging) return "http://localhost:11639";
      return "RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
    RESTURL_SESSIONS: (() => {
      if (isDev) return "http://localhost:4000/sessions";
      if (isProd) return "https://www.siliconvalley-codecamp.com/rest/sessions";
      if (isStaging) return "http://localhost:11639";
      return "RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
    RESTURL_SOCKETS: (() => {
      if (isDev) return "http://localhost:4000";
      if (isProd) return "https://h2h-tester.herokuapp.com";
      // if (isStaging) return "http://localhost:11639";
      return "RESTURL_SOCKETS:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
    API_BASE_URL: "https://soccer.sportmonks.com/api/v2.0",
    API_TOKEN: "Tof53Ing3VoDALtQSoGLCYMvktGEXSyGM4UAZRbciqkpqhtAGI7vjtv68u6S",
    // API_TOKEN: "X24XJih4JMDTP8sqABulLIhje48aTS5Xp3IUuaMnvm3iS2P5yFKzVrFvrsvo",
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
