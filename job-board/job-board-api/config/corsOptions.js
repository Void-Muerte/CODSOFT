const env = process.env.NODE_ENV || "development";
const allowedOrigins = [process.env.ALLOWED_URL];

exports.corsOptions = () => ({
  origin: (origin, callback) => {
    if (env === "production") {
      if (!origin || !allowedOrigins.includes(origin)) {
        callback(new Error("Not Allowed by CORS"));
      } else {
        callback(null, true);
      }
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: "GET, PUT, POST, DELETE",
});
