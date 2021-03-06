Template.smartInputFile.events({
  'change .btn-file': function(e, t) {
    let file = e.target.files[0];

    t.file.set(file);
    t.onFileSelected(file);
  },

  'click .btn-upload': function(e, t) {
    let file = t.file.get();

    t.onUploadBegin(file);
    Files.insert(file, function(err, fileObj) {
      if (err) return t.onUploadError(err);
      return t.onUploadSuccess({
        _id: fileObj._id,
        name: fileObj.original.name,
        type: fileObj.original.type,
      });
    });
  }
});

Template.smartInputFile.helpers({
  btnFileText() {
    return Template.instance().btnFileText();
  },
  btnUploadText() {
    return Template.instance().btnUploadText.get();
  },
  fileNameText() {
    return Template.instance().fileNameText();
  },
  isFileSelected() {
    return Template.instance().isFileSelected();
  }
})

Template.smartInputFile.onCreated(function() {
  this.state = new ReactiveVar;
  this.file = new ReactiveVar;
  this.btnUploadText = new ReactiveVar('Upload file');


  // =======================================
  // ========= Helper functions ============
  // =======================================
  this.isFileSelected = () => {
    return this.file.get() !== undefined;
  }

  this.btnFileText = () => {
    return this.isFileSelected() ? 'Change file...' : 'Browse file...';
  }

  this.fileNameText = () => {
    return this.isFileSelected() ? this.file.get().name : '';
  }

  // =======================================
  // ========= Callback functions ==========
  // =======================================
  this.onFileSelected = (file) => {
    this.data.onFileSelected && this.data.onFileSelected(file);
  }

  this.onUploadBegin = (file) => {
    this.btnUploadText.set('Uploading file...');
    this.data.onUploadBegin && this.data.onUploadBegin(file);
  }

  this.onUploadError = (err) => {
    console.error('onUploadError:', err);
    this.btnUploadText.set('Upload file');
    this.data.onUploadError && this.data.onUploadError(err);
  }

  this.onUploadSuccess = (fileObj) => {
    this.btnUploadText.set('Upload file');
    this.data.onUploadSuccess && this.data.onUploadSuccess(fileObj);
  }
})
