



const Adds = require("../models/addsModel")

getAdds = async (req, res) => {
  await Adds.find({}, (err, add) => {
    if (err) {
      return res.status(404).json({ success: false, error: err })
    } if (!add.length) {
      return res.status(404).json({ success: false, error: "didnt find what your looking for" })
    }
    return res.status(200).json({ success: true, data: add })
  }).clone().catch(err => console.log(err))
}
getAdds = async (req, res) => {
  await Adds.find({}, (err, add) => {
    if (err) {
      return res.status(404).json({ success: false, error: err })
    } if (!add.length) {
      return res.status(404).json({ success: false, error: "didnt find what your looking for" })
    }
    return res.status(200).json({ success: true, data: add })
  }).clone().catch(err => console.log(err))
}
searchAdds = async (req, res) => {
  const searchKey = req.params.searchKey;
  if (!searchKey) {
    return res.send({ reason: 'searchKey required' });
  }
  await Adds.find({ $text: { $search: searchKey } },
    (err, add) => {
      if (err) {
        return res.status(404).json({ success: false, error: err })
      } if (!add.length) {
        return res.status(404).json({ success: false, error: "didnt find what your looking for" })
      }
      return res.status(200).send({ data: add })
    }).clone().catch(err => console.log(err))
}





getPainter = async (req, res) => {
  await Adds.find({ category: "Målare" }, (err, add) => {
    if (err) {
      return res.status(404).json({ success: false, error: err })
    } if (!add.length) {
      return res.status(404).json({ success: false, error: "didnt find what your looking for" })
    }
    return res.status(200).json({ success: true, data: add })
  }).clone().catch(err => console.log(err))
}


getCarpenter = async (req, res) => {
  await Adds.find({ category: "Snickare" }, (err, add) => {
    if (err) {
      return res.status(404).json({ success: false, error: err })
    } if (!add.length) {
      return res.status(404).json({ success: false, error: "didnt find what your looking for" })
    }
    return res.status(200).json({ success: true, data: add })
  }).clone().catch(err => console.log(err))
}


getPlumber = async (req, res) => {
  await Adds.find({ category: "Rörmockare" }, (err, add) => {
    if (err) {
      return res.status(404).json({ success: false, error: err })
    } if (!add.length) {
      return res.status(404).json({ success: false, error: "didnt find what your looking for" })
    }
    return res.status(200).json({ success: true, data: add })
  }).clone().catch(err => console.log(err))
}


getFloorLayer = async (req, res) => {
  await Adds.find({ category: "Golvläggare" }, (err, add) => {
    if (err) {
      return res.status(404).json({ success: false, error: err })
    } if (!add.length) {
      return res.status(404).json({ success: false, error: "didnt find what your looking for" })
    }
    return res.status(200).json({ success: true, data: add })
  }).clone().catch(err => console.log(err))
}



getUserAdds = async (req, res) => {
  await Adds.find({ email: req.params.email }, (err, add) => {
    if (err) {
      return res.status(404).json({ success: false, error: err })
    } if (!add.length) {
      return res.status(404).json({ success: false, error: "didnt find what your looking for" })
    }
    return res.status(200).json({ success: true, data: add })
  }).clone().catch(err => console.log(err))
}



createAdds = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "this is not an add",
    })
  }

  const add = new Adds(body)

  if (!add) {
    return res.status(400).json({ success: false, error: err })
  }

  add.save()

}

deleteAdds = async (req, res) => {
  try {
    await Adds.findOneAndDelete({ _id: req.params.AddsId }, (err, Add) => {

      return res.status(200).json({ success: true, data: Add })

    }

    ).clone()
  }

  catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};





module.exports = { getAdds, createAdds, deleteAdds, getUserAdds, getPainter, getPlumber, getCarpenter, getFloorLayer, searchAdds }