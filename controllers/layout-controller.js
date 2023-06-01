const LayoutService = require('../service/layout-service');

class LayoutController {

    async getSingleLayout(req, res, next) {
        try {
            const { id } = req.params;
            const userLayout = await LayoutService.getLayout(id);
            return res.json(userLayout);
        } catch (e) {
            next(e);
        }
    }

    async updateLayout(req, res, next) {
        try {
            const { id, settings } = req.body;
            const userLayout = await LayoutService.updateLayout(id, settings);
            return res.json(userLayout);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new LayoutController();