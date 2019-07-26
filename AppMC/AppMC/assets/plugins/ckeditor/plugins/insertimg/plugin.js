CKEDITOR.plugins.add( 'insertimg', {
    icons: 'abbr',
    init: function( editor ) {
        editor.addCommand( 'insertimgDialog', new CKEDITOR.dialogCommand( 'insertimgDialog' ) );
        editor.ui.addButton( 'Insertimg', {
            label: 'Insert Imagen',
            command: 'insertimgDialog',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'insertimgDialog', this.path + 'dialogs/insertimg.js' );
    }
});