function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-run-type-set.html">Edit</a>';

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
        { field: 'runSetID', maxWidth: 200 },
        { field: 'runSet', minWidth: 150 },
        { field: 'activeFlag', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { runSetID: "005", runSet: "Full", activeFlag: "False", Action: "True" },
        { runSetID: "006", runSet: "Full", activeFlag: "True", Action: "True" },
        { runSetID: "007", runSet: "Full", activeFlag: "False", Action: "True" },
        { runSetID: "008", runSet: "Full", activeFlag: "False", Action: "True" },
        { runSetID: "009", runSet: "Full", activeFlag: "True", Action: "True" },
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