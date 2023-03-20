const { default: mongoose } = require("mongoose");

const availability = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  monday: {
    startTime: {
      type: Number,
      required: true,
    },
    startTimeAbbreviations: {
      type: String,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    endTimeAbbreviations: {
      type: String,
      required: true,
    },
  },
  tuesday: {
    startTime: {
      type: Number,
      required: true,
    },
    startTimeAbbreviations: {
      type: String,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    endTimeAbbreviations: {
      type: String,
      required: true,
    },
  },
  wednesday: {
    startTime: {
      type: Number,
      required: true,
    },
    startTimeAbbreviations: {
      type: String,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    endTimeAbbreviations: {
      type: String,
      required: true,
    },
  },
  thursday: {
    startTime: {
      type: Number,
      required: true,
    },
    startTimeAbbreviations: {
      type: String,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    endTimeAbbreviations: {
      type: String,
      required: true,
    },
  },
  friday: {
    startTime: {
      type: Number,
      required: true,
    },
    startTimeAbbreviations: {
      type: String,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    endTimeAbbreviations: {
      type: String,
      required: true,
    },
  },
  saturday: {
    startTime: {
      type: Number,
      required: true,
    },
    startTimeAbbreviations: {
      type: String,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    endTimeAbbreviations: {
      type: String,
      required: true,
    },
  },
  sunday: {
    startTime: {
      type: Number,
      required: true,
    },
    startTimeAbbreviations: {
      type: String,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    endTimeAbbreviations: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("availability", availability);
