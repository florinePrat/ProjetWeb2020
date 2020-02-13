const Room = require('../../../models/room');
module.exports = (req, res, next) => {
    if (req.params.category !== 'null' && req.params.city !== 'null') {
        Room.find(
            {$and :
                    [
                        {$and: [ { category : req.params.category }, { city : req.params.city  } ] },
                        { state : "published" }
                    ]
            })
            .then(rooms => res.status(200).json(rooms))
            .catch(error => res.status(400).json({error}));
    } else {
        Room.find(
            {
                $and:
                    [
                        {$or: [{category: req.params.category}, {city: req.params.city}]},
                        {state: "published"}
                    ]
            })
            .then(rooms => {console.log(rooms), res.status(200).json(rooms)})
            .catch(error => res.status(400).json({error}));
    }
};
