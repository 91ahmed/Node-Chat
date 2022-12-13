class Validator
{
    constructor()
    {
        this.req  = null;
        this.inp  = null;
        this.errors   = {};
        this.messages = {
            'required': 'field is required',
            'email': 'field must contain a valid email address',
            'numeric': 'field must contain only numbers',
            'integer': 'field must contain an integer',
            'decimal': 'field must contain a decimal number',
            'alpha': 'field must only contain alphabetical characters',
            'alphaNumeric': 'field must only contain alpha-numeric characters',
            'regex': 'field must contain a valid value',
        };
        this.dataRegex = {
            'numeric': /^[0-9]+$/,
            'integer': /^\-?[0-9]+$/,
            'decimal': /^\-?[0-9]*\.?[0-9]+$/,
            'email': /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            'alpha': /^[a-z]+$/i,
            'alphaNumeric': /^[a-z0-9]+$/i,        
            'ip': /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
            'url': /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
            'date': /\d{4}-\d{1,2}-\d{1,2}/,
        };
    }

    input (request, input)
    {
        this.req = request;
        this.inp = input;

        return this;
    }

    required ()
    {
        if (this.req == '') {
            this.errors[this.inp] = this.messages.required;
        }

        return this;
    }

    email ()
    {
        if (this.req !== '') {
            if (!this.dataRegex.email.test(this.req)) {
                this.errors[this.inp] = this.messages.email;
            }
        }

        return this;
    }

    numeric ()
    {
        if (this.req !== '') {
            if (!this.dataRegex.numeric.test(this.req)) {
                this.errors[this.inp] = this.messages.numeric;
            }
        }

        return this;
    }

    integer ()
    {
        if (this.req !== '') {
            if (!this.dataRegex.integer.test(this.req)) {
                this.errors[this.inp] = this.messages.integer;
            }
        }

        return this;
    }

    decimal ()
    {
        if (this.req !== '') {
            if (!this.dataRegex.decimal.test(this.req)) {
                this.errors[this.inp] = this.messages.decimal;
            }
        }

        return this;
    }

    alpha ()
    {
        if (this.req !== '') {
            if (!this.dataRegex.alpha.test(this.req)) {
                this.errors[this.inp] = this.messages.alpha;
            }
        }

        return this;
    }

    alphaNumeric ()
    {
        if (this.req !== '') {
            if (!this.dataRegex.alphaNumeric.test(this.req)) {
                this.errors[this.inp] = this.messages.alphaNumeric;
            }
        }

        return this;
    }

    regex (regex)
    {
        if (this.req !== '') {
            if (!regex.test(this.req)) {
                this.errors[this.inp] = this.messages.regex;
            }
        }

        return this;
    }
    
    getErrors ()
    {
        return this.errors;
    }

    isValid ()
    {
        var obj = this.errors;

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    }

}

module.exports = Validator;

/**
	var valid = new Validator();
	valid.input(req.body.username, 'username').alpha().required();
	valid.input(req.body.email, 'email').email().required();

	if (valid.isValid()) {
		res.send('success');
	} else {
		res.status(500);
		res.send(valid.getErrors());
	}
 */