const UserLayout = require("../models/user-layout");

class LayoutService {
    async getLayout(id) {
        const userLayout = await UserLayout.findById(id);
        return userLayout;
    }
    
    async updateLayout(id, settings) {
        const userLayout = await UserLayout.findById(id);
        userLayout.settings = settings;
        userLayout.save();
        return userLayout;
    }
}

module.exports = new LayoutService();