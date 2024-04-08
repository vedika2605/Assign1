// Copyright (c) 2024, vedika and contributors
// For license information, please see license.txt


frappe.ui.form.on('Employees', {
    refresh: function(frm) {
        frm.add_custom_button(__('Fill Child Tables'), function() {

            frappe.prompt([
                {'fieldname': 'email', 'fieldtype': 'Data', 'label': 'Email'},
                {'fieldname': 'age', 'fieldtype': 'Int', 'label': 'Age'},
                {'fieldname': 'date_of_joining', 'fieldtype': 'Date', 'label': 'Date of Joining'}
            ],
            function(values){
                var child1_data = {
                    'email': values.email,
                    'age': values.age,
                    'date_of_joining': values.date_of_joining
                };
                frm.set_value('child1', [child1_data]);


                var child2_data = {
                    'email': values.email,
                    'age': values.age,
                    'date_of_joining': values.date_of_joining
                };
                frm.set_value('child2', [child2_data]);
            }, 'Enter Data', 'Submit');
        });
        frm.fields_dict['child1'].grid.wrapper.on('grid-row-remove', function(e) {
            var removed_row_name = e.row.name;
            var child2_data = frm.doc.child2 || [];

            frm.doc.child2.forEach(function(row, index) {
                if (row.name === removed_row_name) {
                    frm.doc.child2.splice(index, 1);
                    frm.refresh_field('child2');
                    return false;
                }
            });
        });
    }
});
