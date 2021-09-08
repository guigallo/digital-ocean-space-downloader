require('dotenv').config()

const config = {
  bucket: process.env.SPACES_BUCKET,
  endpoint: process.env.SPACES_ENDPOINT,
  auth: {
    key: process.env.SPACES_KEY,
    secret: process.env.SPACES_SECRET,
  }
}

module.exports = config
