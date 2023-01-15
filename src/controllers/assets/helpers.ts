import Joi from 'joi';
import logger from '../../utils/logger';
import { CreateAssetRequestBody, UpdateAssetValueRequestBody, ValidationResponse } from './types';

function validate<SchemaType = unknown>(schema: Joi.ObjectSchema<SchemaType>, input: SchemaType): ValidationResponse {
    try {
        const result = schema.validate(input);
        return {
            success: result.error === undefined,
            errorMessage: result.error?.message,
        };
    } catch (e) {
        logger.error('Validation Error', e);
        return {
            success: false,
            errorMessage: (<Error>e).message,
        };
    }
}

export const validateCreateAssetBody = (input: CreateAssetRequestBody): ValidationResponse => {
    const schema = Joi.object<CreateAssetRequestBody>().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string().required(),
        code: Joi.string().required(),
        value: Joi.number().required(),
    });

    return validate<CreateAssetRequestBody>(schema, input);
};

export const validateUpdateAssetValueBody = (input: UpdateAssetValueRequestBody): ValidationResponse => {
    const schema = Joi.object<UpdateAssetValueRequestBody>().keys({
        code: Joi.string().required(),
        value: Joi.number().required(),
    });

    return validate<UpdateAssetValueRequestBody>(schema, input);
};
