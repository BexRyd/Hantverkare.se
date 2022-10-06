const express = require("express");
const router = express.Router();
const addsController = require("../controller/addsController")
const authController = require("../controller/authController")



router.get("/myPage", addsController.getAdds, (request, response) => {

  response.json({
    status: "success",
    method: request.method,

  })
});


router.get("/myPage/:email", addsController.getUserAdds, (request, response) => {

  response.json({
    status: "success",
    method: request.method,

  })
});
router.get("/painter", addsController.getPainter, (request, response) => {

  response.json({
    status: "success",
    method: request.method,

  })
});
router.get("/carpenter", addsController.getCarpenter, (request, response) => {

  response.json({
    status: "success",
    method: request.method,

  })
});
router.get("/plumber", addsController.getPlumber, (request, response) => {

  response.json({
    status: "success",
    method: request.method,

  })
});
router.get("/floorlayer", addsController.getFloorLayer, (request, response) => {

  response.json({
    status: "success",
    method: request.method,

  })
});
router.get("/search/:searchKey", addsController.searchAdds, (request, response) => {

  response.json({
    status: "success",
    method: request.method,


  })
});




router.post("/myPage", authController.protect, addsController.createAdds, (request, response) => {


  response.json({
    status: "success",
    method: request.method,

  });
})
router.delete("/myPage/:AddsId", authController.protect, authController.restrictTo("admin"), addsController.deleteAdds, (request, response) => {


  response.json({
    status: "success",
    method: request.method,

  });
})
router.delete("/myAdd/:AddsId", authController.protect, addsController.deleteAdds, (request, response) => {


  response.json({
    status: "success",
    method: request.method,

  });
})
router.put("/updateMyAdd/:AddsId",authController.protect, addsController.updateOneAdd, (request, response) => {
  

  response.json({
    status: "success",
    method: request.method,
    
  });
})

router.put("/myage/:serviceid", (request, response) => {

  const serviceid = Number(request.params.serviceid);
  const heading = request.body.heading;
  const description = request.body.description;
  const img = request.body.img;
  const email = request.body.email;

  const newService = {
    serviceid,
    heading,
    description,
    img,
    email,

  }




  const serviceIndex = services.findIndex((service) => service.id === serviceid) // hämtar ut index för service vi vill uppdatera
  services[serviceIndex] = newService                                  // i det index vi hämtar ut vill vi skriva över med newService




  response.json({             // skickar tillbaka svar .status- success, metod -put 
    status: 'success',
    method: request.method,
    data: newService,
  });

})

router.patch("/myPage/:email", authController.protect, addsController.updateAdds, (req, res) => {

})

/* router.delete('/myPage/:serviceid', (request, response) => {

  const serviceid = Number(request.params.serviceid)

  const serviceIndex = services.findIndex((service) => service.id === serviceid)


  if (serviceIndex > -1) {     // om den existerar
    services.splice(serviceIndex, 1)   // tar bort om den existerar på platsen
  }


  response.json({             // skickar tillbaka svar .status- success, metod -put 
    status: 'success',
    method: request.method,
    data: serviceid,
  });
}) */

module.exports = router;