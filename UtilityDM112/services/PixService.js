const PixInfo = require("../model/Pixinfo");
const PixLib = require("../lib/PixLib");

module.exports = class PixService {
    async generatePix(req, res) {
        const { value, description } = req.body;

        try {
            const pixLib = new PixLib();
            const pix = new PixInfo();
            pix.setKey(pix.getDefaultKey());
            pix.setName(pix.getDefaultName());
            pix.setState(pix.getDefaultState());
            pix.setDescription(description);
            pix.setValue(value);

            return res.status(200).json({
                code: await pixLib.pixCode(pix),
                qr_code: await pixLib.pixQrCode(pix)
            })

        } catch (error) {
            return res.status(400).json({ message: errror.message })
        }
    }

}