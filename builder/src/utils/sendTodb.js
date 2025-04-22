const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/your-db-name'; // Replace with your Mongo URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const projectLogSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
    unique: true, // ensure uniqueness of domain
  },
  username: {
    type: String,
    required: true,
  },
  logs: {
    type: [Object],
    default: [],
  },
});

// Create model
const ProjectLog = mongoose.model('ProjectLog', projectLogSchema, 'projectlogs');

// Main function to save logs
async function sendToDb(logData, username) {
  const { domain } = logData;

  try {
    const existing = await ProjectLog.findOne({ domain });

    if (existing) {
      // Domain exists — push log into logs[]
      await ProjectLog.updateOne(
        { domain },
        { $push: { logs: logData } }
      );
      console.log(`📌 Updated logs for existing domain: ${domain}`);
    } else {
      // Create new document
      await ProjectLog.create({
        domain,
        username,
        logs: [logData],
      });
      console.log(`✅ Created new project log for domain: ${domain}`);
    }
  } catch (error) {
    console.error('❌ Error in sendToDb:', error.message);
  }
}

module.exports = { sendToDb };
