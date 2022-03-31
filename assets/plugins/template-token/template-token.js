function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = `<a class="btn btn-primary text-white border-0 mb-1" href="add-new-template-token.html">Edit</a>`;

    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}

BtnCellRenderer.prototype.getGui = function() {
    return this.eGui;
}

BtnCellRenderer.prototype.destroy = function() {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}

BtnCellRenderer.prototype.btnClickedHandler = function(event) {
    this.params.clicked(this.params.value);
}

var gridOptions = {
    columnDefs: [
        { field: 'TemplateTokenID', maxWidth: 200 },
        { field: 'TemplateValue', maxWidth: 200 },
        { field: 'TemplateDesc', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 420,
        }
    ],
    rowData: [
        { TemplateTokenID: "1339", TemplateValue: "1339", TemplateDesc: "Testing E-Link Code- LDTI", Action: "True" },
        { TemplateTokenID: "101", TemplateValue: "1339", TemplateDesc: "Leon Test Runbook - 101", Action: "True" },
        { TemplateTokenID: "102", TemplateValue: "1339", TemplateDesc: "Testing E-Link Code- LDTI", Action: "True" },
        { TemplateTokenID: "103", TemplateValue: "1339", TemplateDesc: "Leon Test Runbook - 101", Action: "True" },
        { TemplateTokenID: "009", TemplateValue: "1339", TemplateDesc: "Testing E-Link Code- LDTI", Action: "True" },
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 100,
    },
    components: {
        btnCellRenderer: BtnCellRenderer,
    },
};

var gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);