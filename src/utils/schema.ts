import Joi from 'joi';

type Error = {
  type?: string | string[] | undefined;
  message?: string | string[] | undefined;
};
export const confessionSchema = Joi.object().keys({
  id: Joi.string(),

  content: Joi.string()
    .min(20)
    .max(1000)
    .required()
    .error((errors): any => {
      errors.forEach((error: Error) => {
        switch (error.type) {
          case 'string.min':
            error.message = 'Content is too short';
            break;
          case 'any.empty':
            error.message = 'Content cannot be empty';
            break;
          case 'string.max':
            error.message = 'Content is too long';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  numberOfLikes: Joi.number().integer().required(),
  numberOfDislikes: Joi.number().integer().required(),
  feelings: Joi.object(),
  favorites: Joi.object(),
  tags: Joi.array()
    .required()
    .error((error: any) => (error.message = 'Tags cannot be empty')),
  shareAs: Joi.string().required(),
  timestamp: Joi.object().required(),
  user: {
    uid: Joi.string().required(),
    username: Joi.string().required(),
    photoURL: Joi.string().required(),
    gender: Joi.string().required(),
  },
});
