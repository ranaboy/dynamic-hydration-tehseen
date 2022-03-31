function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = `<a class="btn btn-primary text-white border-0 mb-1" href="../../run-book/run-book-actions-page.html">Run Book Action</a>
    <a class="btn btn-primary text-white border-0 mb-1" href="../../run-book/reporting-entity-page.html">Reporting Entity</a>
    <a class="btn btn-primary text-white border-0 mb-1" href="add-new-run-book.html">Edit</a>`;

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
        { field: 'RunBookID', maxWidth: 200 },
        { field: 'RunBookDesc', minWidth: 150 },
        { field: 'RunTypeID', minWidth: 150 },
        { field: 'RunSetID', minWidth: 150 },
        { field: 'ProductID', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 420,
        }
    ],
    rowData: [
        { RunBookID: "1339", RunBookDesc: "Testing E-Link Code- LDTI", RunTypeID: "5", RunSetID: "1", ProductID: "7", Action: "True" },
        { RunBookID: "101", RunBookDesc: "Leon Test Runbook - 101", RunTypeID: "1", RunSetID: "2", ProductID: "5", Action: "True" },
        { RunBookID: "102", RunBookDesc: "Testing E-Link Code- LDTI", RunTypeID: "2", RunSetID: "1", ProductID: "3", Action: "True" },
        { RunBookID: "103", RunBookDesc: "Leon Test Runbook - 101", RunTypeID: "2", RunSetID: "3", ProductID: "1", Action: "True" },
        { RunBookID: "009", RunBookDesc: "Testing E-Link Code- LDTI", RunTypeID: "5", RunSetID: "5", ProductID: "3", Action: "True" },
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