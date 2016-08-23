var appRouter = function (app, Network, passport) {

    //get the top network for a given network version
    app.get("/network/:version", passport.authenticate('bearer', { session: false }), function(req, res) {
        if (!req.params.version) {
            return res.send({ "status": "error", "message": "missing version" });
        } else {
            Network.findMax(req.params.version, function(err, topNetwork)
            {
                console.log(topNetwork);
                res.send(topNetwork);
            });
        }
    });

    //post a network to save for a given network version, save if the highest
    app.post("/network", passport.authenticate('bearer', { session: false }), function(req, res){
        if (!req.body.networkGenes || !req.body.eval || !req.body.version) {
            return res.send({ "status": "error", "message": "missing a parameter" });
        } else {
            Network.findMax(req.body.version, function(err, topNetwork)
            {
                if(err){
                    console.log(err);
                }
                console.log(topNetwork);
                console.log('eval:' + req.body.eval);
                if(!topNetwork || req.body.eval > topNetwork.eval){
                    var newNetwork = new Network({
                        networkGenes: req.body.networkGenes,
                        eval: req.body.eval,
                        version: req.body.version
                    });
                    newNetwork.save(function(err) {
                        if (err){
                            res.status(500).send(error);
                        }
                        else{
                            console.log('Network saved successfully!');
                            res.send("added");
                        }
                     });
                }
                else{
                    return res.send("not added");
                }
            });
            
        }
    });
}

module.exports = appRouter;