var express = require("express");
var router = express.Router();

var Entry = require("../models/Entry");
var { corruptText } = require("../utils/corruptText");

// GET /entries
router.get("/", async function (req, res) {
  try {
    const { tag } = req.query;

    const query = {};
    if (tag) query.tags = tag;

    const entries = await Entry.find(query).sort({ createdAt: -1 });

    const transformed = entries.map((e) => ({
      _id: e._id,
      title: e.title,
      tags: e.tags,
      signalStrength: e.signalStrength,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      body: corruptText(e.body, e.signalStrength),
    }));

    res.json({ success: true, entries: transformed });
  } catch (err) {
    console.error("GET /entries error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch entries" });
  }
});

// POST /entries
router.post("/", async function (req, res) {
  try {
    const { title, body, tags, signalStrength } = req.body;

    if (!body || body.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Body is required" });
    }

    const normalizedTags = typeof tags === "string"
      ? tags.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    const normalizedSignal =
      ["strong", "unstable", "broken"].includes(signalStrength)
        ? signalStrength
        : "unstable";

    const entry = await Entry.create({
      title: title || "",
      body,
      tags: normalizedTags,
      signalStrength: normalizedSignal,
    });

    res.status(201).json({ success: true, entryId: entry._id });
  } catch (err) {
    console.error("POST /entries error:", err);
    res.status(500).json({ success: false, error: "Failed to create entry" });
  }
});

// GET /entries/:id
router.get("/:id", async function (req, res) {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ success: false, error: "Entry not found" });
    }

    res.json({
      success: true,
      entry: {
        _id: entry._id,
        title: entry.title,
        tags: entry.tags,
        signalStrength: entry.signalStrength,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        body: corruptText(entry.body, entry.signalStrength),
      },
    });
  } catch (err) {
    console.error("GET /entries/:id error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch entry" });
  }
});

module.exports = router;
