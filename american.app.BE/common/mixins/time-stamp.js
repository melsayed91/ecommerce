module.exports = function (Model, options) {
    Model.defineProperty("createdAt", {
        type: Date,
        required: true,
        defaultFn: 'now',
    });

    Model.defineProperty("updatedAt", {
        type: Date,
        required: true,
    });

    Model.observe('before save', (ctx, next) => {
        if (ctx.instance) {
            ctx.instance["updatedAt"] = new Date();
        } else {
            ctx.data["updatedAt"] = new Date();
        }
        return next();
    });
};
