var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.getElementById("_basis").addEventListener('keyup', this.setTotal);
        document.getElementById("_hand_hem").addEventListener('change', this.mathPrice);
        document.getElementById("_lining").addEventListener('change', this.mathPrice);
        document.getElementById("_coquette_slot").addEventListener('change', this.mathPrice);
        document.getElementById("_slot").addEventListener('change', this.mathPrice);
        document.getElementById("_incision").addEventListener('change', this.mathPrice);
        document.getElementById("_pocket").addEventListener('change', this.mathPrice);
        document.getElementById("_shaped_bottom").addEventListener('change', this.mathPrice);
        document.getElementById("_fabric_complexity").addEventListener('change', this.mathPrice);
        document.getElementById("_additional_detail").addEventListener('change', this.mathPrice);
        document.getElementById("_cuffs").addEventListener('change', this.mathPrice);
    },
    setTotal: function () {
        var basis = document.getElementById("_basis");
        var total = document.getElementById("_total");
        var basis_value = basis.value;

        if (!app.checkNumber(basis_value) || 0 == basis_value) {
            basis.parentNode.parentNode.className = "container-fluid value bg-danger";
            total.innerHTML = '0.00';
        } else {
            basis.parentNode.parentNode.className = "container-fluid value";
            total.innerHTML = parseFloat(basis_value).toFixed(2);
        }

        app.mathPrice();
    },
    checkNumber: function (number) {
        regexp = new RegExp("^[0-9]*$");
        return regexp.test(number) && number;
    },
    mathPrice: function () {
        var basis_value = document.getElementById("_basis").value;
        var check_basis_value = app.checkNumber(basis_value);
        if (!check_basis_value) {
            basis_value = 0;
        }
        var total = document.getElementById("_total");
        var totalPrice = parseFloat(basis_value);

        var ids = ['_hand_hem', '_lining', '_coquette_slot', '_slot', '_incision', '_shaped_bottom', '_fabric_complexity', '_cuffs', '_pocket', '_additional_detail'];
        ids.forEach(function (val, key) {
            var p = document.getElementById(val);
            var p_value = document.querySelector('#' + val + ' .value');
            var p_price = document.querySelector('#' + val + ' .price');

            var percent;
            switch (val) {
                case '_additional_detail':
                    percent = 0.05;
                    break;
                case '_pocket':
                    percent = 0.13;
                    break;
                case '_hand_hem':
                    percent = 0.05;
                    break;
                case '_lining':
                    percent = 0.40;
                    break;
                case '_coquette_slot':
                    percent = 0.15;
                    break;
                case '_slot':
                    percent = 0.1;
                    break;
                case '_incision':
                    percent = 0.05;
                    break;
                case '_shaped_bottom':
                    percent = 0.13;
                    break;
                case '_fabric_complexity':
                    percent = 0.1;
                    break;
                case '_cuffs':
                    percent = 0.13;
                    break;
                default:
                    percent = 0;
            }

            var check_value = false;
            var value = 0;
            switch(p_value.nodeName){
                case 'INPUT':
                    check_value = p_value.checked;
                    value = 1;

                    break;
                case 'SELECT':
                    check_value = p_value.value > 0;
                    value = p_value.value;
                    break;
                default:
                    check_value = false;
                    break;
            }

            if (check_value && check_basis_value) {
                p.className = "container-fluid bg-info";

                var tmp = parseFloat(basis_value * percent * value);
                p_price.innerHTML = tmp.toFixed(2);
                totalPrice = totalPrice + tmp;
            } else {
                p_price.innerHTML = '0.00';
                p.className = "container-fluid";
            }
        });

        total.innerHTML = totalPrice.toFixed(2);
    }
};

app.initialize();