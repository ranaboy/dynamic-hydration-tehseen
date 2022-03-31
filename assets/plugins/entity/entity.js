function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-entity.html">Edit</a>';

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
        { field: 'EntityID', maxWidth: 200 },
        { field: 'EntityCD', minWidth: 150 },
        { field: 'EntityDesc', minWidth: 150 },
        { field: 'ActiveFlag', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { EntityID: "005", EntityCD: "Actuarial Assumption", EntityDesc: "Actuarial Assumption", ActiveFlag: "1", Action: "True" },
        { EntityID: "006", EntityCD: "Actuarial Assumption two", EntityDesc: "Actuarial Assumption 2", ActiveFlag: "0", Action: "True" },
        { EntityID: "007", EntityCD: "Actuarial Assumption three", EntityDesc: "Actuarial Assumption 1", ActiveFlag: "1", Action: "True" },
        { EntityID: "008", EntityCD: "Actuarial Assumption four", EntityDesc: "Actuarial Assumption 21", ActiveFlag: "0", Action: "True" },
        { EntityID: "009", EntityCD: "Actuarial Assumption five", EntityDesc: "Actuarial Assumption 0", ActiveFlag: "1", Action: "True" },
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