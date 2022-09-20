const express = require("express")
const mongoose = require("mongoose")


addsSchema = new mongoose.Schema({

  id: { type: Number },
  heading: { type: String },
  description: { type: String },
  img: { type: String },
  email: { type: String },
  category: { type: String }


},
  { timestamps: true },
)
addsSchema.index({ '$**': 'text' });

const adds = mongoose.model("add", addsSchema)

module.exports = adds
