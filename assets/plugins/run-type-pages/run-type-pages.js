function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-run-type-pages.html">Edit</a>';

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
        { field: 'runTypeID', maxWidth: 200 },
        { field: 'runType', minWidth: 150 },
        { field: 'runTypeFlag', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { runTypeID: "005", runType: "VM20", runTypeFlag: "1", Action: "True" },
        { runTypeID: "006", runType: "VM21", runTypeFlag: "1", Action: "True" },
        { runTypeID: "007", runType: "VM22", runTypeFlag: "1", Action: "True" },
        { runTypeID: "008", runType: "VM23", runTypeFlag: "0", Action: "True" },
        { runTypeID: "009", runType: "VM24", runTypeFlag: "1", Action: "True" },
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