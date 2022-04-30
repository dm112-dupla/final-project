const { Pix } = require('faz-um-pix');

module.exports = class PixLib {
    pixCode(pixInfo) {
        return Pix(pixInfo.getDefaultKey(),
            pixInfo.getDefaultName(),
            pixInfo.getDefaultState(),
            pixInfo.getValue(),
            pixInfo.getDescription())
    }
    pixQrCode(pixInfo) {
        return Pix(pixInfo.getDefaultKey(),
            pixInfo.getDefaultName(),
            pixInfo.getDefaultState(),
            pixInfo.getValue(),
            pixInfo.getDescription(),
            true)
    }
}
