const DownloadList = require('../models/downloadlist')
exports.getDownloadlist = async (req,res)=>{
    try {
        // if(!req.user.ispremiumuser){
        //     return res.status(401).json({ success: false, message: 'User is not a premium User'})
        // }
        const list = await DownloadList.findAll({where: {userId: req.user.id}});
        // console.log(list);
        return res.status(200).json(list)
    } 
    catch (error) {
        return res.status(500).json({succese: false, error: err})
    }
}