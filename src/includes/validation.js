import { 
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';
import { 
  required, min, max, alpha_spaces as alphaSpaces, email,
  min_value as minVal, max_value as maxVal, numeric, confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('numeric', numeric);
    defineRule('passwords_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} should at least be ${ctx.rule.params[0]} characters.`,
          max: `The field ${ctx.field} should be maximum ${ctx.rule.params[0]} characters `,
          alpha_spaces: `The field ${ctx.field} can only contain alphabetical characters and spaces`,
          email: `The field ${ctx.field} should be a valid email`,
          min_value: `The field ${ctx.field} is at least should be ${ctx.rule.params[0]}`,
          max_value: `The field ${ctx.field} maximum value can be ${ctx.rule.params[0]}`,
          excluded: `You are allowed to use this value for the field ${ctx.field}`,
          country_excluded: `Due to restrictions, we are not able to accept users from ${ctx.rule.params[ctx.rule.params.indexOf(ctx.value)]}`,
          passwords_mismatch: 'The passwords don\'t match',
          tos: 'You must accept Terms Of Service',
        };
        const message = messages[ctx.rule.name] 
          ? messages[ctx.rule.name] 
          : `The field ${ctx.field} is not valid`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
