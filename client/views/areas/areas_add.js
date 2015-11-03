var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Area adicionado com sucesso: " + this.insertDoc.nome, "Sucesso");
    FlowRouter.go('areas.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {

  },
};

AutoForm.hooks({
  "insertAreasForm": hooksObject
});