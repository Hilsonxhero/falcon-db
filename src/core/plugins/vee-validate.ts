

import { App } from "vue";
import { defineRule, configure } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { localize, setLocale, loadLocaleFromURL } from '@vee-validate/i18n';


/**
 * Initialize Inline-Svg component
 * @param app vue instance
 */
export function initVeeValidate(app: App<Element>) {

    // Define the rule globally
    defineRule('required', required);

    // Load locale from URL
    // loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/ar.json');


    configure({
        // validateOnBlur: false,
        // validateOnChange: false,
        // validateOnInput: false,
        // validateOnModelUpdate: false,
        generateMessage: localize('ar', {
            names: {
                name: 'الاسم',
                age: 'السن',
                ageConfirm: 'تأكيد السن'
            },
            messages: {
                required: "{field} الزامی می باشد",
            },
        })
    });

    setLocale("ar")

}

