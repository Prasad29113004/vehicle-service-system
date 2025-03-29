const serviceUpdates = [];

class ServiceUpdate {
  constructor(serviceId, type, mediaUrl, title, description) {
    this.serviceId = serviceId;
    this.type = type;
    this.mediaUrl = mediaUrl;
    this.title = title;
    this.description = description;
    this.timestamp = new Date();
  }

  static addUpdate(update) {
    serviceUpdates.push(update);
    return update;
  }

  static getUpdatesByService(serviceId) {
    return serviceUpdates.filter(update => update.serviceId === serviceId);
  }
}

const mongoose = require('mongoose');

const serviceUpdateSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  title: String,
  description: String,
  media: {
    videos: [String], // Stores filenames
    images: [String]
  },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'] },
  technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: Date
});

module.exports = mongoose.model('ServiceUpdate', serviceUpdateSchema);

module.exports = ServiceUpdate;