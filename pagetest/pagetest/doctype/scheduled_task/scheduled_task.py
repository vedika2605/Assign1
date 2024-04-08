# Copyright (c) 2024, vedika and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class scheduledTask(Document):
	pass

def execute_scheduled_task(doc, method):
    module = doc.script_module

    try:
        method_to_execute = frappe.get_attr(module + "." + method)
        method_to_execute()
        frappe.log("Scheduled task executed successfully.")
    except Exception as e:
        frappe.log_error("Error executing scheduled task: " + str(e))
