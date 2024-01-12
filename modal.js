function Modal(options) {
    var self = this;

    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.innerHTML = options.content;
    document.body.appendChild(this.modal);

    this.open = function () {
        self.modal.style.display = 'block';
    };

    this.close = function () {
        self.modal.style.display = 'none';
    };

    this.modal.addEventListener('click', function (e) {
        if (e.target === self.modal) {
            self.close();
        }
    });

    if (options.width) {
        this.modal.style.width = options.width;
    }

    return this;
}


function ModalPink(options) {
    var self = this;

    this.modal = document.createElement('div');
    this.modal.className = 'modal-pink';
    this.modal.innerHTML = options.content;
    document.body.appendChild(this.modal);

    this.open = function () {
        self.modal.style.display = 'block';
    };

    this.close = function () {
        self.modal.style.display = 'none';
    };

    this.modal.addEventListener('click', function (e) {
        if (e.target === self.modal) {
            self.close();
        }
    });

    if (options.width) {
        this.modal.style.width = options.width;
    }

    return this;
}
