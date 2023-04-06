const { default: mongoose } = require("mongoose");

const allocatedShift = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  startDate: {
    type: Date,
    // required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  monday: {
    startTime: {
      type: String,
      // required: true,
    },
    startTimeAbbreviations: {
      type: String,
      // required: true,
    },
    endTime: {
      type: String,
      // required: true,
    },
    endTimeAbbreviations: {
      type: String,
      // required: true,
    },
  },
  tuesday: {
    startTime: {
      type: String,
      // required: true,
    },
    startTimeAbbreviations: {
      type: String,
      // required: true,
    },
    endTime: {
      type: String,
      // required: true,
    },
    endTimeAbbreviations: {
      type: String,
      // required: true,
    },
  },
  wednesday: {
    startTime: {
      type: String,
      // required: true,
    },
    startTimeAbbreviations: {
      type: String,
      // required: true,
    },
    endTime: {
      type: String,
      // required: true,
    },
    endTimeAbbreviations: {
      type: String,
      // required: true,
    },
  },
  thursday: {
    startTime: {
      type: String,
      // required: true,
    },
    startTimeAbbreviations: {
      type: String,
      // required: true,
    },
    endTime: {
      type: String,
      // required: true,
    },
    endTimeAbbreviations: {
      type: String,
      // required: true,
    },
  },
  friday: {
    startTime: {
      type: String,
      // required: true,
    },
    startTimeAbbreviations: {
      type: String,
      // required: true,
    },
    endTime: {
      type: String,
      // required: true,
    },
    endTimeAbbreviations: {
      type: String,
      // required: true,
    },
  },
  saturday: {
    startTime: {
      type: String,
      // required: true,
    },
    startTimeAbbreviations: {
      type: String,
      // required: true,
    },
    endTime: {
      type: String,
      // required: true,
    },
    endTimeAbbreviations: {
      type: String,
      // required: true,
    },
  },
  sunday: {
    startTime: {
      type: String,
      // required: true,
    },
    startTimeAbbreviations: {
      type: String,
      // required: true,
    },
    endTime: {
      type: String,
      // required: true,
    },
    endTimeAbbreviations: {
      type: String,
      // required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("allocatedShift", allocatedShift);
