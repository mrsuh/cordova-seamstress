var app = {
    initialize: function () {
        this.bindEvents();
        this.loadMain();
        this.math();
    },
    bindEvents: function () {
        this.bindEnterNumber(document.getElementById('pay_base'));
        document.getElementById('btn_add_field').addEventListener('click', this.addSetting);
        document.getElementById('pay_base').addEventListener('input', this.math);
        document.getElementById('hamburger').addEventListener('click', this.changeDisplay);
    },
    bindEnterNumber: function (element) {
        element.onkeypress = function (e) {
            return !(/[А-Яа-яA-Za-z ]/.test(String.fromCharCode(e.charCode)));
        };
    },
    bindDelete: function (element) {
        element.onclick = function (e) {
            var del = confirm('Удалить?');
            if (del) {
                e.target.parentNode.remove();
            }
        }
    },
    loadMain: function () {
        var table = document.querySelector('#main .table-body');
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        var table_block = document.getElementById('table_block');
        var table_block_select = document.getElementById('table_block_select');
        var table_block_checkbox = document.getElementById('table_block_checkbox');

        for (var key in localStorage) {

            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }

            var data = JSON.parse(localStorage[key]);

            var cln = table_block.cloneNode(true);
            cln.querySelector('.name').innerText = data['name'];
            cln.setAttribute('data-value', data['value']);
            cln.setAttribute('data-pay', data['pay']);
            cln.setAttribute('data-number', data['number']);
            cln.removeAttribute('id');

            var number = parseInt(data['number']);
            var input = table_block_checkbox.cloneNode(true);
            var input_id = 'main_input_' + key;
            var label = document.createElement('label');

            if (number === 2) {
                input = table_block_select.cloneNode(true);
                input.onclick = function (e) {
                    app.select(e.target);
                };
            }

            label.innerText = '0';
            input.setAttribute('id', input_id);
            input.onchange = app.math;

            label.setAttribute('for', input_id);
            cln.querySelector('.number').appendChild(input);
            cln.querySelector('.number').appendChild(label);
            cln.querySelector('.price').innerText = '0.00';
            cln.style.display = 'block';
            table.appendChild(cln);
        }
    },
    loadSettings: function () {
        var settings = document.querySelector('#settings .settings-body');
        while (settings.firstChild) {
            settings.removeChild(settings.firstChild);
        }

        var settings_block = document.getElementById('settings_block');
        for (var key in localStorage) {

            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }

            var data = JSON.parse(localStorage[key]);

            var cln = settings_block.cloneNode(true);
            cln.querySelector('.name').value = data['name'];
            cln.querySelector('.value').value = data['value'];
            cln.querySelector('.pay').value = data['pay'];
            cln.querySelector('.number').value = data['number'];
            cln.removeAttribute('id');
            cln.style.display = 'block';
            app.bindDelete(cln.querySelector('.delete'));
            app.bindEnterNumber(cln.querySelector('.value'));
            settings.appendChild(cln);
        }
    },
    saveSettings: function () {
        var blocks = document.querySelectorAll('#settings .settings-body .settings-block');
        localStorage.clear();

        var length = blocks.length;
        for (var i = 0; i < length; i++) {

            var value = parseFloat(blocks[i].querySelector('.value').value);
            var name = blocks[i].querySelector('.name').value;

            if (name.length === 0) {
                continue;
            }

            localStorage.setItem(i.toString(), JSON.stringify({
                name: blocks[i].querySelector('.name').value,
                value: isNaN(value) ? 0 : value,
                pay: parseInt(blocks[i].querySelector('.pay').value),
                number: parseInt(blocks[i].querySelector('.number').value)
            }));
        }
    },
    addSetting: function () {
        var block = document.getElementById('settings_block');
        var cln = block.cloneNode(true);
        cln.style.display = 'block';
        app.bindDelete(cln.querySelector('.delete'));
        app.bindEnterNumber(cln.querySelector('.value'));
        document.querySelector('#settings .settings-body').appendChild(cln);
    },
    select: function (select) {
        var modal_select = document.getElementById('select');
        while (modal_select.firstChild) {
            modal_select.removeChild(modal_select.firstChild);
        }

        modal_select.style.display = 'block';

        modal_select.onclick = function () {
            modal_select.style.display = 'none';
        };

        var options = select.children;
        var length = options.length;
        for (var i = 0; i < length; i++) {

            var div_option = document.createElement('div');
            div_option.setAttribute('class', 'option');
            div_option.innerText = options[i].innerText;

            div_option.onclick = function (element) {
                app.selectOption(select, modal_select, element);
            };

            modal_select.appendChild(div_option);
        }
    },
    selectOption: function(select, modal_select, element) {
        modal_select.style.display = 'none';
        var text = element.target.innerText;
        select.value = text;
        var id = select.getAttribute('id');
        document.querySelector('[for="' + id + '"]').innerText = text;
        app.math();
    },
    math: function () {
        var base = document.getElementById('pay_base');
        var pay_base = 0;

        if (base.value.length) {
            pay_base = parseFloat(base.value);
        }

        var result = pay_base;
        var blocks = document.querySelectorAll('#main .table-body .block');

        var length = blocks.length;

        for (var i = 0; i < length; i++) {

            var pay_type = parseInt(blocks[i].getAttribute('data-pay'));
            var value = parseFloat(blocks[i].getAttribute('data-value'));
            var number_type = parseInt(blocks[i].getAttribute('data-number'));

            var number = null;
            if (number_type === 1) {
                number = blocks[i].querySelector('.number .number').checked ? 1 : 0;
            } else {
                number = parseInt(blocks[i].querySelector('.number .number').value);
            }

            if (0 !== number) {
                blocks[i].className = 'block active'
            } else {
                blocks[i].className = 'block'
            }

            var pay_add = 0;
            if (pay_type === 1) {
                pay_add += pay_base * (value / 100) * number;
            } else {
                pay_add += value * number;
            }

            blocks[i].querySelector('.price').innerText = pay_add.toFixed(2);
            result += pay_add;
        }

        document.getElementById('pay_result').innerText = result.toFixed(2);
    },
    changeDisplay: function () {
        var settings = document.getElementById('settings');
        var hamburger = document.getElementById('hamburger');
        var btn_add_field = document.getElementById('btn_add_field');

        if (settings.className === 'active') {
            hamburger.className = 'hamburger';
            btn_add_field.className = '';
            settings.className = '';
            app.saveSettings();
            app.loadMain();
            app.math();
        } else {
            hamburger.className = 'hamburger open';
            btn_add_field.className = 'show';
            settings.className = 'active';
            app.loadSettings();
        }
    }
};

app.initialize();