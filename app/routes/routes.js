module.exports = app => {
    const urls = require("../controllers/controllers.js");
  
    //create a short url and return it to the user
    app.post("/api/urls", urls.create);
  
    //get all the URLs shortened
    app.get("/api/urls", urls.findAll);
  
    // Retrieve a single url with id
    app.get("/api/urls/:id", urls.findOne);
  
    //update the original URL given its ID
    app.put("/api/urls/:id", urls.update);
  
    //delete the shortened URL given its ID
    app.delete("/api/urls/:id", urls.delete);
  
  };