//Inspired by https://github.com/brianvoe/slim-select
(function(window) {
    "use strict";
    var Select = function(info) {
        var self = this;
        this.validate(info);
        var selectElement = typeof info.select === "string" ?
            document.querySelector(info.select) :
            info.select;
        this.config = this._getConfig({
            select: selectElement,
            showSearch: info.showSearch,
            searchText: info.searchText,
            placeholderText: info.placeholder,
            isEnabled: info.isEnabled
        });
        this.helper = this._helper;
        this.select = this._getSelect({
            select: selectElement,
            main: this
        });
        this.data = this._getData({
            main: this
        });
        this.mSelect = this._create({
            main: this
        });
        this.select.element.parentNode.insertBefore(
            this.mSelect.container,
            this.select.element.nextSibling
        );
        this.render();

        document.addEventListener("click", function(e) {
            if (!self.helper.hasClassInTree(e.target, self.config.id)) {
                self.close();
            }
        });

        if (info.beforeOnChange) {
            this.beforeOnChange = info.beforeOnChange;
        }

        if (info.onChange) {
            this.onChange = info.onChange;
        }
        // return {
        //     open: this.open,
        //     close: this.close,
        //     destroy: this.destroy,
        //     enable: this.enable,
        //     disable: this.disable,
        //     search: this.search,
        //     set: this.set,
        //     setData: this.setData,
        // };
    };
    Select.prototype._getConfig = function(info) {
        var config = {
            id: "",
            isMultiple: false,
            showSearch: true,
            searchText: "No Results",
            placeholderText: "Select Value",
            isEnabled: true,
            main: "select__main",
            singleSelected: "select__single--selected",
            arrow: "select__arrow",
            multiSelected: "select__multi--selected",
            add: "select__add",
            plus: "select__plus",
            values: "select__values",
            value: "select__value",
            valueText: "select__value--text",
            valueDelete: "select__value--delete",
            content: "select__content",
            open: "select__open",
            search: "select__search",
            list: "select__list",
            optgroup: "select__optgroup",
            optgroupLabel: "select__optgroup--label",
            option: "select__option",
            highlighted: "select__highlighted",
            disabled: "select__disabled",
            hide: "select__hide",
            id: "select__" + Math.floor(Math.random() * 100000),
            style: info.select.style.cssText,
            class: info.select.classList,
            isMultiple: info.select.multiple,
            showSearch: info.showSearch === false ? false : true,
            isEnabled: info.isEnabled === false ? false : true
        };
        if (info.searchText) {
            config.searchText = info.searchText;
        }
        if (info.placeholderText) {
            config.placeholderText = info.placeholderText;
        }
        return config;
    };
    Select.prototype._getSelect = function(info) {
        var select = {
            element: info.select,
            main: info.main,
            setValue: function() {
                if (!this.main.data.getSelected()) {
                    return;
                }
                if (this.main.config.isMultiple) {
                    var selected = this.main.data.getSelected();
                    var options = this.element.options;
                    for (var o = 0; o < options.length; o++) {
                        var option = options[o];
                        option.selected = false;
                        for (var s = 0; s < selected.length; s++) {
                            if (selected[s].value === option.value) {
                                option.selected = true;
                            }
                        }
                    }
                } else {
                    var selected = this.main.data.getSelected();
                    this.element.value = selected ? selected.value : "";
                }
            },
            addAttributes: function() {
                this.element.tabIndex = -1;
                this.element.style.display = "none";
            },
            addEventListeners: function() {
                var self = this;
                this.element.addEventListener("change", function(e) {
                    self.main.data.setSelectedFromSelect();
                    self.main.render();
                });
            },
            addMutationObserver: function() {
                var self = this;
                this.mutationObserver = new MutationObserver(function(mutations) {
                    self.main.data.parseSelectData();
                    self.main.data.setSelectedFromSelect();
                    self.main.render();
                });
                this.observeMutationObserver();
            },
            observeMutationObserver: function() {
                this.mutationObserver.observe(this.element, {
                    attributes: true,
                    childList: true,
                    characterData: true
                });
            },
            disconnectMutationObserver: function() {
                this.mutationObserver.disconnect();
            },
            create: function(data) {
                this.element.innerHTML = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].hasOwnProperty("options")) {
                        var optgroupObject = data[i];
                        var optgroup = document.createElement("optgroup");
                        optgroup.label = optgroupObject.label;
                        for (var o = 0; o < optgroupObject.options.length; o++) {
                            optgroup.appendChild(
                                this.createOption(optgroupObject.options[o])
                            );
                        }
                        this.element.appendChild(optgroup);
                    } else {
                        this.element.appendChild(this.createOption(data[i]));
                    }
                }
            },
            createOption: function(info) {
                if (info.placeholder && info.placeholder !== "") {
                    return null;
                }
                var option = document.createElement("option");
                option.value = info.value || info.text;
                option.innerHTML = info.innerHTML || info.text;
                if (info.selected) {
                    option.selected = info.selected;
                }
                if (info.disabled) {
                    option.disabled = true;
                }
                if (info.data && typeof info.data === "object") {
                    Object.keys(info.data).forEach(function(key) {
                        option.setAttribute("data-" + key, info.data[key]);
                    });
                }
                return option;
            }
        };
        if (select.element.disabled) {
            select.main.config.isEnabled = false;
        }
        select.addAttributes();
        select.addEventListeners();
        select.addMutationObserver();
        return select;
    };
    Select.prototype._getData = function(info) {
        var self = this;
        var data = {
            contentOpen: false,
            main: info.main,
            searchValue: "",
            data: [],
            filtered: null,
            parseSelectData: function() {
                this.data = [];
                var element = this.main.select.element;
                var nodes = element.childNodes;
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].nodeName === "OPTGROUP") {
                        var node = nodes[i];
                        var optgroup = {
                            label: node.label,
                            options: []
                        };
                        var options = nodes[i].childNodes;
                        for (var ii = 0; ii < options.length; ii++) {
                            if (options[ii].nodeName === "OPTION") {
                                optgroup.options.push(this.pullOptionData(options[ii]));
                            }
                        }
                        this.data.push(optgroup);
                    } else if (nodes[i].nodeName === "OPTION") {
                        this.data.push(this.pullOptionData(nodes[i]));
                    }
                }
            },
            setSelectedFromSelect: function() {
                var options = this.main.select.element.options;
                if (this.main.config.isMultiple) {
                    var newSelected = [];
                    for (var i = 0; i < options.length; i++) {
                        var option = options[i];
                        if (option.selected) {
                            newSelected.push(
                                this.getObjectFromData(option.value, "value").id
                            );
                        }
                    }
                    this.setSelected(newSelected, "id");
                } else {
                    if (options.selectedIndex !== -1) {
                        var option = options[options.selectedIndex];
                        var value = option.value;
                        this.setSelected(value, "value");
                    }
                }
            },
            pullOptionData: function(option) {
                return {
                    id: (option.dataset ? option.dataset.id : false) ||
                        String(Math.floor(Math.random() * 100000000)),
                    value: option.value,
                    text: option.text,
                    innerHTML: option.innerHTML,
                    selected: option.selected,
                    disabled: option.disabled,
                    placeholder: option.dataset.placeholder || null,
                    data: option.dataset
                };
            },
            setSelected: function(value, type) {
                if (type === void 0) {
                    type = "id";
                }
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].hasOwnProperty("label")) {
                        if (this.data[i].hasOwnProperty("options")) {
                            var options = this.data[i].options;
                            for (var o = 0; o < options.length; o++) {
                                options[o].selected = this.shouldBeSelected(
                                    options[o],
                                    value,
                                    type
                                );
                            }
                        }
                    } else {
                        this.data[i].selected = this.shouldBeSelected(
                            this.data[i],
                            value,
                            type
                        );
                    }
                }
                this.onDataChange();
            },
            shouldBeSelected: function(option, value, type) {
                if (type === void 0) {
                    type = "id";
                }
                if (Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        if (String(option[type]) === String(value[i])) {
                            return true;
                        }
                    }
                } else {
                    if (String(option[type]) === String(value)) {
                        return true;
                    }
                }
                return false;
            },
            getSelected: function() {
                var value = null;
                var values = [];
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].hasOwnProperty("label")) {
                        if (this.data[i].hasOwnProperty("options")) {
                            var options = this.data[i].options;
                            for (var o = 0; o < options.length; o++) {
                                if (options[o].selected) {
                                    if (!this.main.config.isMultiple) {
                                        value = options[o];
                                    }
                                    values.push(options[o]);
                                }
                            }
                        }
                    } else {
                        if (this.data[i].selected) {
                            if (!this.main.config.isMultiple) {
                                value = this.data[i];
                            }
                            values.push(this.data[i]);
                        }
                    }
                }
                return this.main.config.isMultiple ? values : value;
            },
            addToSelected: function(value, type) {
                if (type === void 0) {
                    type = "id";
                }
                if (this.main.config.isMultiple) {
                    var values = [];
                    var selected = this.getSelected();
                    for (var i = 0; i < selected.length; i++) {
                        values.push(selected[i][type]);
                    }
                    values.push(value);
                    this.setSelected(values, type);
                }
            },
            removeFromSelected: function() {
                if (type === void 0) {
                    type = "id";
                }
                if (this.main.config.isMultiple) {
                    var values = [];
                    var selected = this.getSelected();
                    for (var i = 0; i < selected.length; i++) {
                        if (String(selected[i][type]) !== String(value)) {
                            values.push(selected[i][type]);
                        }
                    }
                    this.setSelected(values, type);
                }
            },
            onDataChange: function() {
                if (this.main.onChange) {
                    this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())));
                }
            },
            getObjectFromData: function(value, type) {
                if (type === void 0) {
                    type = "id";
                }
                for (var i = 0; i < this.data.length; i++) {
                    if (
                        type in this.data[i] &&
                        String(this.data[i][type]) === String(value)
                    ) {
                        return this.data[i];
                    }
                    if (this.data[i].hasOwnProperty("options")) {
                        var optgroupObject = this.data[i];
                        for (var ii = 0; ii < optgroupObject.options.length; ii++) {
                            if (String(optgroupObject.options[ii][type]) === String(value)) {
                                return optgroupObject.options[ii];
                            }
                        }
                    }
                }
                return null;
            },
            search: function(search) {
                this.searchValue = search;
                if (search.trim() === "") {
                    this.filtered = null;
                    return;
                }
                var valuesArray = this.data.slice(0);
                search = search.trim().toLowerCase();
                var filtered = valuesArray.map(function(obj) {
                    if (obj.hasOwnProperty("options")) {
                        var optgroupObj = obj;
                        var options = optgroupObj.options.filter(function(opt) {
                            return opt.text.toLowerCase().indexOf(search) !== -1;
                        });
                        if (options.length !== 0) {
                            var optgroup = Object.assign({}, optgroupObj);
                            optgroup.options = options;
                            return optgroup;
                        }
                    }
                    if (obj.hasOwnProperty("text")) {
                        var optionObj = obj;
                        if (optionObj.text.toLowerCase().indexOf(search) !== -1) {
                            return obj;
                        }
                    }
                    return null;
                });
                this.filtered = filtered.filter(function(info) {
                    return info;
                });
            },
            validateData: function(data) {
                if (!data) {
                    throw new Error("Data must be an array of objects");
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i].hasOwnProperty("label")) {
                        if (data[i].hasOwnProperty("options")) {
                            var optgroup = data[i];
                            var options = optgroup.options;
                            for (var i = 0; i < options.length; i++) {
                                validateOption(options[i]);
                            }
                        }
                    } else {
                        var option = data[i];
                        this.validateOption(option);
                    }
                }
            },
            validateOption: function(option) {
                if (!option.text) {
                    throw new Error("Data object option must have at least a text");
                }
            }
        };
        data.parseSelectData();
        data.setSelectedFromSelect();
        return data;
    };
    Select.prototype._create = function(info) {
        var self = this;
        var create = {
            main: info.main,
            containerDiv: function() {
                var container = document.createElement("div");
                container.classList.add(this.main.config.id);
                container.classList.add(this.main.config.main);
                container.style.cssText = this.main.config.style;
                for (var i = 0; i < this.main.config["class"].length; i++) {
                    container.classList.add(this.main.config["class"][i]);
                }
                return container;
            },
            singleSelectedDiv: function() {
                var self = this;
                var container = document.createElement("div");
                container.classList.add(this.main.config.singleSelected);
                var placeholder = document.createElement("span");
                placeholder.classList.add("placeholder");
                container.appendChild(placeholder);
                var arrowContainer = document.createElement("span");
                arrowContainer.classList.add(this.main.config.arrow);
                var arrowIcon = document.createElement("span");
                arrowIcon.classList.add("arrow-down");
                arrowContainer.appendChild(arrowIcon);
                container.appendChild(arrowContainer);
                container.onclick = function() {
                    if (!self.main.config.isEnabled) {
                        return;
                    }
                    self.main.data.contentOpen ? self.main.close() : self.main.open();
                };
                return {
                    container: container,
                    placeholder: placeholder,
                    arrowIcon: {
                        container: arrowContainer,
                        arrow: arrowIcon
                    }
                };
            },
            placeholder: function() {
                var selected = this.main.data.getSelected();
                if (selected && selected.placeholder) {
                    var placeholder = document.createElement("span");
                    placeholder.classList.add(this.main.config.disabled);
                    placeholder.innerHTML = this.main.config.placeholderText;
                    this.singleSelected.placeholder.innerHTML = placeholder.outerHTML;
                } else {
                    this.singleSelected.placeholder.innerHTML = selected ?
                        selected.innerHTML || selected.text :
                        "";
                }
            },
            multiSelectedDiv: function() {
                var self = this;
                var container = document.createElement("div");
                container.classList.add(this.main.config.multiSelected);
                var values = document.createElement("div");
                values.classList.add(this.main.config.values);
                container.appendChild(values);
                var add = document.createElement("div");
                add.classList.add(this.main.config.add);
                var plus = document.createElement("span");
                plus.classList.add(this.main.config.plus);
                plus.onclick = function(e) {
                    if (self.main.data.contentOpen) {
                        self.main.close();
                        e.stopPropagation();
                    }
                };
                add.appendChild(plus);
                container.appendChild(add);
                container.onclick = function(e) {
                    if (!self.main.config.isEnabled) {
                        return;
                    }
                    var target = e.target;
                    if (!target.classList.contains(self.main.config.valueDelete)) {
                        self.main.open();
                    }
                };
                return {
                    container: container,
                    values: values,
                    add: add,
                    plus: plus
                };
            },
            values: function() {
                if (this.main.config.isMultiple) {
                    var currentNodes = this.multiSelected.values.childNodes;
                    var selected = this.main.data.getSelected();
                    var exists = void 0;
                    for (var s = 0; s < selected.length; s++) {
                        exists = false;
                        for (var c = 0; c < currentNodes.length; c++) {
                            var node = currentNodes[c];
                            if (selected[s].id === node.dataset.id) {
                                exists = true;
                            }
                        }
                        if (!exists) {
                            this.multiSelected.values.appendChild(this.valueDiv(selected[s]));
                        }
                    }
                    for (var c = 0; c < currentNodes.length; c++) {
                        exists = true;
                        var node = currentNodes[c];
                        for (var s = 0; s < selected.length; s++) {
                            if (String(selected[s].id) === String(node.dataset.id)) {
                                exists = false;
                            }
                        }
                        if (exists) {
                            var node = currentNodes[c];
                            node.classList.add("select__out");
                            this.multiSelected.values.removeChild(node);
                        }
                    }
                    if (selected.length === 0) {
                        var placeholder = document.createElement("span");
                        placeholder.classList.add(this.main.config.disabled);
                        placeholder.innerHTML = this.main.config.placeholderText;
                        this.multiSelected.values.innerHTML = placeholder.outerHTML;
                    }
                }
            },
            valueDiv: function(option) {
                var self = this;
                var value = document.createElement("div");
                value.classList.add(this.main.config.value);
                value.dataset.id = option.id;
                var text = document.createElement("span");
                text.classList.add(this.main.config.valueText);
                text.innerHTML = option.text;
                value.appendChild(text);
                var deleteSpan = document.createElement("span");
                deleteSpan.classList.add(this.main.config.valueDelete);
                deleteSpan.innerHTML = "x";
                deleteSpan.onclick = function(e) {
                    if (!self.main.config.isEnabled) {
                        return;
                    }
                    self.main.data.removeFromSelected(option.id, "id");
                    self.main.render();
                    self.main.select.setValue();
                    e.preventDefault();
                };
                value.appendChild(deleteSpan);
                return value;
            },
            contentDiv: function() {
                var container = document.createElement("div");
                container.classList.add(this.main.config.content);
                return container;
            },
            searchDiv: function() {
                var self = this;
                var container = document.createElement("div");
                container.classList.add(this.main.config.search);
                if (!this.main.config.showSearch) {
                    container.style.display = "none";
                }
                var input = document.createElement("input");
                input.type = "search";
                input.placeholder = "Search";
                input.tabIndex = 0;
                input.onclick = function(e) {
                    setTimeout(function() {
                        var target = e.target;
                        if (target.value === "") {
                            self.main.search("");
                        }
                    }, 10);
                };
                input.onkeydown = function(e) {
                    if (e.key === "ArrowUp") {
                        self.highlightUp();
                        e.preventDefault();
                    } else if (e.key === "ArrowDown") {
                        self.highlightDown();
                        e.preventDefault();
                    } else if (e.key === "Tab") {
                        self.main.close();
                    }
                };
                input.onkeyup = function(e) {
                    var target = e.target;
                    if (e.key === "Enter") {
                        var highlighted = self.list.querySelector(
                            "." + self.main.config.highlighted
                        );
                        if (highlighted) {
                            highlighted.click();
                        }
                    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {} else if (e.key === "Escape") {
                        self.main.close();
                    } else {
                        self.main.search(target.value);
                    }
                    e.preventDefault();
                };
                input.onfocus = function() {
                    self.main.open();
                };
                container.appendChild(input);
                return {
                    container: container,
                    input: input
                };
            },
            highlightUp: function() {
                var highlighted = this.list.querySelector(
                    "." + this.main.config.highlighted
                );
                var prev = null;
                if (highlighted) {
                    prev = highlighted.previousSibling;
                } else {
                    var allOptions = this.list.querySelectorAll(
                        "." +
                        this.main.config.option +
                        ":not(." +
                        this.main.config.disabled +
                        ")"
                    );
                    prev = allOptions[allOptions.length - 1];
                }
                if (prev && prev.classList.contains(this.main.config.optgroupLabel)) {
                    prev = null;
                }
                if (prev === null) {
                    var parent = highlighted.parentNode;
                    if (parent.classList.contains(this.main.config.optgroup)) {
                        if (parent.previousSibling) {
                            prev =
                                parent.previousSibling.childNodes[
                                    parent.previousSibling.childNodes.length - 1
                                ];
                        }
                    }
                }
                if (prev) {
                    if (highlighted) {
                        highlighted.classList.remove(this.main.config.highlighted);
                    }
                    prev.classList.add(this.main.config.highlighted);
                    this.helper.ensureElementInView(this.list, prev);
                }
            },
            highlightDown: function() {
                var highlighted = this.list.querySelector(
                    "." + this.main.config.highlighted
                );
                var next = highlighted ?
                    highlighted.nextSibling :
                    this.list.querySelector(
                        "." +
                        this.main.config.option +
                        ":not(." +
                        this.main.config.disabled +
                        ")"
                    );
                if (next === null) {
                    var parent = highlighted.parentNode;
                    if (parent.classList.contains(this.main.config.optgroup)) {
                        if (parent.nextSibling) {
                            var sibling = parent.nextSibling;
                            next = sibling.querySelector(
                                "." +
                                this.main.config.option +
                                ":not(." +
                                this.main.config.disabled +
                                ")"
                            );
                        }
                    }
                }
                if (next) {
                    if (highlighted) {
                        highlighted.classList.remove(this.main.config.highlighted);
                    }
                    next.classList.add(this.main.config.highlighted);
                    this.helper.ensureElementInView(this.list, next);
                }
            },
            listDiv: function() {
                var list = document.createElement("div");
                list.classList.add(this.main.config.list);
                list.onmousewheel = function(e) {
                    var scrollTop = list.scrollTop,
                        scrollHeight = list.scrollHeight,
                        height = list.offsetHeight,
                        delta = e.type == "DOMMouseScroll" ? e.detail * -40 : e.wheelDelta,
                        up = delta > 0;
                    var prevent = function() {
                        e.stopPropagation();
                        e.preventDefault();
                        e.returnValue = false;
                        return false;
                    };
                    if (!up && -delta > scrollHeight - height - scrollTop) {
                        list.scrollTop = scrollHeight;
                        return prevent();
                    } else if (up && delta > scrollTop) {
                        list.scrollTop = 0;
                        return prevent();
                    }
                };
                return list;
            },
            options: function() {
                var data = this.main.data.filtered || this.main.data.data;
                this.list.innerHTML = "";
                if (data.length === 0) {
                    var noResults = document.createElement("div");
                    noResults.classList.add(this.main.config.option);
                    noResults.classList.add(this.main.config.disabled);
                    noResults.innerHTML = this.main.config.searchText;
                    this.list.appendChild(noResults);
                    return;
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i].hasOwnProperty("label")) {
                        var item = data[i];
                        var optgroup = document.createElement("div");
                        optgroup.classList.add(this.main.config.optgroup);
                        var optgroupLabel = document.createElement("div");
                        optgroupLabel.classList.add(this.main.config.optgroupLabel);
                        optgroupLabel.innerHTML = item.label;
                        optgroup.appendChild(optgroupLabel);
                        var options = item.options;
                        for (var ii = 0; ii < options.length; ii++) {
                            optgroup.appendChild(this.option(options[ii]));
                        }
                        this.list.appendChild(optgroup);
                    } else {
                        this.list.appendChild(this.option(data[i]));
                    }
                }
            },
            option: function(data) {
                var _self = this;
                if (data.placeholder) {
                    var placeholder = document.createElement("div");
                    placeholder.classList.add(this.main.config.option);
                    placeholder.classList.add(this.main.config.hide);
                    return placeholder;
                }
                var option = document.createElement("div");
                option.classList.add(this.main.config.option);
                var selected = this.main.data.getSelected();
                option.dataset.id = data.id;
                option.innerHTML = data.innerHTML;
                option.onclick = function(e) {
                    if (_self.main.beforeOnChange) {
                        var value = void 0;
                        var objectInfo = JSON.parse(
                            JSON.stringify(
                                _self.main.data.getObjectFromData(e.target.dataset.id)
                            )
                        );
                        objectInfo.selected = true;
                        if (_self.main.config.isMultiple) {
                            value = JSON.parse(JSON.stringify(selected));
                            value.push(objectInfo);
                        } else {
                            value = JSON.parse(JSON.stringify(objectInfo));
                        }
                        var beforeOnchange = _self.main.beforeOnChange(value);
                        if (beforeOnchange !== false) {
                            _self.main.set(e.target.dataset.id, "id");
                        }
                    } else {
                        _self.main.set(e.target.dataset.id, "id");
                    }
                };
                if (
                    data.disabled ||
                    (selected &&
                        self.helper.isValueInArrayOfObjects(selected, "id", data.id))
                ) {
                    option.onclick = null;
                    option.classList.add(this.main.config.disabled);
                }
                return option;
            }
        };
        create.container = create.containerDiv();
        create.content = create.contentDiv();
        create.search = create.searchDiv();
        create.list = create.listDiv();
        create.options();
        if (create.main.config.isMultiple) {
            create.multiSelected = create.multiSelectedDiv();
            create.container.appendChild(create.multiSelected.container);
            create.container.appendChild(create.content);
            create.content.appendChild(create.search.container);
            create.content.appendChild(create.list);
        } else {
            create.singleSelected = create.singleSelectedDiv();
            create.container.appendChild(create.singleSelected.container);
            create.container.appendChild(create.content);
            create.content.appendChild(create.search.container);
            create.content.appendChild(create.list);
        }
        return create;
    };
    Select.prototype.set = function(value, type, close) {
        if (type === void 0) {
            type = "value";
        }
        if (close === void 0) {
            close = true;
        }
        if (this.config.isMultiple && !Array.isArray(value)) {
            this.data.addToSelected(value, type);
        } else {
            this.data.setSelected(value, type);
        }
        this.render();
        this.select.setValue();
        if (close) {
            this.close();
        }
    };
    Select.prototype.setData = function(data) {
        this.data.validateData(data);
        var newData = JSON.parse(JSON.stringify(data));
        this.select.create(newData);
        this.data.parseSelectData();
        this.data.setSelectedFromSelect();
        this.render();
    };
    Select.prototype.open = function() {
        this.mSelect.search.input.focus();
        if (this.data.contentOpen) {
            return;
        }
        this.data.contentOpen = true;
        if (this.config.isMultiple) {
            this.mSelect.multiSelected.container.classList.add(this.config.open);
            this.mSelect.multiSelected.plus.classList.add("select__cross");
        } else {
            this.mSelect.singleSelected.container.classList.add(this.config.open);
            this.mSelect.singleSelected.arrowIcon.arrow.classList.remove(
                "arrow-down"
            );
            this.mSelect.singleSelected.arrowIcon.arrow.classList.add("arrow-up");
        }
        this.mSelect.content.classList.add(this.config.open);
    };
    Select.prototype.close = function() {
        if (!this.data.contentOpen) {
            return;
        }
        this.data.contentOpen = false;
        this.mSelect.search.input.blur();
        if (this.config.isMultiple) {
            this.mSelect.multiSelected.container.classList.remove(this.config.open);
            this.mSelect.multiSelected.plus.classList.remove("select__cross");
        } else {
            this.mSelect.singleSelected.container.classList.remove(this.config.open);
            this.mSelect.singleSelected.arrowIcon.arrow.classList.add("arrow-down");
            this.mSelect.singleSelected.arrowIcon.arrow.classList.remove("arrow-up");
        }
        this.mSelect.content.classList.remove(this.config.open);
        this.search("");
    };
    Select.prototype.enable = function() {
        this.config.isEnabled = true;
        if (this.config.isMultiple) {
            this.mSelect.multiSelected.container.classList.remove(
                this.config.disabled
            );
        } else {
            this.mSelect.singleSelected.container.classList.remove(
                this.config.disabled
            );
        }
        this.select.disconnectMutationObserver();
        this.select.element.disabled = false;
        this.select.observeMutationObserver();
    };
    Select.prototype.disable = function() {
        this.config.isEnabled = false;
        if (this.config.isMultiple) {
            this.mSelect.multiSelected.container.classList.add(this.config.disabled);
        } else {
            this.mSelect.singleSelected.container.classList.add(this.config.disabled);
        }
        this.select.disconnectMutationObserver();
        this.select.element.disabled = true;
        this.select.observeMutationObserver();
    };
    Select.prototype.search = function(value) {
        if (this.data.searchValue !== value) {
            this.mSelect.search.input.value = value;
            this.data.search(value);
            this.render();
        }
    };
    Select.prototype.render = function() {
        if (this.config.isMultiple) {
            this.mSelect.values();
        } else {
            this.mSelect.placeholder();
        }
        this.mSelect.options();
    };
    Select.prototype.destroy = function() {
        this.select.element.style.display = "inline-block";
        this.mSelect.container.parentElement.removeChild(this.mSelect.container);
    };
    Select.prototype.validate = function(info) {
        var select = typeof info.select === "string" ?
            document.querySelector(info.select) :
            info.select;
        if (!select) {
            throw new Error("Could not find select element");
        }
        if (select.tagName !== "SELECT") {
            throw new Error("Element isnt of type select");
        }
    };
    Select.prototype._helper = {
        hasClassInTree: function(element, className) {
            function hasClass(element, className) {
                if (!(!className ||
                        !element ||
                        !element.classList ||
                        !element.classList.contains(className))) {
                    return element;
                }
                return null;
            }

            function parentByClass(childElement, className) {
                if (!childElement || childElement === document) {
                    return null;
                } else if (hasClass(childElement, className)) {
                    return childElement;
                } else {
                    return parentByClass(childElement.parentNode, className);
                }
            }
            return hasClass(element, className) || parentByClass(element, className);
        },
        ensureElementInView: function(container, element) {
            var cTop = container.scrollTop + container.offsetTop;
            var cBottom = cTop + container.clientHeight;
            var eTop = element.offsetTop;
            var eBottom = eTop + element.clientHeight;
            if (eTop < cTop) {
                container.scrollTop -= cTop - eTop;
            } else if (eBottom > cBottom) {
                container.scrollTop += eBottom - cBottom;
            }
        },
        isValueInArrayOfObjects: function(selected, key, value) {
            if (!Array.isArray(selected)) {
                return selected[key] === value;
            }
            for (var i = 0; i < selected.length; i++) {
                if (selected[i] && selected[i][key] && selected[i][key] === value) {
                    return true;
                }
            }
            return false;
        }
    };
    window.Select = Select;
})(window);

var mSelect = new Select({
    select: "#select--month",
});