import Joi from 'joi';
import logger from '../../utils/logger';
import { CreateAssetRequestBody } from './types';

export const validateCreateAssetBody = (input: CreateAssetRequestBody): { success: boolean; message?: string } => {
    const schema = Joi.object<CreateAssetRequestBody>().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string().required(),
        code: Joi.string().required(),
        value: Joi.number().required(),
    });

    try {
        const result = schema.validate(input);
        return {
            success: result.error === undefined,
            message: result.error?.message,
        };
    } catch (e) {
        logger.error(e);
        return {
            success: false,
            message: (<Error>e).message,
        };
    }
};
