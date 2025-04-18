import User from "../models/UserModel.js";
export const searchContacts = async (request, response, next) => {
    try{
        const {searchTerm} = request.body;
        if(searchTerm===undefined || searchTerm===null){
            return response.status(400).send("Search term is required");
        }
        const sanitizedSearchTerm=searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g, '\\$&' // Escape special characters for regex
        )
        const regex=new RegExp(sanitizedSearchTerm, "i");
        const contacts=await User.find({
            $and: [
                { _id: { $ne: request.userID } },
                { $or: [
                    { firstName: regex },
                    { lastName: regex },
                    { email: regex }
                ]}
            ]
        })
         return response.status(200).json({contacts});
    } catch (err) {
        console.log(err.message);
        return response.status(500).send("Internal Server Error", err.message);
    }
};