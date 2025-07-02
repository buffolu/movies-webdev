const Links = require('../model/links.js');
const Link = require('../model/link.js');
const path = require('path');



const movieLinkController = {
    //adds new link based on userID and movieID
    addLink: async (req, res) => {
        const { userID,link} = req.body;
        const { movieID} = req.params;
        const newLink = new Link({title: link.title, url: link.url, description: link.description, isPublic: link.isPublic, userID: userID});
        try {
            let movieLinks = await Links.findOne({ movieID });

            if (!movieLinks) {
                // Create a new MovieLink entry if it doesn't exist
                movieLinks = new Links({
                    movieID,
                    linksList: [newLink] // Ensure correct field name
                });
            } else {
                // Push the new link to the existing movie's linksList
                movieLinks.linksList.push(newLink);
            }
            await movieLinks.save();
            link._id = newLink._id; // Add the _id to the link object
            res.status(200).json({ message: "Link added", link }); // Return the link with _id
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },


    //UPDATED A LINK BASED ON USERID LINKID MOVIEID
    updateLink: async (req, res) => {
        const { link,userID } = req.body;
        const { linkID, movieID } = req.params;

        try {
            const movieLinks = await Links.findOne({ movieID });
            if (!movieLinks) {
                return res.status(404).json({ message: "Movie links not found" });
            }

            const linkIndex = movieLinks.linksList.findIndex(link => link._id.toString() === linkID);
            if (linkIndex === -1) {
                return res.status(404).json({ message: "Link not found" });
            }
            if (movieLinks.linksList[linkIndex].userID !== userID) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            // Update the link while preserving its _id
            movieLinks.linksList[linkIndex].title = link.title;
            movieLinks.linksList[linkIndex].url = link.url;
            movieLinks.linksList[linkIndex].description = link.description;
            await movieLinks.save();

            res.status(200).json({ message: "Link updated"});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    //DELETE A LINK
    deleteLink: async (req, res) => {
        const { linkID, movieID,userID} = req.params;
        
        try {
            const movieLinks = await Links.findOne({ movieID });
            if (!movieLinks) {
                return res.status(404).json({ message: "Movie links not found" });
            }   
            const linkIndex = movieLinks.linksList.findIndex(link => link._id.toString() === linkID);
            if (movieLinks.linksList[linkIndex].userID !== userID) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            movieLinks.linksList = movieLinks.linksList.filter(link => link._id.toString() !== linkID);

            await movieLinks.save();

            res.status(200).json({ message: "Link deleted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    //FETCH ALL LINKS
    allLinks: async (req, res) => {
        const { movieID,userID } = req.params;

        try {
            let movieLinks = await Links.findOne({ movieID });

            if (!movieLinks) {
                movieLinks = new Links({
                    movieID,
                    linksList: []
                });
                await movieLinks.save();
            }

            // Filter links based on ownership & public status
            let returnLinks = movieLinks.linksList.filter(link => 
                link.userID === userID || link.isPublic === true
            );


            // return the links without userID
             // Remove userID from each link before returning
            returnLinks = returnLinks.map(link => {
                const linkObj = link.toObject(); // Convert Mongoose document to plain object
                
                const { userID: linkUserID, ...linkWithoutUserID } = linkObj; // Rename destructured userID
            
                // Now compare with req.params.userID (the correct one)
                linkWithoutUserID.isMine = (linkUserID === userID);
                
                return linkWithoutUserID;
            });
            
            res.status(200).json({ links: returnLinks });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};
exports.movieLinkController = movieLinkController;