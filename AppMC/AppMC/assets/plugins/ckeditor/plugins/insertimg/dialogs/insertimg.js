CKEDITOR.dialog.add('insertimgDialog', function (editor) {
    return {
        title: 'Abbreviation Properties',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'file',
                        id: 'insertimg',
                        label: 'Abbreviation',
                        validate: CKEDITOR.dialog.validate.notEmpty("Abbreviation field cannot be empty")
                    },
                    {
                        type: 'text',
                        id: 'title',
                        label: 'Explanation',
                        validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty")
                    }
                ]
            },
            {
                id: 'tab-adv',
                label: 'Advanced Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'id',
                        label: 'Id'
                    }
                ]
            }
        ],
        onOk: function () {
            var dialog = this;

            var insertimg = editor.document.createElement('insertimg');
            insertimg.setAttribute('title', dialog.getValueOf('tab-basic', 'title'));
            insertimg.setText(dialog.getValueOf('tab-basic', 'insertimg'));

            var id = dialog.getValueOf('tab-adv', 'id');
            if (id)
                insertimg.setAttribute('id', id);

            editor.insertElement(insertimg);
        }
    };
});