
# Create options for payment terms
Option.objects.create(name="Payment terms for invoices", category=sales_settings_category, value="Immediately")

# Create options for invoice title
Option.objects.create(name="Invoice title", category=invoice_settings_category, value="Ticket No.")

# Create options for taxes
Option.objects.create(name="Tax name", category=invoice_settings_category, value="GST")
Option.objects.create(name="Tax rate", category=invoice_settings_category, value="10%")
Option.objects.create(name="Tax usage", category=invoice_settings_category, value="No taxes created")

# Create options for payment types
Option.objects.create(name="Payment type", category=invoice_settings_category, value="On account")
Option.objects.create(name="Payment type", category=invoice_settings_category, value="Credit card")
Option.objects.create(name="Payment type", category=invoice_settings_category, value="Cash")
Option.objects.create(name="Payment type", category=invoice_settings_category, value="TimelyPay")
Option.objects.create(name="Payment type", category=invoice_settings_category, value="Payment Link")

# Create options for cash management
Option.objects.create(name="Cash management", category=invoice_settings_category, value="Enable cash management")
