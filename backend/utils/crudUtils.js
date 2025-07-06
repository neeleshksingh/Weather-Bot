const getAll = (Model) => async (req, res) => {
    try {
        const data = await Model.find();
        return res.status(200).json({
            status: 'success',
            data
        });
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
};

const getById = (Model) => async (req, res) => {
    try {
        const data = await Model.findOne({ _id: req.params.id });
        if (data) {
            return res.status(200).json({
                status: 'success',
                data
            });
        } else {
            return res.status(400).json({
                status: 'failed',
                error: 'No record with that id'
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
};

const add = (Model) => async (req, res) => {
    try {
        const payload = req.body;
        const validationErrors = validatePayload(payload, Model.schema.obj);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                status: 'failed',
                message: 'Validation error',
                errors: validationErrors
            });
        }
        const data = await Model.create(payload);
        return res.status(200).json({
            status: 'success',
            message: 'Data added successfully',
            data
        });
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
};

const updateById = (Model) => async (req, res) => {
    try {
        const payload = req.body;
        const validationErrors = validatePayload(payload, Model.schema.obj);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                status: 'failed',
                message: 'Validation error',
                errors: validationErrors
            });
        }
        const data = await Model.findOneAndUpdate({ _id: req.params.id }, payload, { new: true });
        if (data) {
            return res.status(200).json({
                status: 'success',
                message: 'Data updated successfully',
                data
            });
        } else {
            return res.status(404).json({
                status: 'failed',
                message: 'No record found with that id'
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
};

const deleteById = (Model) => async (req, res) => {
    try {
        const data = await Model.findOneAndDelete({ _id: req.params.id });
        if (data) {
            return res.status(200).json({
                status: 'success',
                message: 'Data deleted successfully',
                data
            });
        } else {
            return res.status(404).json({
                status: 'failed',
                message: 'No record found with this id!'
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
};

const validatePayload = (payload, schema) => {
    const errors = [];
    const modelFields = Object.keys(schema);

    for (const field in payload) {
        if (!modelFields.includes(field)) {
            errors.push(`Field '${field}' is not allowed.`);
        }
    }

    return errors;
};

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById
};