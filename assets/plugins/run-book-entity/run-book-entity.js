function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = '<a class="btn btn-primary text-white border-0 mb-1" href="add-new-run-book-entity.html">Edit</a>';

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
        { field: 'ReportingEntityId', maxWidth: 200 },
        { field: 'ReportingEntityType', minWidth: 150 },
        { field: 'ReportingEntityDes', minWidth: 150 },
        { field: 'EntityCD', minWidth: 150 },
        { field: 'EntityDec', minWidth: 150 },
        { field: 'RunType', minWidth: 150 },
        { field: 'RunSetID', minWidth: 150 },
        { field: 'RunSet', minWidth: 150 },
        { field: 'ProductId', minWidth: 150 },
        { field: 'ProductCD', minWidth: 150 },
        { field: 'ProductDec', minWidth: 150 },
        { field: 'ReportingLobID', minWidth: 150 },
        { field: 'ReportingLobCD', minWidth: 150 },
        { field: 'ReportingLobDec', minWidth: 150 },
        {
            field: 'Action',
            cellRenderer: 'btnCellRenderer',
            minWidth: 150,
        }
    ],
    rowData: [
        { ReportingEntityId: "TL", ReportingEntityType: "LDTI", ReportingEntityDes: "-1339", EntityCD: "1", EntityDec: "Valuation", RunType: "1", RunSetID: "3", RunSet: "AA_Valuation_Iteration_No", ProductId: "2", ProductCD: "True", ProductDec: "Valuation", ReportingLobID: "3", ReportingLobCD: "True", ReportingLobDec: "True", Action: "True" },

        { ReportingEntityId: "TL", ReportingEntityType: "LDTI", ReportingEntityDes: "-1339", EntityCD: "2", EntityDec: "Valuation Interest Rate", RunType: "3", RunSetID: "4", RunSet: "AA_Valuation_Iteration_No", ProductId: "1", ProductCD: "True", ProductDec: "Valuation", ReportingLobID: "2", ReportingLobCD: "True", ReportingLobDec: "True", Action: "True" },

        { ReportingEntityId: "TL", ReportingEntityType: "LDTI", ReportingEntityDes: "-1339", EntityCD: "3", EntityDec: "Valuation Interest", RunType: "4", RunSetID: "2", RunSet: "AA_Valuation_Iteration_No", ProductId: "3", ProductCD: "True", ProductDec: "Valuation", ReportingLobID: "3", ReportingLobCD: "True", ReportingLobDec: "True", Action: "True" },

        { ReportingEntityId: "TL", ReportingEntityType: "LDTI", ReportingEntityDes: "-1339", EntityCD: "4", EntityDec: "Valuation Interest Typ;e", RunType: "2", RunSetID: "1", RunSet: "AA_Valuation_Iteration_No", ProductId: "2", ProductCD: "True", ProductDec: "Valuation", ReportingLobID: "4", ReportingLobCD: "True", ReportingLobDec: "True", Action: "True" },

        { ReportingEntityId: "TL", ReportingEntityType: "LDTI", ReportingEntityDes: "-1339", EntityCD: "5", EntityDec: "Valuation", RunType: "21", RunSetID: "3", RunSet: "AA_Valuation_Iteration_No", ProductId: "3", ProductCD: "True", ProductDec: "Valuation", ReportingLobID: "2", ReportingLobCD: "True", ReportingLobDec: "True", Action: "True" },
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